let pool = require('../../config/db.js')
let Pagination = require('../pagination.js')
let func = require('../../common/nested-mysql.js')

commercial = {
      insertCommercial: function(value, fn){
        pool.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                if (err) { throw err; }
                connection.query('INSERT INTO customers SET first_name = ?, last_name = ?, other_name = ?, date_of_birth = ?, gender = ?, details =?, fk_campaign_id = ?, customer_type = ?', 
                [value.first_name, value.last_name, value.other_name, value.date_of_birth, value.gender, value.details, value.campaign_id, value.customer_type], function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function() {
                            console.log(error)
                            return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                        });
                    }               
                    let customer_id = results.insertId
                    connection.query('INSERT INTO companies SET name = ?, established_date = ?, fk_customer_id = ?', 
                    [value.company_name, value.established_date, customer_id], function (error, results, fields) {
                        if (error) {
                            return connection.rollback(function() {
                                console.log(error)
                                return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                            });
                        }         
                        let company_id = results.insertId;    
                        connection.query('INSERT INTO branches SET name = ?, type = ?, fk_company_id = ?', 
                                [value.branch_name, value.branch_type, company_id], function (error, results, fields) {
                            if (error) {
                                return connection.rollback(function() {
                                    console.log(error)
                                    return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                                });
                            }    
                            let branch_id = results.insertId;           
                            connection.query('INSERT INTO branch_locations SET street = ?, city = ?, province = ?, fk_country_id = ?', 
                              [value.street, value.city, value.province, value.country_id], function (error, results, fields) {
                                    if (error) {
                                        return connection.rollback(function() {
                                            console.log(error)
                                            return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                                        });
                                    }               
                                    connection.query('INSERT INTO contact_persons SET name = ?, gender = ?, telephone = ?, mobile = ?,fax=?, email=?', 
                                    [value.cp_name , value.cp_gender, value.cp_telephone, value.cp_mobile, value.cp_fax, value.cp_email], function (error, results, fields) {
                                            if (error) {
                                                return connection.rollback(function() {
                                                    console.log(error)
                                                    return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                                                });
                                            }          
                                            let contact_person_id = results.insertId;     
                                            connection.query('INSERT INTO branch_contacts SET fk_branch_id = ?, fk_contact_person_id = ?', 
                                            [branch_id , contact_person_id], function (error, results, fields) {
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
                        
                     });
                 });
                    
            });
        })
    },
    company: {
           findAll : function(req, fn){        
                pool.getConnection(function(err, connection) {
                    let values = Pagination(req);
                    let nestingOptions = [
                        { tableName : 'customers', pkey: 'id'},
                        { tableName : 'companies', pkey: 'id', fkeys:[{table:'customers',col:'fk_customer_id'}]},
                    ]
                    let options = {sql: 'SELECT * FROM customers INNER JOIN companies  on customers.id=companies.fk_customer_id  WHERE customers.id = ?  LIMIT ?,?', nestTables: true};
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
            branch : {
                findAll : function(req, fn){        
                    pool.getConnection(function(err, connection) {
                        let values = Pagination(req);
                        let nestingOptions = [
                            { tableName : 'customers', pkey: 'id'},
                            { tableName : 'companies', pkey: 'id', fkeys:[{table:'customers',col:'fk_customer_id'}]},
                            { tableName : 'branches', pkey: 'id', fkeys:[{table:'companies',col:'fk_company_id'}]},
                        ]
                        let options = {sql: `SELECT * FROM customers INNER JOIN companies  on customers.id = companies.fk_customer_id  
                                             LEFT JOIN branches on branches.fk_company_id = companies.id WHERE customers.id = ?  LIMIT ?,?`, nestTables: true};
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


                area : {
                    findAll : function(req, fn){        
                        pool.getConnection(function(err, connection) {
                            let values = Pagination(req);
                            let nestingOptions = [
                                { tableName : 'customers', pkey: 'id'},
                                { tableName : 'companies', pkey: 'id', fkeys:[{table:'customers',col:'fk_customer_id'}]},
                                { tableName : 'branches', pkey: 'id', fkeys:[{table:'companies',col:'fk_company_id'}]},
                                { tableName : 'branch_areas', pkey: 'id', fkeys:[{table:'branches',col:'fk_branch_id'}, {table:'areas',col:'fk_area_id'}]},
                                { tableName : 'areas', pkey: 'id'},
                            ]
                            let options = {sql: `SELECT * FROM customers INNER JOIN companies  on customers.id = companies.fk_customer_id  
                                                 LEFT JOIN branches on branches.fk_company_id = companies.id  
                                                  LEFT JOIN branch_areas on branch_areas.fk_branch_id = branches.id 
                                                  LEFT JOIN areas on areas.id = branch_areas.fk_area_id  WHERE customers.id = ?  LIMIT ?,?`, nestTables: true};
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
                                        connection.query('INSERT INTO branch_areas SET fk_branch_id = ?, fk_area_id = ?', 
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
                                // Use the connection
                                connection.query('SELECT * FROM areas INNER JOIN branch_areas on areas.id = branch_areas.fk_area_id where name = ? and branch_areas.fk_branch_id = ?',
                                [q.body.name, q.params.id], function (error, results, fields) {
                                    connection.release();

                                    if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                                
                                    fn({code: 200, status: 'success', message:'', data: results })
                                    
                                });
                            });
                    },
              }
         }
    }
}

module.exports = commercial;