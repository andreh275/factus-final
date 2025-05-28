import mongoose from "mongoose";

const FacturasSchema = new mongoose.Schema({
        numbering_range_id:  { type: Number, min: 1 },
        reference_code: { type: "string" },
        observation: { type: "string" },
        payment_form: { type: "string" },
        payment_due_date: { type: "string", format: "date" },
        payment_method_code: { type: "string" },
        billing_period: {
            type: "object",
            properties: {
                start_date: { type: "string", format: "date" },
                start_time: { type: "string", pattern: "^\\d{2}:\\d{2}:\\d{2}$" },
                end_date: { type: "string", format: "date" },
                end_time: { type: "string", pattern: "^\\d{2}:\\d{2}:\\d{2}$" }
            },
            required: ["start_date", "start_time", "end_date", "end_time"]
        },
     customer: {type: mongoose.Schema.Types.ObjectId, ref: "Usuarios"},
     items: {type: mongoose.Schema.Types.ObjectId, ref: "ProductosyServicios"},
});

export default mongoose.model('Facturas', FacturasSchema);

