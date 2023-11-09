class Display {
  constructor(displayValorAnterior, displayValorActual) {
    this.displayValorActual = displayValorActual;
    this.displayValorAnterior = displayValorAnterior;
    this.calculador = new Calculadora();
    this.tipoOperacion = undefined;
    this.valorActual = "";
    this.valorAnterior = "";
    this.signos = {
      sumar: "+",
      dividir: "%",
      multiplicar: "x",
      restar: "-",
    };
  }

  borrar() {
    this.valorActual = this.valorActual.slice(0, -1);
    this.imprimirValores();
  }

  borrarNegativo() {
    const posicionNegativo = this.valorActual.indexOf("-");
    this.valorActual =
      this.valorActual.slice(0, posicionNegativo) +
      this.valorActual.slice(posicionNegativo + 1);
    this.imprimirValores();
  }
  borrarTodo() {
    this.valorActual = "";
    this.valorAnterior = "";
    this.tipoOperacion = undefined;
    this.imprimirValores();
  }

  computar(tipo) {
    if (this.valorActual === "") {
      return;
    } else {
      this.tipoOperacion !== "igual" && this.calcular();
      this.tipoOperacion = tipo;
      this.valorAnterior = this.valorActual || this.valorAnterior;
      this.valorActual = "";
    }
    this.imprimirValores();
  }

  agregarNumero(numero) {
    if (numero === "-" && this.valorActual.includes("-")) {
      // Si ya hay un signo negativo, no hacer nada
      return;
    }
  
    if (numero === "-") {
      // Si el número a agregar es un signo negativo y no está presente, agregarlo al principio
      this.valorActual = "-" + this.valorActual.replace("-", ""); // Elimina cualquier otro signo negativo presente
    } else if (numero === "." && this.valorActual.includes(".")) {
      // Si el número a agregar es un punto y ya hay un punto, no hacer nada
      return;
    } else {
      // En cualquier otro caso, agregar el número normalmente
      this.valorActual = this.valorActual.toString() + numero.toString();
    }
  
    // Actualizar el display
    this.imprimirValores();
  }

  imprimirValores() {
    this.displayValorActual.textContent = this.valorActual;
    this.displayValorAnterior.textContent = `${this.valorAnterior} ${
      this.signos[this.tipoOperacion] || ""
    }`;
  }

  calcular() {
    const valorAnterior = parseFloat(this.valorAnterior);
    const valorActual = parseFloat(this.valorActual);

    if (isNaN(valorActual) || isNaN(valorAnterior)) return;
    this.valorActual = this.calculador[this.tipoOperacion](
      valorAnterior,
      valorActual
    );
  }
}
