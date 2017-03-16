let pool = require('../../config/db.js')
let Pagination = require('../pagination.js')
let func = require('../../common/nested-mysql.js')
let commerical = require('./commercial.js')
let residential = require('./residential')

let client = {
    insert: function (value, fn) {
        pool.getConnection(function (err, connection) {
             if (err) { 
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
             }
            connection.query('INSERT INTO customers first_name = ?, last_name = ?, other_name = ?, date_of_birth = ?, gender = ?, details =?, fk_campaign_id = ?, customer_type = ?',
                [value.first_name, value.last_name, value.other_name, value.date_of_birth, value.gender, value.details, value.campaign_id, value.customer_type], function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                    }
                    fn({ code: 201, status: 'success', message: 'service updated successfully', data: results.insertId })
                });
        })
    },
    update: function (req, fn) {
        let value = req.body
        let id = req.params.id
        pool.getConnection(function (err, connection) {
             if (err) { 
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
             }
            connection.query('INSERT INTO customers first_name = ?, last_name = ?, other_name = ?, date_of_birth = ?, gender = ?, details =?, fk_campaign_id = ?, customer_type = ?',
                [value.first_name, value.last_name, value.other_name, value.date_of_birth, value.gender, value.details, value.campaign_id, value.customer_type], function (error, results, fields) {
                    if (error) {
                        console.log(err);
                        return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                    }

                    fn({ code: 201, status: 'success', message: 'service updated successfully', data: '' })
                });
        });
    },
    findOne: function (req, fn) {
        pool.getConnection(function (err, connection) {
             if (err) { 
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
             }
            connection.query('SELECT * FROM v_active_customers where id = ?', req.id, function (error, results, fields) {
                connection.release();

                if (error) {
                    console.log(error)
                    return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                }

                fn({ code: 200, status: 'success', message: '', data: results })

            });
        });
    },
    findAll: function (req, fn) {
        pool.getConnection(function (err, connection) {
             if (err) { 
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
             }
            let values = Pagination(req);
            connection.query('SELECT * FROM v_active_customers LIMIT ?,?', values, function (error, results, fields) {
                connection.release();

                if (error) {
                    console.log(error)
                    return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                }

                fn({ code: 200, status: 'success', message: '', data: results })

            });
        });
    },
    search: function (q, fn) {
        pool.getConnection(function (err, connection) {
             if (err) { 
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
             }
            connection.query('SELECT * FROM v_active_customers where name LIKE ? and fk_category_id LIKE ?',
                [q.name + '%', q.category_id + '%'], function (error, results, fields) {

                    connection.release();

                    if (error) return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })

                    fn({ code: 200, status: 'success', message: '', data: results })
                });
        });
    },
    exist: function (q, fn) {
        pool.getConnection(function (err, connection) {
            connection.query('SELECT * FROM v_active_customers where name = ?',
                [q.name], function (error, results, fields) {
                    connection.release();

                    if (error) return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })

                    fn({ code: 200, status: 'success', message: '', data: results })

                });
        });
    },
    upload: function (req, fn) {
        let id = req.params.id
        pool.getConnection(function (err, connection) {
             if (err) { 
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
             }
            connection.beginTransaction(function (err) {
                if (err) { throw err; }
                connection.query('SELECT * FROM customers where id = ?', [id], function (error, results, fields) {
                    if (error) {
                        return connection.rollback(function () {
                            console.log(error)
                            return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                        });
                    }
                    let oldImage = results.profile_img_path

                    connection.query('UPDATE customers SET profile_img_path = ? WHERE id = ?',
                        [req.file.path, id], function (error, results, fields) {
                            if (error) {
                                return connection.rollback(function () {
                                    console.log(error)
                                    return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                                });
                            }
                            connection.commit(function (err) {
                                if (err) {
                                    return connection.rollback(function () {
                                        console.log(err);
                                        return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                                    });
                                }
                                fn({ code: 201, status: 'success', message: '', data: req.file.path })
                            });

                        });

                });

            });
        })
    },
    commercial: commerical,
    residential: residential
}



module.exports = client;