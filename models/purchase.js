import { model, Schema, Types } from "mongoose";

const purchaseSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    product: {
        type: Types.ObjectId, // Relación con el modelo Product
        ref: "Product",
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    provider: {
        type: Types.ObjectId,
        ref: "Provider",
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    details: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Purchase", purchaseSchema);