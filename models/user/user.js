let pool = require('../../config/db.js')
let security = require('../../common/security.js')
let Pagination = require('../pagination.js')

let user = {
    insert: function (value, fn) {
        let salt = security.generateSalt(16);
        let hash = security.genertateHash(value.password, salt);
        pool.getConnection(function (err, connection) {
            connection.beginTransaction(function (err) {
                if (err) { throw err; }
                connection.query('INSERT INTO user_credentials SET password = ?, salt = ?',
                    [hash.passwordHash, salt], function (error, results, fields) {
                        if (error) {
                            return connection.rollback(function () {
                                console.log(error)
                                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                            });
                        }
                        let id = results.insertId;
                        connection.query('INSERT INTO users SET username = ?, fk_user_type_id = ?, fk_credential_id=?',
                            [value.username, value.user_type_id, id], function (error, results, fields) {
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
                                    fn({ code: 201, status: 'success', message: '', data: '' })
                                });

                            });

                    });

            });
        })
    },
    updateCredential: function (req, fn) {
        let salt = security.generateSalt(16);
        let hash = security.genertateHash(value.password, salt);
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
            }
            connection.query('UPDATE user_credentials SET password = ?, salt = ? WHERE id = ?',
                [hash.passwordHash, salt], function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                    }

                    fn({ code: 201, status: 'success', message: '', data: '' })

                });
        });
    },
    updateInfo: function (req, fn) {
        let value = req.body
        let id = req.params.id
        pool.getConnection(function (err, connection) {
            connection.query('UPDATE user_credentials SET fk_user_type_id = ? status = ? WHERE id = ?',
                [value.user_type_id, value.status, id], function (error, results, fields) {
                    if (error) {
                        console.log(error)
                        return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                    }

                    fn({ code: 201, status: 'success', message: '', data: '' })

                });
        });
    },
    findOne: function (req, fn) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
            }
            connection.query('SELECT * FROM v_users where username = ?', [req.username], function (error, results, fields) {
                connection.release();

                if (error) {
                    console.log(error)
                    return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                }
                fn({ code: 200, status: 'success', message: '', data: results })

            });
        });
    },
    findOneActive: function (req, fn) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
            }
            connection.query('SELECT * FROM v_users where username = ? and status="Active" limit 1', [req.username], function (error, results, fields) {
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
            connection.query('SELECT * FROM users LIMIT ?,?', values, function (error, results, fields) {
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
            connection.query('SELECT * FROM users where username LIKE ?',
                [q.name + '%'], function (error, results, fields) {

                    connection.release();

                    if (error) return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })

                    fn({ code: 200, status: 'success', message: '', data: results })
                });
        });
    },
    exist: function (q, fn) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
            }
            connection.query('SELECT * FROM users where username = ?',
                [q.name], function (error, results, fields) {
                    connection.release();

                    if (error) return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })

                    fn({ code: 200, status: 'success', message: '', data: results })

                });
        });
    },
}

module.exports = user;