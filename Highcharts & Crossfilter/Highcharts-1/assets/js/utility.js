const cf = crossfilter(dataset)

const prepareSeries = (series) => {
    let categories = []
    let data = []
    series.forEach((o) => {
        categories.push(o.key)
        data.push(o.value)
    })
    return {
        categories,
        data
    }
}
