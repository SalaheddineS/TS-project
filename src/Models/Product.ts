import Mongoose,{model} from "mongoose";


const ProductSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 2,
        maxlenght: 50,
    },
    description: {
        type: String,
        required: true,
        minlenght: 2,
        maxlenght: 250,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: true,
        default: process.env.DEFAULT_IMAGE,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    numReviews: {
        type: Number,
        required: true,
        min: 0,
    },
});

export default model("Product", ProductSchema);