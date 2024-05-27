const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/gestionproductos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const esquemaProducto = new mongoose.Schema({
    presupuesto: { type: Number, required: true },
    unidad: { type: String, required: true },
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    valorUnitario: { type: Number, required: true },
    valorTotal: { type: Number, required: true },
    fechaAdquisicion: { type: Date, required: true },
    proveedor: { type: String, required: true }
});

const Producto = mongoose.model('Producto', esquemaProducto);

// Endpoints CRUD
app.post('/productos', async (req, res) => {
    const producto = new Producto(req.body);
    await producto.save();
    res.send(producto);
});

app.get('/productos', async (req, res) => {
    const productos = await Producto.find();
    res.send(productos);
});

app.get('/productos/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.send(producto);
});

app.put('/productos/:id', async (req, res) => {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(producto);
});

app.delete('/productos/:id', async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.send({ mensaje: 'Producto eliminado' });
});

app.listen(3000, () => {
    console.log('Servidor está corriendo en el puerto 3000');
});
