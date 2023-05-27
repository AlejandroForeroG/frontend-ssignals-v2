class Evaluator {
  constructor() {
    this.intervalId = null;
    this.counter = 0;
    this.subidas= 0;
    this.evaluateData = [];
    this.pass = false;
  }

  evaluate(signal) {
    if (signal.type == "short") {
      this.pass = true;
      if (signal.getData().length < 0) {
        var promedio = signal.getNextValue();
      } else {
        var num = signal.getData().slice(-1);
        promedio = Math.sqrt(
          (Math.pow(num, 2) + Math.pow(signal.getNextValue(), 2)) / 2
        );
      }
    } else {
      this.pass = false;
      // const currentValue = signal.getNextValue();
      // const previousValue = signal.getPreviousValue();
      // if (
      //   currentValue >= previousValue &&
      //   previousValue < signal.getPreviousValue(2) && currentValue > 20
      // ) {
      //   this.subidas++;
      //   console.log(this.subidas)
      // }
      // if (this.counter >= 10 * 100) {
      //   var promedio = this.subidas / 10*100;
      //   // this.evaluateData.push(subidasPorMinuto);
      //   this.subidas = 0;
      //   this.counter = 0;
      //   this.pass = true;
      // } else {
      //   this.counter++;
      //   this.pass = false;
      // }
     
    }

    if (this.pass) {
      fetch("./limites.json")
        .then((response) => response.json())
        .then((limits) => {
          if (limits[signal.getName()] == undefined) {
            //Verificar si no hay límites definidos para la señal
          } else {
            try {
              if (
                limits[signal.getName()].amarilla.limite_superior >= promedio &&
                limits[signal.getName()].amarilla.limite_inferior <= promedio
              ) {
                // console.log("amarillo");
                signal.setBackground("rgb(243, 216, 61,0.7)");
              } else if (
                limits[signal.getName()].naranja.limite_superior >= promedio &&
                limits[signal.getName()].naranja.limite_inferior <= promedio
              ) {
                // console.log("naranja");
                signal.setBackground("rgb(232, 116, 44,0.7)");
              } else if (
                (limits[signal.getName()].roja.limite_inferior <= promedio &&
                  limits[signal.getName()].roja.limite_superior >= promedio) ||
                promedio <= 1
              ) {
                // console.log("rojo");
                signal.setBackground("rgb(232, 44, 72,0.7)");
              } else {
                signal.setBackground("rgba(51, 214, 146, 0.7)");
              }
            } catch (error) {
              console.log(error);
            }
          }
        })
        .catch((error) => console.error(error));
    }
  }
}
export default Evaluator;
