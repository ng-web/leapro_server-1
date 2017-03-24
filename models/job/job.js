let pool = require('../../config/db.js')
let Pagination = require('../pagination.js')
let func = require('../../common/nested-mysql.js')

job = {
    insert: function (value, fn) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err)
                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' })
            }
            connection.beginTransaction(function (err) {
                if (err) { throw err; }
                connection.query('INSERT INTO jobs SET type = ?, summary=?, fk_job_status_id = ?, received_date = ?, expiry_date = ?',
                    [value.type, value.summary, value.job_status_id, value.received_date, value.expiry_date], function (error, results, fields) {
                        if (error) {
                            return connection.rollback(function () {
                                console.log(error)
                                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                            });
                        }
                        let job_id = results.insertId

                        let products = [];
                        //insert products and the area product is being used
                        for (let pindex = 0; pindex < products.length; pindex++) {
                            for (let aindex = 0; aindex < products[pindex].areas.length; aindex++) {
                                connection.query('INSERT INTO job_areas SET fk_job_id = ?, fk_area_id = ?',
                                    [job_id, products[pindex].areas[i].id], function (error, results, fields) {
                                        if (error) {
                                            return connection.rollback(function () {
                                                console.log(error)
                                                return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                                            });
                                        }
                                        let job_area_id = results.insertId;
                                        connection.query('INSERT INTO product_area_usage SET quantity = ? discount = ?, discount_type = ?, tax = ?, tax_type = ?, selling_price =?, fk_product_id=? fk_job_area_id',
                                            [products[pindex].product.quantity, products[pindex].product.discount, products[pindex].product.discountType, products[pindex].product.tax, products[pindex].product.taxType, products[pindex].product.sellingPrice, products[pindex].product.id, job_area_id], function (error, results, fields) {
                                                if (error) {
                                                    return connection.rollback(function () {
                                                        console.log(error)
                                                        return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                                                    });
                                                }

                                            });
                                    });
                            }
                        }

                        let services = []
                        //insert services
                        for (let sindex = 0; sindex < services.length; sindex++) {
                            connection.query('INSERT INTO job_services SET unit_charge = ?, man_hours =?, discount_type=?,tax_type=?, tax=? discount=?, fk_job_id, service_id=?',
                                [services[sindex].unitCharge, services[sindex].manHours, services[sindex].discountType, services[sindex].taxType, services[sindex].tax, services[sindex].discount, job_id, services[sindex].id], function (error, results, fields) {
                                    if (error) {
                                        return connection.rollback(function () {
                                            console.log(error)
                                            return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                                        });
                                    }

                                });
                        }

                        let notes = []
                        //insert notes
                        for (let nindex = 0; nindex < notes.length; nindex++) {

                            connection.query('INSERT INTO job_notes SET details=?, fk_note_type_id=?, fk_job_id=?',
                                [notes[nindex].details, notes[nindex].typeId, job_id], function (error, results, fields) {
                                    if (error) {
                                        return connection.rollback(function () {
                                            console.log(error)
                                            return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                                        });
                                    }


                                });

                        }

                        //commit transactions 
                        connection.commit(function (err) {
                            if (err) {
                                return connection.rollback(function () {
                                    console.log(err);
                                    return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                                });
                            }
                            fn({ code: 201, status: 'success', message: '', data: job_id })
                        });

                    });
            });
        });

    },
    update: function () {

    },
    client: {
        //query all client data and jobs

        //query a specific client data and jobs

        //search for a specific client data and jobs

    },
    findAll: function (req, fn) {
        pool.getConnection(function (err, connection) {
            if (err) { return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' }) }
            let values = Pagination(req);
            let nestingOptions = [
                { tableName: 'jobs', pkey: 'id' },
                { tableName: 'jobs_status', pkey: 'id' },
                { tableName: 'job_areas', pkey: 'id', fkeys: [{ table: 'jobs', col: 'fk_job_id' }, { table: 'areas', col: 'fk_area_id' }] },
                { tableName: 'product_area_usage', pkey: 'id', fkeys: [{ table: 'job_areas', col: 'fk_job_area_id' }, { table: 'products', col: 'fk_product_id' }] },
                { tableName: 'products', pkey: 'id' },
                { tableName: 'areas', pkey: 'id' },
            ]
            let options = { sql: `SELECT * FROM jobs INNER JOIN job_status ON job_status.id = jobs.fk_job_status_id LIMIT ?,?`, nestTables: true };
            connection.query(options, [values[0], values[1]], function (error, results, fields) {
                connection.release();

                if (error) {
                    console.log(error)
                    return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                }
                var nestedRows = func.convertToNested(results, nestingOptions);
                fn({ code: 200, status: 'success', message: '', data: nestedRows })

            });
        });
    },
    service: {
        findAll: function (req, fn) {
            pool.getConnection(function (err, connection) {
                if (err) { return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' }) }
                let values = Pagination(req);
                let nestingOptions = [
                    { tableName: 'jobs', pkey: 'id' },
                    { tableName: 'jobs_status', pkey: 'id' },
                    { tableName: 'job_services', pkey: 'id', fkeys: [{ table: 'jobs', col: 'fk_job_id' }, { table: 'services', col: 'fk_services_id' }] },
                    { tableName: 'services', pkey: 'id' }
                ]
                let options = {
                    sql: `SELECT * FROM jobs INNER JOIN job_status ON job_status.id = jobs.fk_job_status_id
                                                LEFT JOIN job_services ON job_services.fk_job_id = jobs.id INNER JOIN services ON services.id =
                                                job_services.fk_service_id WHERE jobs.id= ? LIMIT ?,?`, nestTables: true
                };
                connection.query(options, req.id, [values[0], values[1]], function (error, results, fields) {
                    connection.release();

                    if (error) {
                        console.log(error)
                        return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                    }
                    var nestedRows = func.convertToNested(results, nestingOptions);
                    fn({ code: 200, status: 'success', message: '', data: nestedRows })

                });
            });
        }
    },
    area: {
        product: {
            findAll: function (req, fn) {
                pool.getConnection(function (err, connection) {
                    if (err) { return fn({ code: 500, status: 'error', message: 'internal server error', data: 'Unable to connect to mysql' }) }
                    let values = Pagination(req);
                    let nestingOptions = [
                        { tableName: 'jobs', pkey: 'id' },
                        { tableName: 'jobs_status', pkey: 'id' },
                        { tableName: 'job_areas', pkey: 'id', fkeys: [{ table: 'jobs', col: 'fk_job_id' }, { table: 'areas', col: 'fk_area_id' }] },
                        { tableName: 'product_area_usage', pkey: 'id', fkeys: [{ table: 'job_areas', col: 'fk_job_area_id' }, { table: 'products', col: 'fk_product_id' }] },
                        { tableName: 'products', pkey: 'id' },
                        { tableName: 'areas', pkey: 'id' },
                    ]
                    let options = {
                        sql: `SELECT * FROM jobs INNER JOIN job_status ON job_status.id = jobs.fk_job_status_id
                                                LEFT JOIN job_areas ON job_areas.fk_job_id = jobs.id LEFT JOIN product_area_usage
                                                ON job_areas.id =product_area_usage.fk_job_area_id INNER JOIN products on products.id = product_area_usage.fk_product_id
                                                LEFT JOIN areas ON areas.id = job_areas.fk_area_id WHERE jobs.id= ? LIMIT ?,?`, nestTables: true
                    };
                    connection.query(options, req.id, [values[0], values[1]], function (error, results, fields) {
                        connection.release();

                        if (error) {
                            console.log(error)
                            return fn({ code: 500, status: 'error', message: 'internal server error', data: 'SQLException' })
                        }
                        var nestedRows = func.convertToNested(results, nestingOptions);
                        fn({ code: 200, status: 'success', message: '', data: nestedRows })

                    });
                });
            }
        }
    },

}

module.exports = job;