module.exports = {
    insert: (conn, data) => {
        return new Promise(function (resolve, reject) {
            conn.query('INSERT INTO user set ?', [data], function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        })
    },
    list: (conn) => {
        return new Promise(function (resolve, reject) {
            conn.query(
                'SELECT * FROM user',
                 function (error, rows){
                    if (error){
                        reject(error)
                    }else {
                        resolve(rows)
                    }
                }
            )
        })
    }
}