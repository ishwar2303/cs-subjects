const agingBucketDim = cf.dimension(d => d.aging_bucket)
// comparator for sorting aging bucket
const agingBucketList = {
    "Current": 0,
    "1-30": 1,
    "31-60": 2,
    "61-90": 3,
    "91-180": 4,
    "181-365": 5,
    ">365": 6
}
// custom function to sort aging bucket
const aginBucketCmp = (a, b) => {
    return agingBucketList[a.key] - agingBucketList[b.key]
}
const agingBucket = (cf) => {
    var agingBucketSeries = agingBucketDim.group().reduceSum(d => d.collected_amount).all() 
    agingBucketSeries.sort(aginBucketCmp)
    agingBucketSeries = prepareSeries(agingBucketSeries)
    return agingBucketSeries
}

var agingBucketSeriesData = agingBucket(cf)

// graph options
setOptions = {
    chart: {
        renderTo: 'graph-2',
        type: 'column'
    },
    title: {
        text: 'Collection Amount by Aging Bucket'
    },
    xAxis: {
        categories: agingBucketSeriesData.categories,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Collection Amount'
        }
    },
    tooltip: {
        formatter: function(){
            return '<b>' + this.x + '</b>' + '<br/>' + (this.y/1000000).toFixed(2) + ' M';
        }
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function() {
                        this.select(null, true)
                        var selectedPoints = this.series.chart.getSelectedPoints()
                        var filteredPoints = []
                        for(i=0; i<selectedPoints.length; i++) {
                            filteredPoints.push(selectedPoints[i].category)
                        }
                        console.log(filteredPoints)
                        // filter all graphs by aging bucket
                        byAgingBucket(filteredPoints)
                    }
                }
            }
        }
    },
    series: [{
        name: 'Aging Bucket',
        data: agingBucketSeriesData.data,
        color: '#fc7500'
    }]
}
const agingBucketChart = Highcharts.chart(setOptions)