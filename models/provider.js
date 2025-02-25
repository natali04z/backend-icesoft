import { model, Schema } from "mongoose"

const providerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    personal_phone: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    }
})

export default model('Provider', providerSchema)