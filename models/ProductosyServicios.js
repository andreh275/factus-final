import mongoose from "mongoose";

const ProductosyServiciosSchema = new mongoose.Schema({
    code_reference: { type: String, required: true },
    name: { type: String, required: true, minlength: 1 },
    quantity: { type: Number, required: true, min: 1 },
    discount_rate: { type: Number, min: 0, default: 0 },
    price: { type: Number, min: 0, default: 0 },
    tax_rate: { type: Number, min: 0, max: 100, default: 0 }, 
    unit_measure_id: { type: Number, default: 1 },
    standard_code_id: { type: Number, default: 1 },
    is_excluded: { type: Number, enum: [0, 1], default: 0 },
    tribute_id: { type: Number, default: 1 },
    withholding_taxes: { type: Array, default: [] }
}, {
    timestamps: true
});

export default mongoose.model("ProductosyServicios", ProductosyServiciosSchema);