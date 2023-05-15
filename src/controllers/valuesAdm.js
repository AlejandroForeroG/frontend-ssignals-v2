class valuesAdm {
  constructor() {
    this.counter = [];
    this.prober = 0;
    this.cont = 0;
  }

  dataRun(chart, nSamples, sample, variable) {
    // Se evaluan los  los primeros 10 símbolos
    // y evitar la acumulación de etiquetas y datos en el gráfico
    if (this.prober !== 1) {
      if (sample <= nSamples) {
        this.addInit(chart, sample, variable);
      } else {
        this.ad(chart, sample, variable);
        // sessionStorage.setItem("prober", this.prober);
      }
    } else {
      this.ad(chart, sample, variable);
      // sessionStorage.setItem("prober", this.prober);
    }
  }

  addInit(chart, sample, variable) {
    // chart.data.labels.splice(sample - 1, 1, sample);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(variable);
    });
    // this.almacenamiento(chart);
    chart.update();
    this.counter++;
  }

  // Método para actualizar el gráfico después de agregar nuevos datos
  ad(chart, sample, variable) {
    this.prober = 1;
    this.addData(chart, sample, variable);
    chart.update();
    this.removeData(chart);
    this.cont++;
  }

  // Método para agregar datos al gráfico antes de los primeros 10 datos
  addData(chart, sample, variable) {
    chart.data.labels.push(sample);
    // const newLabels = [...chart.data.labels, sample];
    // chart.data.labels = newLabels;
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(variable);
    });
    // this.almacenamiento(chart);
  }
  //metodo para eliminar datos del gráfico
  removeData(chart) {
    chart.data.labels.splice(0, 1);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }

  
  clearData() {
    this.counter = [];
    this.prober = 0;
    this.cont = 0;
    // sessionStorage.clear();
  }
}

export default valuesAdm;
