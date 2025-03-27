import Productos from '../models/Productos.js'

const postProductos = async (req, res) => {
    try {
        const {code_reference, name, quantity, discount_rate, price, tax_rate, unit_measure_id, standard_code_id, is_excluded, tribute_id, withholding_taxes} = req.body;
        const productos = new Productos({
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
        await productos.save();
        res.json({ productos });    
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error al crear el producto o servicio" });
    }
}

const getProductos = async (req, res) => {
    try {
        const productos = await Productos.find();
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error al obtener los productos o servicios" });
    }
}

const getProducto = async (req, res) => {
    try {
        const productos = await Productos.findById(req.params.id);
        res.json(productos);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error al obtener el producto o servicio" });
    }
}

export { postProductos, getProductos, getProducto };
