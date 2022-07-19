const express = require('express');
const router = express.Router();
const { brokerListings } = require('../controllers');
const { colors } = require('../constant/constant');
const startDate = '2020-11-01';
const endDate = '2021-11-30';

/* 
 * INFO: GET home page
*/
router.get('/', async (req, res) => {
  try {
    let { table, graph } = await brokerListings(startDate, endDate);
    const labels = [...new Set(graph.map(x => x.year_month))];
    const groupedResult = groupByLabel(graph, 'label');
    /****
    To pass 0 value if there is no listing present for a specific month
    as this is mandatory for line chart 
    */
    const result = Object.keys(groupedResult).map((curr, index) => {
      let dataArray = [];
      labels.forEach(element => {
        let checkExist = groupedResult[curr].find(x => x.year_month == element)
        if (checkExist) dataArray.push(checkExist.count);
        else dataArray.push(0);
      });
      return { label: curr, data: dataArray, borderColor: colors[index] }
    });
    // Render line chart and data table
    res.render('index', { title: 'Broker Listings', table, chart: JSON.stringify(result), labels: JSON.stringify(labels) });
  } catch (error) {
    res.render('error', { message: error.message, error });
  }
});

/**
 * INFO: Group any array of object by key
 * @param {Array} items 
 * @param {String} key 
 * @returns Object of grouped dataset
 */
const groupByLabel = (items, key) => items.reduce((result, item) => ({
  ...result,
  [item[key]]: [...(result[item[key]] || []), item]
}), {}
);

module.exports = router;
