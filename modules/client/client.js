let pool = require('../../config/db.js')
let Pagination = require('../pagination.js')

let client = {
  insert: function(value, fn){
        pool.getConnection(function(err, connection) {
            if (err) { throw err; }
                connection.query('INSERT INTO customers first_name = ?, last_name = ?, other_name = ?, date_of_birth = ?, gender = ?, details =?, fk_campaign_id = ?, customer_type = ?', 
                [value.first_name, value.last_name, value.other_name, value.date_of_birth, value.gender, value.details, value.campaign_id, value.customer_type], function (error, results, fields) {
                if (error) {
                    console.log(error)
                    return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                }               
                fn({code : 201, status: 'success', message: 'service updated successfully', data: results.insertId})  
            });
        })
    },
   update: function(req, fn){
       let value = req.body
       let id = req.params.id
        pool.getConnection(function(err, connection) {
                if (err) { throw err; }
               connection.query('INSERT INTO customers first_name = ?, last_name = ?, other_name = ?, date_of_birth = ?, gender = ?, details =?, fk_campaign_id = ?, customer_type = ?', 
                [value.first_name, value.last_name, value.other_name,  value.date_of_birth, value.gender, value.details, value.campaign_id, value.customer_type], function (error, results, fields) {
                      if (error) {
                            console.log(err);
                            return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                    }               
                    
                   fn({code : 201, status: 'success', message: 'service updated successfully', data: ''})
                });
            });
   },  
   findOne : function(req, fn){        
        pool.getConnection(function(err, connection) {
            connection.query('SELECT * FROM v_active_customers where id = ?',req.id, function (error, results, fields) {
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
            connection.query('SELECT * FROM v_active_customers LIMIT ?,?', values, function (error, results, fields) {
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
            connection.query('SELECT * FROM v_active_customers where name LIKE ? and fk_category_id LIKE ?',
            [q.name+'%' , q.category_id+'%'], function (error, results, fields) {
                
                connection.release();

                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                
                fn({code: 200, status: 'success', message:'', data: results })
            });
        });
  },
  exist : function(q, fn){
       pool.getConnection(function(err, connection) {
            connection.query('SELECT * FROM v_active_customers where name = ?',
            [q.name], function (error, results, fields) {
                connection.release();

                if (error) return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                  
                fn({code: 200, status: 'success', message:'', data: results })
                
            });
        });
  },
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
    company: {
           findAll : function(req, fn){        
                pool.getConnection(function(err, connection) {
                    let values = Pagination(req);
                    var options = {sql: 'SELECT * FROM customers INNER JOIN companies  on customers.id=companies.fk_customer_id  WHERE customers.id = ?  LIMIT ?,?', nestTables: true};
                    connection.query(options,[ req.id, values[0], values[1]], function (error, results, fields) {
                        connection.release();

                        if (error) {
                            console.log(error)
                        return fn({code: 500, status: 'error', message: 'internal server error', data: 'SQLException'})
                        }
                        
                        fn({code: 200, status: 'success', message:'', data: results })

                    });
                });
            },
    }
}



module.exports = client;