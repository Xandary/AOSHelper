function createChart(element, name) {
  var ctx = element.getContext('2d');
  ctx.clearRect(0, 0, element.width,element.height);
  return new Chart(ctx, {
    // The type of chart we want to create
    type: 'boxplot',
    data: {
      labels : ["wounds", "save 6+", "save 5+"," save 4+", "save 3+", "save 2+"],
    },
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
        }],
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
          },
          scaleLabel: {
            display: true,
            labelString: 'Wounds'
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
  }

  addRoll(name, roll) {
    const data = []
    data.push(this.__addRoll(roll.result()));
    data.push(this.__addRoll(roll.copy().fail(6).result()));
    data.push(this.__addRoll(roll.copy().fail(5).result()));
    data.push(this.__addRoll(roll.copy().fail(4).result()));
    data.push(this.__addRoll(roll.copy().fail(3).result()));
    data.push(this.__addRoll(roll.copy().fail(2).result()));

    this.distribution.data.datasets.push({
      label: name,
      backgroundColor: 'rgba(255,0,0,0.5)',
      borderColor: 'red',
      borderWidth: 1,
      outlierColor: '#999999',
      padding: 10,
      itemRadius: 0,
      backgroundColor: 'rgba(255,0,0,0.5)',
      data: data,
    });
    this.distribution.update();
  }

  __addRoll(result) {
    let q1;
    let median;
    let q3;

    let cummulative = 0;
    result.map((value, i) => {
      const prev = cummulative;
      cummulative += value;
      if (prev < 25 && cummulative >=25) {
        q1 = (25-prev)/(cummulative - prev)*(i+1) +(cummulative - 25)/(cummulative - prev)*i;
        q1 = Math.round( q1 * 100 + Number.EPSILON ) / 100;
      }
      if (prev < 50 && cummulative >=50) {
        median = (50-prev)/(cummulative - prev)*(i+1) +(cummulative - 50)/(cummulative - prev)*i ;
        median = Math.round( median * 100 + Number.EPSILON ) / 100;
      }
      if (prev < 75 && cummulative >=75) {
        q3 = (75-prev)/(cummulative - prev)*(i+1) +(cummulative - 75)/(cummulative - prev)*i ;
        q3 = Math.round( q3 * 100 + Number.EPSILON ) / 100;
      }
    });

    const min = Math.max(0, q1 - 1.5*(q3 - q1));
    const max = q3 + 1.5*(q3 - q1);

    return {min, q1, median, q3, max};
  }
}
