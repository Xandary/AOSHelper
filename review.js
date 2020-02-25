function createChart(element, name) {
  var ctx = element.getContext('2d');
  ctx.clearRect(0, 0, element.width,element.height);
  return new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    // Configuration options go here
    options: {
      title: {
        display: true,
        text: name,
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: {
            min: 0,
          },
          scaleLabel: {
            display: true,
            labelString: 'Wounds'
          },
        }],
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
          },
          scaleLabel: {
            display: true,
            labelString: 'Percent'
          },
        }],
      },
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        rectangle: {
          borderWidth: 1,
        }
      },
    }
  });
}

class Review {
  constructor(element) {
    const distribution = document.createElement("canvas");
    this.distribution = createChart(distribution, "distribution");
    element.appendChild(distribution);

    const atleast = document.createElement("canvas");
    this.atleast = createChart(atleast, "At least");
    element.appendChild(atleast);
  }

  addRoll(name, roll) {
    const result = roll.result();
    this.__addRoll(name, result, review.distribution);

    let cummulative = 100;
    const atLeastData = result.map( value => {
      cummulative -= value;
      return cummulative;
    });
    this.__addRoll(name, atLeastData, review.atleast);
  }

  __addRoll(name, result, chart) {
    if (chart.data === undefined || chart.data.labels === undefined || result.length >= chart.data.labels.length) {
        chart.data.labels = Array.from(new Array(result.length), (_,i) => i);
    }

    chart.data.datasets.push({
      label: name,
      data: result,
    });
  }
}
