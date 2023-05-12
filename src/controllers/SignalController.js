import valuesAdm from "./valuesAdm";

class SignalController {
  constructor(chart, signal) {
    this.chart = chart;
    this.name = signal.dataName;
    this.nextValue;
    this.timeSample = signal.samplingTime;
    this.initLabels = signal.labels;
    this.numberSamples = this.chart.data.labels.length;
    this.InitSample = 1;
    this.labels = signal.labels;
    this.ejecutorId;
    this.valuesAdm = new valuesAdm(); //evaluador de seañales
  }

  ejecutor() {
    this.ejecutorId = setInterval(() => {
      this.valuesAdm.dataRun(
        this.chart,
        this.numberSamples,
        this.InitSample,
        this.nextValue,
      );
      this.InitSample++;
    }, this.timeSample *1000);
  }

  setValue(data) {
    this.nextValue = data;
  }

  clear() {
    clearInterval(this.ejecutorId);
    this.chart.data.labels = [...this.initLabels];
    this.chart.data.datasets[0].data = [];
    this.InitSample = 1;
    this.valuesAdm.clearData();
    this.chart.update();
  }

  destroy() {
    this.chart.destroy();
  }
}

export default SignalController;
