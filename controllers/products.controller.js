const connection = require('../config/database.connect');

const productsController = {}

productsController.getAll = (req, res) => {

        const limit = req.query.limit //Agregar paginado mas adelante
     
        // console.log(limit);
     
        const testQuery = 'SELECT products.id,products.title,categories.title AS category,products.description,products.price,products.quantity,products.short_desc,products.image,products.images FROM products,categories WHERE cat_id = categories.id ORDER BY products.id '
     
       connection.query(testQuery, (err, rows, fields) => {  //OPTIMIZAR QUERY
           if (err) throw err;
           res.json({'products':rows})
       });
       connection.release;
     }

productsController.detail =  (req,res) => {
    productId = req.params.id 
    connection.query(`SELECT * FROM ecommerce.products WHERE id =${productId}`, (err, rows, fields) => {
      if (err) throw err;   //Falta validar cuando el id de producto no exista
      res.json(rows)
  });
  connection.release;
  }


productsController.getByCategory = (req,res) => {

    categoryId = req.params.id 
    connection.query(`SELECT * FROM ecommerce.products WHERE cat_id =${categoryId}`, (err, rows, fields) => {
      if (err) throw err;   //Falta validar cuando el id de la categoria no exista
      res.json(rows)
  });
  connection.release;
  }  

  
module.exports = productsController;     