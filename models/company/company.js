let pool = require('../../config/db.js')
let Pagination = require('../pagination.js')


let company = {
    insert: function(value, fn){
        pool.getConnection(function(err, connection) {
             connection.query('INSERT INTO companies SET name = ?, established_date = ?, fk_customer_id = ?', 
                    [value.name,value.established_date, value.customer_id], function (error, results, fields) {
                if (error) {
                    console.log(error)
                    return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})   
                }                            
                fn({code : 201, status: 'success', message: '', data: results.insertId})
            });
        });
    },
   update: function(req, fn){
       let value = req.body
       let id = req.params.id
       pool.getConnection(function(err, connection) {
            connection.query('UPDATE INTO companies SET name = ?, established_date = ? WHERE id = ?', 
                    [value.name, value.established_date, id], function (error, results, fields) {
                  
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
            connection.query('SELECT * FROM companies where id = ?',req.id, function (error, results, fields) {
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
            connection.query('SELECT * FROM companies LIMIT ?,?', values, function (error, results, fields) {
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
            connection.query('SELECT * FROM companies where name LIKE ? and fk_customer_id LIKE ?',
            [q.name+'%', q.cust_id+'%'], function (error, results, fields) {
                
                connection.release();

                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                
                fn({code: 200, status: 'success', message:'', data: results })
            });
        });
  },
  exist : function(q, fn){
       pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query('SELECT * FROM companies where name = ?',
            [q.name], function (error, results, fields) {
                connection.release();

                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
               
                fn({code: 200, status: 'success', message:'', data: results })
                
            });
        });
  },
}


module.exports = company;