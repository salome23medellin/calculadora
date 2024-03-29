class Calculadora {
  sumar = (num1, num2) => num1 + num2;
  restar = (num1, num2) => num1 - num2;
  dividir = (num1, num2) => num1 / num2;
  multiplicar = (num1, num2) => num1 * num2;
}

class Display {
  constructor(displayValorAnterior, displayValorActual) {
      this.displayValorActual = displayValorActual;
      this.displayValorAnterior = displayValorAnterior;
      this.calculador = new Calculadora();
      this.tipoOperacion = undefined;
      this.valorActual = '';
      this.valorAnterior = '';
      this.signos = {
          sumar: '+',
          dividir: '%',
          multiplicar: 'x',
          restar: '-',
      }
  }

  borrar() {
      this.valorActual = this.valorActual.toString().slice(0, -1);
      this.imprimirValores();
  }

  borrarTodo() {
      this.valorActual = '';
      this.valorAnterior = '';
      this.tipoOperacion = undefined;
      this.imprimirValores();
  }

  computar(tipo) {
      this.tipoOperacion !== 'igual' && this.calcular();
      this.tipoOperacion = tipo;
      this.valorAnterior = this.valorActual || this.valorAnterior;
      this.valorActual = '';
      this.imprimirValores();
  }

  agregarNumero(numero) {
      if (this.valorActual === '0' && numero !== '.') {
          this.valorActual = numero.toString();
      } else if (numero === '.' && this.valorActual.includes('.')) {
          return;
      } else {
          this.valorActual = this.valorActual.toString() + numero.toString();
      }
      this.imprimirValores();
  }

  imprimirValores() {
      this.displayValorActual.textContent = this.valorActual;
      this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
  }

  calcular() {
      const valorAnterior = parseFloat(this.valorAnterior);
      const valorActual = parseFloat(this.valorActual);

      if (isNaN(valorActual) || isNaN(valorAnterior)) return;

      const resultado = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
      this.valorActual = resultado.toFixed(2);

      this.imprimirValores();
  }
}

const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');

const display = new Display(displayValorAnterior, displayValorActual);

botonesNumeros.forEach(boton => {
  boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
});

botonesOperadores.forEach(boton => {
  boton.addEventListener('click', () => display.computar(boton.value))
});
