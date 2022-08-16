const myName = 'Camilo';
const myAge = 12

const suma = (a: number, b: number) => {
  return a + b;
}

class Persona {
  constructor(private age: number, private name: string) {}

  getSummary() {
    return `my name is ${this.name}, ${this.age}`
  }
}

const camilo = new Persona(15, 'Camilo');
camilo.getSummary();
