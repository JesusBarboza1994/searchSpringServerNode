import mongoose from "mongoose";

const transmetaSpringSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    free_length: {
        type: Number,
        required: true
    },
    wire: {
        type: Number,
        required: true
    },
    dext_2: {
        type: Number,
        required: false
    },
    dext_1: {
        type: Number,
        required: true
    },
    dint_1: {
        type: Number,
        required: true
    },
    dint_2: {
        type: Number,
        required: false
    },
    n: {
        type: Number,
        required: true
    },
    code_id: {
        type: String,
        required: true
    }
});

const TransmetaSpring = mongoose.model('transmeta-springs', transmetaSpringSchema);

export default TransmetaSpring;
