import mongoose from "mongoose";

const UsuariosSchema = new mongoose.Schema({
    identification: { type: "string", pattern: "^\\d+$" },
    dv: { type: "string", pattern: "^\\d$" },
    company: { type: "string" },
    trade_name: { type: "string" },
    names: { type: "string", minLength: 1 },
    address: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    phone: { type: "string", pattern: "^\\d{10}$" },
    legal_organization_id: { type: "string", pattern: "^\\d+$" },
    tribute_id: { type: "string", pattern: "^\\d+$" },
    identification_document_id: { type: "string", pattern: "^\\d+$" },
    municipality_id: { type: "string", pattern: "^\\d+$" },
},{
    timestamps: true
});


export default mongoose.model("Usuarios", UsuariosSchema);
