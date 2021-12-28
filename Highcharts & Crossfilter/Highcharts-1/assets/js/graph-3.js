const activity = (cf) => {
    var activityDim = cf.dimension(d => d.type)
    var activitySeries = activityDim.group().reduceSum(d => d.collected_amount).top(Infinity)
    var count = activityDim.group().top(Infinity)
    var untouched = count[0].value
    var touched = count[1].value
    var activitySeriesData = []
    activitySeries.forEach((o) => {
        let temp = []
        temp.push(o.key)
        temp.push(o.value)
        activitySeriesData.push(temp)
    })
    return {
        touched,
        untouched,
        data: activitySeriesData
    }
}
var activitySeriesData = activity(cf)
const touched = document.getElementById('touched')
const untouched = document.getElementById('untouched')
touched.innerText = activitySeriesData.touched
untouched.innerText = activitySeriesData.untouched

setOptions = {
    chart: {
        renderTo: 'graph-3',
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        }
    },
    title: {
        text: 'Collection by Activity'
    },
    tooltip: {
        formatter: function(){
            return '<b>' + this.key + '</b>' + '<br/>' + (this.y/1000000).toFixed(2) + ' M';
        }
    },
    plotOptions: {
        pie: {
            innerSize: 200,
            depth: 45,
            colors: ['#4fc4f8', '#fc7500']
        },
    },
    series: [{
        name: 'Activity',
        data: activitySeriesData.data
    }]
}

const activityChart = Highcharts.chart(setOptions);
