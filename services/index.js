const { executeQuery } = require('../utils/database');

/**
 * INFO: Load data for homepage to show in table and line graph on coditional basis
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {Boolean} isGrouped 
 * @returns Array - table or graph result based on condition
 */
const getBrokerListings = async (startDate, endDate) => {
     try {
          let sql = `SELECT b.id as listing_id, a.title as broker, to_char(b.listing_date, 'Month') as month,
          to_char(b.listing_date, 'MM-YYYY') as year_month, b.listing_date, b.revenue FROM sites a INNER JOIN deals b ON b.site_id = a.id WHERE 1 = 1 `;
          if (startDate) sql += ` AND b.listing_date >= '${startDate}'::date `
          if (endDate) sql += ` AND b.listing_date <= '${endDate}'::date `
          sql += ` ORDER BY b.listing_date ASC `
          let result = await executeQuery(sql, '');
          return result;
     } catch (error) {
          throw error
     }
}

module.exports = {
     getBrokerListings
}