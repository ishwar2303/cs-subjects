const reduceAdd = (p, v) => {
    p.totalAmount += v.collected_amount;
    p.noOfCustomers += 1;
    return p;
}

const reduceRemove = (p, v) => {
    p.totalAmount -= v.collected_amount;
    p.noOfCustomers -= 1;
    return p;
}

const reduceInitial = () => {
    return {
        noOfCustomers: 0,
        totalAmount: 0
    }
}

const orderValue = (p) => {
    return p.totalAmount
}

const analyst = (cf) => {
    let analystNames = [] // analyst names
    let analystCustomers = [] // percentage customer served by analyst
    let analystAmount = [] // percentage collected amount
    
    let overallCollectedAmount = 0
    let totalCustomers = 0
    var analystNameDim = cf.dimension(d => d.analyst_name)

    analystSeries = analystNameDim.group().reduce(reduceAdd, reduceRemove, reduceInitial).order(orderValue).top(Infinity)
    
    analystSeries.forEach((o) => {
        analystNames.push(o.key)
        totalCustomers += o.value.noOfCustomers
        overallCollectedAmount += o.value.totalAmount
        analystCustomers.push(o.value.noOfCustomers)
        analystAmount.push(o.value.totalAmount)
    })
    
    analystCustomers = analystCustomers.map((d) => {
        return parseFloat(((d/totalCustomers)*100).toFixed(2))
    })
    
    analystAmount = analystAmount.map((d) => {
        return parseFloat(((d/overallCollectedAmount)*100).toFixed(2))
    })
    
    return {
        analystNames,
        analystCustomers,
        analystAmount,
        totalCustomers,
        overallCollectedAmount
    }
}

var analystSeriesData = analyst(cf)

// graph options
var options = {
    chart: {
        renderTo: 'graph-1',
        type: 'bar'
    },
    title: {
        text: 'Analyst Customers and Collected Amount'
    },
    xAxis: {
        categories: analystSeriesData.analystNames,
        title: {
            text: null
        },
        labels: {
            align: 'left',
            x: 5,
            y: -26,
            formatter: function(){
                return '<b style="font-size:14px">' + this.value + '</b>'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        formatter: function(){
            return '<b>' + this.x + '</b>' + '<br/>' + this.y + '%';
        }
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                align: 'right',
                x: 0,
                y: 0,
                formatter: function(){
                    return '<span style="color:white; font-weight: normal;">' + this.y + ' %</span>' 
                }
            }
        },
    },
    legend: {
        enabled: true
    },
    credits: {
        enabled: false
    },
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
}
const analystChart = Highcharts.chart(options);
