let pool = require('../../config/db.js')
let Pagination = require('../pagination.js')
let func = require('../../common/nested-mysql.js')

let residential = {
     insertResidential: function(value, fn){
        pool.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                if (err) { throw err; }
                connection.query('INSERT INTO customers SET first_name = ?, last_name = ?, other_name = ?,  date_of_birth = ?, gender = ?, details =?, fk_campaign_id = ?, customer_type = ?', 
                [value.first_name, value.last_name, value.other_name, value.date_of_birth, value.gender, value.details, value.campaign_id, value.customer_type], function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function() {
                            console.log(error)
                            return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                        });
                    }               
                    let customer_id = results.insertId;
                    connection.query('INSERT INTO contact_persons SET name = ?, gender = ?, telephone = ?, mobile = ?,fax=?, email=?', 
                    [value.cp_name , value.cp_gender, value.cp_telephone, value.cp_mobile, value.cp_fax, value.cp_email], function (error, results, fields) {
                            if (error) {
                                return connection.rollback(function() {
                                    console.log(error)
                                    return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                                });
                            }          
                            let contact_person_id = results.insertId;     
                            connection.query('INSERT INTO customer_contacts SET fk_customer_id = ?, fk_contact_person_id = ?', 
                            [customer_id , contact_person_id], function (error, results, fields) {
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
                                        fn({code : 201, status: 'success', message: '', data: customer_id})
                                    });
                                    
                            });
                            
                    });
                 });
                    
            });
        })
    },
    area : {
                findAll : function(req, fn){        
                    pool.getConnection(function(err, connection) {
                        let values = Pagination(req);
                        let nestingOptions = [
                            { tableName : 'customers', pkey: 'id'},
                            { tableName : 'customer_areas', pkey: 'id', fkeys:[{table:'customers',col:'fk_customer_id'}, {table:'areas',col:'fk_area_id'}]},
                            { tableName : 'areas', pkey: 'id'},
                        ]
                        let options = {sql: `SELECT * FROM customers LEFT JOIN customer_areas ON  customer_areas.fk_customer_id = customers.id
                                                LEFT JOIN areas on areas.id = customer_areas.fk_area_id  WHERE customers.id = ?  LIMIT ?,?`, nestTables: true};
                        connection.query(options,[ req.id, values[0], values[1]], function (error, results, fields) {
                            connection.release();

                            if (error) {
                                console.log(error)
                            return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                            }
                            var nestedRows = func.convertToNested(results, nestingOptions);
                            fn({code: 200, status: 'success', message:'', data: nestedRows })

                        });
                    });
                },
                insert : function(req, fn){
                    let value = req.body
                    let id = req.params.id
                    pool.getConnection(function(err, connection) {
                            connection.beginTransaction(function(err) {
                                if (err) { throw err; }
                                connection.query('INSERT INTO areas SET  name = ?, description = ?, length=?, width=?, depth=?, area=?, volume=?', 
                                [value.name, value.description, value.length,value.width,value.depth,value.area,value.volume], function (error, results, fields) {
                                if (error) {
                                    return connection.rollback(function() {
                                            console.log(error)
                                            return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                                        });
                                    }               
                                    let area_id = results.insertId;
                                    connection.query('INSERT INTO customer_areas SET fk_customer_id = ?, fk_area_id = ?', 
                                    [id, area_id], function (error, results, fields) {
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
                                                fn({code : 201, status: 'success', message: '', data: customer_id})
                                            });
                                                    
                                            
                                    });
                                });
                                    
                            });
                        })
                },
                exist : function(q, fn){
                        pool.getConnection(function(err, connection) {
                          
                            connection.query('SELECT * FROM areas INNER JOIN customer_areas on areas.id = customer_areas.fk_area_id where name = ? and customer_areas.fk_customer_id = ?',
                            [q.body.name, q.params.id], function (error, results, fields) {
                                connection.release();

                                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                            
                                fn({code: 200, status: 'success', message:'', data: results })
                                
                            });
                        });
                },
        }
}

module.exports = residential;