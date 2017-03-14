let pool = require('../../config/db.js')
let Pagination = require('../pagination.js')


let product = {
    insert: function(value, fn){
       pool.getConnection(function(err, connection) {
            connection.query('INSERT INTO products SET  name = ?, description = ?, unit_cost = ?, unit_charge = ?, selling_price = ?, discount_type = ?, tax_type=?, tax= ?, quantity = ?, dilution= ?, application = ?, usage_type=?, discount = ?, fk_unit_id =?, fk_category_id = ?', 
            [value.name, value.description, value.unit_cost, value.unit_charge,  value.selling_price, value.discount_type, value.tax_type, value.tax, value.quantity, value.dilution, value.application, value.usage_type, value.discount, value.unit_id, value.category_id], function (error, results, fields) {
                if (error) {                    
                    console.log(error)
                    return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                }               
                
                fn({code : 201, status: 'success', message: '', data: ''})   
            });
        });
    },
   update: function(req, fn){
       let value = req.body
       let id = req.params.id
        pool.getConnection(function(err, connection) {
            connection.query('UPDATE INTO products SET  name = ?, description = ?, unit_cost = ?, unit_charge = ?, selling_price = ?, discount_type = ?, tax_type=?, tax= ?, quantity = ?, dilution= ?, application = ?, usage_type=?, discount = ?, fk_unit_id =?, fk_category_id = ? WHERE id = ?', 
            [value.name, value.description, value.unit_cost, value.unit_charge,  value.selling_price, value.discount_type, value.tax_type, value.tax, value.quantity, value.dilution, value.application, value.usage_type, value.discount, value.unit_id, value.category_id, id], function (error, results, fields) {
                if (error) {                    
                    console.log(error)
                    return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                }               
                
                fn({code : 201, status: 'success', message: '', data: ''})   
            });
        });
   },  
   findOne : function(req, fn){        
        pool.getConnection(function(err, connection) {
            connection.query('SELECT * FROM v_products WHERE id = ?',req.id, function (error, results, fields) {
                connection.release();

                if (error) {
                    console.log(error)
                   return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                }
                
                fn({code: 200, status: 'success', message:'', data: results })

            });
        });
   },
   findAll : function(req, fn){        
        pool.getConnection(function(err, connection) {
            let values = Pagination(req);
            connection.query('SELECT * FROM v_products LIMIT ?,?', values, function (error, results, fields) {
                connection.release();

                if (error) {
                    console.log(error)
                   return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                }
                
                fn({code: 200, status: 'success', message:'', data: results })

            });
        });
   },
   search : function(q, fn){
       pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query('SELECT * FROM v_products WHERE name LIKE ? and fk_category_id LIKE ?',
            [q.name+'%' , q.category_id+'%'], function (error, results, fields) {
                
                connection.release();

                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                
                fn({code: 200, status: 'success', message:'', data: results })
            });
        });
  },
  exist : function(q, fn){
       pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query('SELECT * FROM v_products WHERE name = ?',
            [q.name], function (error, results, fields) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                  
                fn({code: 200, status: 'success', message:'', data: results })
                
            });
        });
  },
}



module.exports = product;