let client = require('../config/connection');

/**
 * INFO: Execute any postgres queries
 * @param {String} query 
 * @param {String} params 
 * @returns Array or Object based on query type
 */
const executeQuery = async (query, params) => {
     return new Promise((resolve, reject) => {
          client.query(query, params, (error, result) => {
               if (error) reject(error);
               else {
                    let { rows = [] } = result;
                    resolve(rows);
               }
          })
     })
}

module.exports = {
     executeQuery
}
