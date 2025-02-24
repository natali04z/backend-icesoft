import express from "express";
import cors from "cors";
import dbConnect from "../database/config.js";

// Import routes
import salesRoutes from "../routes/sales.routes.js";
import categoryRoutes from "../routes/category.routes.js";
import productRoutes from "../routes/product.routes.js";
import providerRoutes from "../routes/provider.routes.js";
import purchaseRoutes from "../routes/purchase.routes.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        // Paths
        this.pathSales = "/api/sales";
        this.pathCategory = "/api/categories";
        this.pathProduct = "/api/products";
        this.pathProvider = "/api/providers";
        this.pathPurchase = "/api/purchases";

        this.middlewares(); 
        this.routes();
        this.dbConnection();
        this.listen();
    }

    async dbConnection() {
        await dbConnect();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }    

    routes() {
        this.app.use(this.pathSales, salesRoutes);
        this.app.use(this.pathCategory, categoryRoutes);
        this.app.use(this.pathProduct, productRoutes);
        this.app.use(this.pathProvider, providerRoutes);
        this.app.use(this.pathPurchase, purchaseRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

export default Server;