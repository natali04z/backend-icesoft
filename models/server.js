import express, {json} from 'express'
import dbConnect from '../database/config.js'
import '../database/config.js'
// import ventasRoutes from '../routes/ventasRoutes.js'
// import categoryRoutes from '../routes/categoryRoutes.js'
// import productRoutes from '../routes/productRoutes.js'
// import providerRoutes from '../routes/providerRoutes.js'
// import purchaseRoutes from '../routes/purchaseRoutes.js'
import cors from 'cors'

class Server {
    constructor() {
        this.app = express()
        this.listen()
        this.dbConecction()
        this.pathVentas = '/api/Ventas'
        this.pathCategory = '/api/product'
        this.pathProduct = '/api/product'
        this.pathProvider = '/api/provider'
        this.pathpurchase = '/api/purchase'
        // this.route()
    }

    async dbConecction() {
        await dbConnect()
    }

    // route() {
    //     this.app.use(json())
    //     this.app.use(cors())
    //     this.app.use(this.pathVentas, ventasRoutes)
    //     this.app.use(this.pathCategory, categoryRoutes)
    //     this.app.use(this.pathProduct, productRoutes)
    //     this.app.use(this.pathProvider, providerRoutes)
    //     this.app.use(this.pathpurchase, purchaseRoutes)
    // }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Server is running')

        })
    }
}

export default Server