import valuesAdm from "./valuesAdm";
import Evaluator from "./evaluator.js";
const evaluator = new Evaluator();
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

  ejecutor(data) {
    // this.ejecutorId = setInterval(() => {
      this.valuesAdm.dataRun(
        this.chart,
        this.numberSamples,
        this.InitSample,
        this.nextValue = data,
      );
      evaluator.evaluate(this)
      this.InitSample++;
    // }, this.timeSample *1000);
    
  }

  
  clear() {
    // clearInterval(this.ejecutorId);
    this.chart.data.labels = [...this.initLabels];
    this.chart.data.datasets[0].data = [];
    this.InitSample = 1;
    this.valuesAdm.clearData();
    this.chart.update();
  }
  
  destroy() {
    this.chart.destroy();
  }
  setValue(data) {
    this.nextValue = data;
  }

  getName(){
    return this.name;
  }
  getData(){
    return this.chart.data.datasets[0].data;
  }
  getValue(){
    return this.nextValue;
  }
  setBackground(color){
    this.chart.data.datasets[0].backgroundColor = color;
  }
}

export default SignalController;
