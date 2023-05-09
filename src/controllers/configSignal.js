let options = {};
export function config(signal){

const labels = signal.labels;
    if (signal.isShort) {
      options = {
        responsive: true,
        type: "line",
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
          },
        },
      };
    } else {
      options = {
        animation: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
    
          responsive: true,
          type: "line",
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: false,
            },
          },
        },
      };
    }

    const data = {
      labels,
      datasets: [
        {
          data: [],
          fill: true,
          backgroundColor: "rgba(51, 214, 146, 0.7)",
        },
      ],
    };
    return {options, data};
}