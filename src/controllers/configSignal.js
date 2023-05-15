let options = {};
export function config(signal) {
  const labels = signal.labels;
  // if (signal.isShort) {
  //   options = {
  //     responsive: true,
  //     type: "line",

  //     plugins: {
  //       legend: {
  //         position: "top",
  //       },
  //       title: {
  //         display: false,
          
  //       },
  //       animation: {
  //         duration: 0.5,
  //         easing: "easeInOutQuad",
  //       },
  //     },
  //     scales: {
  //       x: {
  //         max: null,
  //       },
  //     },
  //   };
  // } else {
    options = {
      responsive: true,
      animation: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
        
        },
      },
      scales: {
        x: {
          max: null,
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
  // }

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [],
        fill: false,
        backgroundColor: "rgba(51, 214, 146, 0.7)",
        scales: {
          x: {
            max: null,
          },
        },
      },
    ],
  };
  return { options, data };
}
