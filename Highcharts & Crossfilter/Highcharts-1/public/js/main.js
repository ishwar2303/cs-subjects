const roundOffAmount = (amount) => {
var curr = ''
if(amount >= 1000000000) {
  curr = 'B'
}
else if(amount >= 1000000) {
  curr = 'M'
}
else if(amount >= 1000) {
  curr = 'K'
}
return curr

}

const prepareSeries = (dataSeries) => {
  var series = Array()
  dataSeries.all().forEach((o) => {
    var temp = Array()
    temp.push(o.key)
    temp.push(o.value)
    series.push(temp)
  })
  return series
}

const separateSeries = (arr) => {
  var categories = Array()
  var data = Array()
  arr.forEach((a) => {
    categories.push(a[0])
    data.push(a[1])
  })
  return {
    categories,
    data
  }
}

var cf = crossfilter(dataset)

// agin bucket series
var agingBucket = cf.dimension(d => d.aging_bucket)
var agingBcuketGroup = agingBucket.group().reduceSum(d => d.collected_amount)
var agingBucketSeries = agingBcuketGroup.all()
const cmpBucketRange = (a, b) => {
  a = a.key.split('-')
  b = b.key.split('-')
  return a[1] - b[1]
}
agingBucketSeries.sort(cmpBucketRange)
// console.log(agingBucketSeries)
var agingSeries = Array()
var temp = Array()
var len = agingBucketSeries.length
temp.push(agingBucketSeries[len-1].key)
temp.push(agingBucketSeries[len-1].value)
agingSeries.push(temp)
for(i=0; i<len-1; i++) {
  var temp = Array()
  temp.push(agingBucketSeries[i].key)
  temp.push(agingBucketSeries[i].value)
  agingSeries.push(temp)
}
agingSeries = separateSeries(agingSeries)
console.log(agingSeries)

// Collected by activity
var activityType = cf.dimension(d => d.type)
var activityTypeSeries = activityType.group().reduceSum(d => d.collected_amount)
var activitySeries = Array()
activitySeries = prepareSeries(activityTypeSeries)
activitySeries.reverse()
activitySeries = separateSeries(activitySeries)
console.log(activitySeries)

// Top Collectors
var analyst = cf.dimension(d => d.analyst_name)
var analystDimensionSeries = analyst.group().reduceSum(d => d.collected_amount)
var analystSeries = Array()
analystSeries = prepareSeries(analystDimensionSeries)
analystSeries.sort((a, b) => {return b[1] - a[1]})
analystSeries = separateSeries(analystSeries)
console.log(analystSeries)

// Top 10 Customers
var customers = cf.dimension(d => d.customer_name)
var customersDimensionSeries = customers.group().reduceSum(d => d.collected_amount)
var customerSeries = Array()
customerSeries = prepareSeries(customersDimensionSeries)
customerSeries.sort((a, b) => {return b[1] - a[1]})
// console.log(customerSeries)
customerSeries = customerSeries.slice(0, 10)
customerSeries = separateSeries(customerSeries)
console.log(customerSeries)

/*
*   Cash collected by aging bucket graph
*/
var chart1 = Highcharts.chart('cash-collected-by-aging-bucket', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Cash Collected by Aging Bucket',
    style: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: '20px',
      fontWeight: 'bold'
    }
  },
  xAxis: {
    type: 'category',
    categories: agingSeries.categories,
    labels: {
      rotation: -45,
      style: {
        fontSize: '10px',
        fontFamily: 'Verdana, sans-serif'
      },
    }
  },
  yAxis: {
    title: {
      text: 'Collected Amount'
    },
    labels : {
      enabled: false
    }
  },
  legend: {
    enabled: false
  },
  credits : {
      enabled: false
  },
  tooltip: {
    pointFormat: 'Collected: {point.y}',
    // formatter: function(d) {
    // }
  },
  plotOptions: {
    series: {
      cursor: 'pointer',
      point: {
        events: {
            click: function () {     
              this.select(null, false)  
              var selectedPoints = this.series.chart.getSelectedPoints()
              var filterPoints = selectedPoints[0].category
              console.log(filterPoints)
              console.log(chart3)
            }
        }
      },
    }
  },
  series: [{
    data: agingSeries.data,
    color: '#16aff0'
  }]
});

/*
*    Activity graph
*/
// Create the chart
var chart2 = Highcharts.chart('activity', {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Cash Collected by Activity',
    style: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: '20px',
      fontWeight: 'bold'
    }
  },
  accessibility: {
    announceNewData: {
      enabled: true
    }
  },
  xAxis: {
    type: 'category',
    categories: activitySeries.categories
  },
  yAxis: {
    title: {
      text: 'Collected Amount'
    },
    labels : {
      enabled: false
    }

  },
  legend: {
    enabled: false
  },
  credits : {
      enabled: false
  },
  tooltip: {
    pointFormat: 'Collected: {point.y}'
  },
  colors: [
      '#f75353',
      '#8ed163'
  ],
  plotOptions: {
    column: {
        colorByPoint: true
    },
    series: {
      cursor: 'pointer',
      point: {
        events: {
          click: function () {    
            this.select(null, false)  
            var selectedPoints = this.series.chart.getSelectedPoints()
            var filterPoints = selectedPoints[0].category
            console.log(filterPoints)
            console.log(selectedPoints)

            // filter graph
            var activitiyDim = activityType.filter(filterPoints)
            console.log(activitiyDim.top(Infinity))
            var group = activitiyDim.group().reduceSum(d => d.collected_amount)
            console.log(group.all())

          }
        }
      },
    }
  },
  series:[{
    data: activitySeries.data,
  }], 
});

/*
*     Top collectors
*/
var chart3 = Highcharts.chart('top-collectors', {
  
    chart: {
    type: 'bar'
  },
  title: {
    text: 'Top Collectors',
    style: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: '20px',
      fontWeight: 'bold'
    }
  },
  xAxis: {
    categories: analystSeries.categories,
    title: {
      text: 'Collected Amount'
    },
    labels : {
      enabled: false
    },

  },
  yAxis: {
    title: {
      text: '',
    },
    labels : {
      enabled: false
    }
  },
  tooltip: {
  },
  // legend: {
  //   enabled: false,
  //   },
  credits: {
    enabled: false
  },
  plotOptions: {
    series: {
      cursor: 'pointer',
      point: {
        events: {
            click: function () {     
              this.select(null, false)  
              console.log(this.category)
              var selectedPoints = this.series.chart.getSelectedPoints()
              var filterPoints = selectedPoints[0].category
              console.log(filterPoints)
            }
        }
      },
    }
  },
  series: [{
    data: analystSeries.data
  }]
});

/*
*     Top customers
*/
var chart4 = Highcharts.chart('top-customers', {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Top 10 Customers',
    style: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: '20px',
      fontWeight: 'bold'
    }
  },
  xAxis: {
    categories: customerSeries.categories,
    title: {
      text: 'Collected Amount'
    },
    labels : {
      enabled: false
    }
  },
  yAxis: {
    labels : {
      enabled: false
    }, 
    title: {
        text: ''
    }
  },
  tooltip: {
    valueSuffix: ' millions'
  },
  legend: {
      enabled: false,
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    series: {
      cursor: 'pointer',
      point: {
        events: {
            click: function () {     
              this.select(null, false)  
              console.log(this.category)
              var selectedPoints = this.series.chart.getSelectedPoints()
              var filterPoints = selectedPoints[0].category
              console.log(filterPoints)
            }
        }
      },
      dataLabels: {
        align: 'left',
        enabled: true,
        inside: true,
        format: '{point.x}'
      },
      grouping: false
    }
  },
  series: [{
    data: customerSeries.data,
    color: '#fc7500'
  }]
});