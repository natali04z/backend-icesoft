import { model, Schema, Types } from "mongoose"; // ✅ Importar Types

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
        type: Types.ObjectId,
        ref: "Category",
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

module.exports = mongoose.model("Product", productSchema);