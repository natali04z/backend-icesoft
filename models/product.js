import { model, Schema} from "mongoose";

const productSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Types.ObjectId, // Relación con el modelo Category
        ref: 'Category', // Hace referencia al modelo 'Category'
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    minimumStock: {
        type: Number,
        required: true
    }
});

export default model('Product', productSchema);