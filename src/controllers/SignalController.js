import valuesAdm from "./valuesAdm";

let counter = 0;
class SignalController{
    constructor(chart){
        this.chart = chart;
        this.name = 
        this.valuesAdm = new valuesAdm();
       
        
    }

    mensaje(){
       this.chart.data.datasets.forEach((dataset) => {
         dataset.data.push(1);
       });
      this.chart.update();
    }
}

export default SignalController;