const { getBrokerListings } = require('../services/index');

/**
 * INFO: Load data for homepage to show in table and line graph
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {Boolean} isGrouped 
 * @returns Object - table and graph result
 */
const brokerListings = async (startDate, endDate) => {
     try {
          let table = await getBrokerListings(startDate, endDate);
          // Reusing table data for line charts by grouping it
          let graph = getMonthlyListingByBroker(table);
          return { table, graph }
     } catch (error) {
          throw error
     }
}

/**
 * INFO: Function to group result to show on line chart
 * @param {Array} items 
 * @returns Array of group result
 */
const getMonthlyListingByBroker = (items) => {
     let helper = {};
     const reduced = items.reduce((r, o) => {
          const key = o.broker + '-' + o.year_month;
          if (!helper[key]) {
               helper[key] = Object.assign({ count: 1 }, o);
               r.push(helper[key]);
          } else {
               helper[key]['revenue'] = Number(helper[key].revenue) + Number(o.revenue);
               helper[key]['count'] += 1;
          }
          return r;
     }, []);
     const result = Object.keys(reduced).map(k => {
          const item = reduced[k];
          return {
               label: item.broker,
               count: item.count,
               year_month: item.year_month,
               revenue: item.revenue > 0 && item.count ? (Number(item.revenue) / item.count).toFixed(2) : 0
          }
     })
     return result;
};

module.exports = {
     brokerListings
}
