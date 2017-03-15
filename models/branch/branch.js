let pool = require('../../config/db.js')
let Pagination = require('../pagination.js')


let branch = {
    insert: function(value, fn){
        pool.getConnection(function(err, connection) {
             connection.query('INSERT INTO branches SET name = ?, type = ?, fk_company_id = ?', 
                    [value.name,value.type, value.company_id], function (error, results, fields) {
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
            connection.query('UPDATE branches SET name = ?, type = ? WHERE id = ?', 
                    [value.name,value.type, id], function (error, results, fields) {
                  
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
            connection.query('SELECT * FROM branches where id = ?',req.id, function (error, results, fields) {
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
            connection.query('SELECT * FROM branches LIMIT ?,?', values, function (error, results, fields) {
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
            connection.query('SELECT * FROM branches where name LIKE ? and fk_company_id LIKE ?',
            [q.name+'%', q.company_id+'%'], function (error, results, fields) {
                
                connection.release();

                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                
                fn({code: 200, status: 'success', message:'', data: results })
            });
        });
  },
  exist : function(q, fn){
       pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query('SELECT * FROM branches where name = ? and company_id = ?',
            [q.name, q.company_id], function (error, results, fields) {
                connection.release();

                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
               
                fn({code: 200, status: 'success', message:'', data: results })
                
            });
        });
  },

  area: {
      
  }
}


module.exports = branch;