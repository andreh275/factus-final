import ProductosyServiciosModel from '../models/ProductosyServicios.js'

const postProductosyServicios = async (req, res) => {
    try {
        const {code_reference, name, quantity, discount_rate, price, tax_rate, unit_measure_id, standard_code_id, is_excluded, tribute_id, withholding_taxes} =req.body;
        const productosyservicios = new ProductosyServiciosModel({
            code_reference,
            name,
            quantity,
            discount_rate,
            price,
            tax_rate,
            unit_measure_id,
            standard_code_id,
            is_excluded,
            tribute_id,
            withholding_taxes,
        });
        await productosyservicios.save();
        res.json({productosyservicios});    
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error al crear el producto o servicio"});
    }
}

const getProductosyServicios = async (req, res) => {
    try {
        const productosyservicios = await ProductosyServiciosModel.find();
        res.json(productosyservicios);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error al obtener los productos o servicios"});
    }
}

const getProductoServicio = async (req, res) => {
    try {
        const productosyservicios = await ProductosyServiciosModel.findById(req.params.id);
        res.json(productosyservicios);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error al obtener el producto o servicio"});
    }
}

export {postProductosyServicios, getProductosyServicios, getProductoServicio};

