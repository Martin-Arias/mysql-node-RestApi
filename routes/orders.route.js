const express = require('express');
const router = express.Router();

const connection = require('../config/database.connect');

/* GET orders by ID */
router.get('/orders/:id' ,(req, res) => { //OPTIMIZAR QUERY
  const orderId = req.params.id
  connection.query(`SELECT orders.id as orderId, products.title as productTitle , products.description, products.price, users.username, users.id AS usernameID
  FROM orders, orders_details,products, users
  WHERE orders.id = orders_details.order_id
  AND  products.id =orders_details.product_id
  AND users.id = orders.user_id  AND orders.id = ${orderId}`, (err, rows, fields) => {
    if (err) throw err;
    res.json(rows) //FALTA ENVIAR UN MENSAJE SI SE ENVIA UNA ID INVALIDO
  });
  connection.release;
});


/*POST create new order */
router.post('/orders/new', (req, res) => {

  //PARA CREAR LA NUEVA ORDEN SE NECESITA EL ID DEL USUARIO, UN ARRAY QUE CONTENGA LOS PRODUCTOS CON SU ID Y CANTIDAD 
  const { userId, products } = req.body
  
  const newOrder = `INSERT INTO orders ( user_id ) VALUES (${userId})`
 

  connection.query(newOrder, (err,rows) => {
    if (err) throw err;
    
    const newOrderId = rows.insertId //Contiene el ID de la nueva orden creada
   

    products.forEach(element => { //CREA LOS DETALLES DE LA ORDEN PARA CADA PRODUCTO

     connection.query(`INSERT INTO orders_details (order_id,product_id,quantity) VALUES (${newOrderId},${element.id},${element.cantidad})`, (err,rows) => {
      //FALTA ACTUALIZAR LA CANTIDAD DE ELEMENTOS CUANDO SE CREA LA ORDEN
        if (err) throw err;
      
      });
    });
    connection.query(`SELECT * FROM orders_details WHERE order_id =${newOrderId}`, (err,rows) => { //MUESTRA LA NUEVA ORDEN CREADA
      if (err) throw err;
       res.json({'Nueva orden creada': rows});
     });
   
  });
  
  

  
  connection.release;
}) 
module.exports = router;
