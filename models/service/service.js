let pool = require('../../config/db.js')
let Pagination = require('../pagination.js')


let service = {
    insert: function(value, fn){
        pool.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                if (err) { throw err; }
                connection.query('INSERT INTO services SET  name = ?, description = ?, man_hours = ?, unit_charge = ?, discount_type = ?, tax_type=?, tax= ?, discount = ?, fk_category_id = ?', 
                [value.name, value.description, value.man_hours, value.unit_charge, value.discount_type, value.tax_type, value.tax, value.discount, value.category_id], function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function() {
                            console.log(error)
                            return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                        });
                    }               
                    connection.commit(function(err) {
                        if (err) {
                            return connection.rollback(function() {
                                console.log(err);
                                return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                            });
                        }
                        fn({code : 201, status: 'success', message: '', data: ''})
                    });
                    
                });
            });
        })
    },
   update: function(req, fn){
       let value = req.body
       let id = req.params.id
        pool.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                if (err) { throw err; }
                connection.query('UPDATE services SET  name = ?, description = ?, man_hours = ?, unit_charge = ?, discount_type = ?, tax_type=?, tax= ?, discount = ?, fk_category_id = ? WHERE id = ?', 
                [value.name, value.description, value.man_hours, value.unit_charge, value.discount_type, value.tax_type, value.tax, value.discount, value.category_id, id], function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function() {
                            console.log(err);
                            return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                        });
                    }               
                    connection.commit(function(err) {
                        if (err) {
                            return connection.rollback(function() {
                                console.log(err);
                                return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                    
                            });
                        }
                        fn({code : 201, status: 'success', message: 'service updated successfully', data: ''})
                    });
                    
                });
            });
        });
   },  
   findOne : function(req, fn){        
        pool.getConnection(function(err, connection) {
            connection.query('SELECT * FROM v_services where id = ?',req.id, function (error, results, fields) {
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
            connection.query('SELECT * FROM v_services LIMIT ?,?', values, function (error, results, fields) {
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
            connection.query('SELECT * FROM v_services where name LIKE ? and fk_category_id LIKE ?',
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
            connection.query('SELECT * FROM v_services where name = ?',
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



module.exports = service;