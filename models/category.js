import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    }
});

module.exports = mongoose.model('Category', categorySchema);