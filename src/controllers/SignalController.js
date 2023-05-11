import valuesAdm from "./valuesAdm";

let counter = 0;
class SignalController {
  constructor(chart, signal) {
    this.chart = chart;
    this.name = signal.dataName;
    this.nextValue;
    this.initLabels = signal.labels;
    this.numberSamples = this.chart.data.labels.length;
    this.InitSample = 1;
    this.labels = signal.labels;
    this.valuesAdm = new valuesAdm(); //evaluador de seañales
  }
 
  ejecutor(data) {
    this.nextValue = data;
    this.valuesAdm.dataRun(
      this.chart,
      this.numberSamples,
      this.InitSample,
      this.nextValue
    );
    this.InitSample++;
  }


  clear(){
    this.chart.data.labels = [...this.initLabels];
    this.chart.data.datasets[0].data = [];
     this.InitSample = 1;
    this.valuesAdm.clearData();
    this.chart.update();
  }
}

export default SignalController;
