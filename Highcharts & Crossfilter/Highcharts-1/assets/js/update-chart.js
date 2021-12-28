const multivalueFilter = (values) => {
    return (v) => {
        return values.indexOf(v) !== -1
    }
}

const getFilteredData = (dim, filteredPoints) => {
    if(filteredPoints.length > 0)
        dim.filterFunction(multivalueFilter(filteredPoints))
    else dim.filterAll() 
    return dim.top(Infinity)
}

const updateAnalystChart = (analystSeriesData) => {
    analystChart.update({
        series: [
            {
                name: 'Number of Customers : ' + analystSeriesData.totalCustomers,
                data: analystSeriesData.analystCustomers,
                color: '#8fd163'
            },
            {
                name: 'Total Collected Amount : ' + (analystSeriesData.overallCollectedAmount/1000000).toFixed(2) + 'M $',
                data: analystSeriesData.analystAmount,
                color: '#4fc4f8'
            }
        ]
    })
}

const updateActivityChart = (activitySeriesData) => {
    activityChart.update({
        series: [{data: activitySeriesData}]
    })
}

const byAgingBucket = (filteredPoints) => {
    var filteredData = getFilteredData(agingBucketDim, filteredPoints)

    // filtered crossfilter instance
    var fcf = crossfilter(filteredData)

    // update activity chart
    let activitySeriesData = activity(fcf)
    updateActivityChart(activitySeriesData.data)
    touched.innerText = activitySeriesData.touched
    untouched.innerText = activitySeriesData.untouched

    // update analyst chart
    let analystSeriesData = analyst(fcf)
    updateAnalystChart(analystSeriesData)
}
