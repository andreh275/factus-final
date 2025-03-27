import mongoose from "mongoose";

const Productoschema = new mongoose.Schema({
    code_reference: { type: String },
    name: { type: String, minlength: 1 },
    quantity: { type: Number, min: 1 },
    discount_rate: { type: Number, min: 0 },
    price: { type: Number, min: 0 },
    tax_rate: { type: Number, min: 0, max: 100 }, 
    unit_measure_id: { type: Number, min: 1 },
    standard_code_id: { type: Number, min: 1 },
    is_excluded: { type: Number, enum: [0, 1] },
    tribute_id: { type: Number, min: 1 },
});

export default mongoose.model("Productos", Productoschema);


