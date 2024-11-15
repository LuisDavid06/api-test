const express = require('express');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors())
require('dotenv').config()


// Función para generar nombres aleatorios
const nombres = ["Carlos", "Ana", "Luis", "María", "José", "Carmen", "Ricardo", "Laura", "Pedro", "Sara"];
const apellidos = ["Pérez", "García", "Rodríguez", "Fernández", "Gómez", "López", "Martínez", "Díaz", "Hernández", "Ruiz"];
const productosCatalogo = [
  { nombre: "Arroz", cantidad: 1 },
  { nombre: "Frijoles", cantidad: 2 },
  { nombre: "Azúcar", cantidad: 1 },
  { nombre: "Leche", cantidad: 3 },
  { nombre: "Huevos", cantidad: 12 },
  { nombre: "Pan", cantidad: 2 },
  { nombre: "Tomates", cantidad: 5 },
  { nombre: "Queso", cantidad: 1 },
  { nombre: "Aceite", cantidad: 1 }
];
const sedes = ["Sede Central", "Sucursal Este", "Sucursal Oeste"];

// Generar cédula aleatoria venezolana
function generarCedula() {
  return "V" + Math.floor(Math.random() * 100000000);
}

// Función para generar un teléfono venezolano aleatorio
function generarTelefono() {
  const prefijos = ['0412', '0414', '0424', '0416', '0426'];
  const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
  const numero = Math.floor(1000000 + Math.random() * 9000000); // Genera un número de 7 dígitos
  return `${prefijo}-${numero}`;
}

// Función para generar un pedido con datos aleatorios
function generarPedido(id) {
  return {
    pedido_id: id,
    nombre: nombres[Math.floor(Math.random() * nombres.length)],
    apellido: apellidos[Math.floor(Math.random() * apellidos.length)],
    cedula: generarCedula(),
    telefono: generarTelefono(),  // <-- Agregamos el número telefónico aquí
    direccion: `Calle ${Math.floor(Math.random() * 1000)}, Ciudad`,
    sede: sedes[Math.floor(Math.random() * sedes.length)],
    estatus: "pendiente",
    codigo_facturacion: uuidv4(),
    productos: [
      productosCatalogo[Math.floor(Math.random() * productosCatalogo.length)],
      productosCatalogo[Math.floor(Math.random() * productosCatalogo.length)],
      productosCatalogo[Math.floor(Math.random() * productosCatalogo.length)]
    ]
  };
}

// Crear un array de 1000 pedidos
const pedidos = Array.from({ length: 100 }, (_, index) => generarPedido(index + 1));

// Endpoint para obtener los pedidos pendientes
app.get('/api/pedidos', (req, res) => {
  res.json(pedidos);
});


app.get('/api/pedidos/:pedido_id', (req, res) => {
  const pedidoId = parseInt(req.params.pedido_id, 10);

  // Buscar el pedido por ID en la lista de pedidos
  const pedido = pedidos.find(p => p.pedido_id === pedidoId);

  if (pedido) {
    // Si se encuentra el pedido, devolver los datos
    res.status(200).json(pedido);
  } else {
    // Si no se encuentra el pedido, devolver un error
    res.status(404).json({ message: `Pedido con ID ${pedidoId} no encontrado` });
  }
});

// Puerto del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});