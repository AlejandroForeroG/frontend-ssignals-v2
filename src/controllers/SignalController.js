import valuesAdm from "./valuesAdm";
import Evaluator from "./evaluator.js";
const evaluator = new Evaluator();
class SignalController {
  constructor(chart, signal) {
    this.chart = chart;
    this.name = signal.dataName;
    this.type = signal.type;
    this.nextValue = 0;
    this.timeSample = parseFloat(signal.samplingTime);
    this.initLabels = signal.labels;
    this.numberSamples = this.chart.data.labels.length;
    this.InitSample = 1;
    this.labels = signal.labels;
    this.ejecutorId;
    this.valuesAdm = new valuesAdm(); //evaluador de seañales
  }

  start() {
    this.ejecutorId = setInterval(() => {
      this.valuesAdm.dataRun(
        this.chart,
        this.numberSamples,
        this.InitSample,
        this.nextValue
      );
      evaluator.evaluate(this);
      this.InitSample++;
    }, this.timeSample * 1000);
  }

  stop() {
    this.chart.data.labels = [...this.initLabels];
    this.chart.data.datasets[0].data = [];
    this.InitSample = 1;
    this.valuesAdm.clearData();
    this.chart.update();
    clearInterval(this.ejecutorId);
  }

  destroy() {
    this.chart.destroy();
  }
  setNextValue(data) {
    this.nextValue = data;
  }

  getNextValue() {
    return this.nextValue;
  }
  getPreviousValue(steps = 1) {
    const currentData = this.getData();
    const currentIndex = currentData.length - 1;
    return currentData[currentIndex - steps];
  }
  getName() {
    return this.name;
  }
  getData() {
    return this.chart.data.datasets[0].data;
  }
  setBackground(color) {
    this.chart.data.datasets[0].borderColor = color;
    this.chart.data.datasets[0].backgroundColor = color;
  }
}

export default SignalController;
