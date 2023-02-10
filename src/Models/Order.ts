import Mongoose,{model} from "mongoose";

const OrderSchema = new Mongoose.Schema({
    cart: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered"],
        default: "pending",
    },
    address: {
        type: String,
        required: true,
    },
    payment: {
        type: String,
        enum: ["cash", "card"],
        default: "cash",
    },
})

export default model("Order", OrderSchema);