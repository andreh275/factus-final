import FacturaModel from '../models/Facturas.js';


const postFacturas = async (req, res) => {
    try {
        const {numbering_range_id, reference_code, observation, payment_form, payment_due_date, payment_method_code, billing_period, customer, items} = req.body;
        const factura = new FacturaModel({
            numbering_range_id,
            reference_code,
            observation,
            payment_form,
            payment_due_date,
            payment_method_code,
            billing_period,
            customer,
            items,
        })
        await factura.save();
        res.json({factura});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error al crear la factura"});
    }    
}

const getFacturas = async (req, res) => {
    try {
        const facturas = await FacturaModel.find();
        res.json(facturas);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error al obtener las facturas"});
    }
}
 

const getFactura = async (req, res) => {
    try {
        const factura = await FacturaModel.find(req.params);
        res.json(factura);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error al obtener la factura"});
    }
}

export {getFacturas, getFactura, postFacturas}  