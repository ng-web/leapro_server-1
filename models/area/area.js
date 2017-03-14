let pool = require('../../config/db.js')
let Pagination = require('../pagination.js')


let area = {
    insert: function(value, fn){
        pool.getConnection(function(err, connection) {
            connection.query('INSERT INTO areas SET  name = ?, description = ?, length=?, width=?, depth=?, area=?, volume=?', 
            [value.name, value.description, value.length,value.width,value.depth,value.area,value.volume], function (error, results, fields) {
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
            connection.query('UPDATE areas SET  name = ?, description = ?, length=?, width=?, depth=?, area=?, volume=? WHERE id=?', 
            [value.name, value.description, value.length,value.width,value.depth,value.area,value.volume, id], function (error, results, fields) {
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
            connection.query('SELECT * FROM areas where id = ?',req.id, function (error, results, fields) {
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
            connection.query('SELECT * FROM areas LIMIT ?,?', values, function (error, results, fields) {
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
            connection.query('SELECT * FROM areas where name LIKE ?',
            [q.name+'%'], function (error, results, fields) {
                
                connection.release();

                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                
                fn({code: 200, status: 'success', message:'', data: results })
            });
        });
  },
  exist : function(q, fn){
       pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query('SELECT * FROM areas where name = ?',
            [q.name], function (error, results, fields) {
                connection.release();

                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
               
                fn({code: 200, status: 'success', message:'', data: results })
                
            });
        });
  },
}


module.exports = area;