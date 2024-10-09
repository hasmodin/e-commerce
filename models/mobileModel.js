import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mobileSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        url: String,
        filename: String,
    },
    model_number: {
        type: String,
  
    },
 
    nt: {
        type: String,
    },
    weight: {
        type: String,
    },
    build: {
        type: String,
    },
    display: {
        type: String,
    },
    os: {
        type: String,
    },
    cpu: {
        type: String,
    },
    internal: {
        type: String,
    },
    pc: {
        type: String,
    },
    sc: {
        type: String,
    },
    battery: {
        type: String,
    },
    usb: {
        type: String,
    }
    

},
{
    timestamps: true,
});

const Mobile = mongoose.model("Mobile", mobileSchema);

export default Mobile;
