const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

const pedidos = [];

app.get('/pedidos', (req,res) => {
  return res.json(pedidos);
});

app.post('/pedido', (req,res) => {
  const { name, email, phone, amount } = req.body;

  const pedido = { id:uuid(), name, email, phone, amount, status: '0' }; 

  pedidos.push(pedido);

  return res.json(pedido);
});

app.post('/pedido/:id', (req,res) => {
  const { id } = req.params;
  const { status } = req.body;

  const pedidoIndex = pedidos.findIndex(pedido => pedido.id === id);

  if (pedidoIndex < 0) {
    return res.status(400).json({error: "Demanded not found"});
  }

  pedidos[pedidoIndex].status = status;

  return res.json({message: 'Status updated'});
});

app.listen(3333, () => {
  console.log('App listening on port 3333');
});

