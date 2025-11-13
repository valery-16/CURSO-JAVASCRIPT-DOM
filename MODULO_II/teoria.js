//decalaracion (hoisting) es una caracteristica de javascript que permite usar funciones y variables antes de ser declaradas

// Ejemplo de hoisting con funciones

function suma(a, b) {
    return a + b;
    
}

// Expression   es una caracteristica de javascript que permite usar funciones y variables antes de ser declaradas
console.log(suma(2, 3)); // Output: 5   ctrl  alt n 

const mult = function(a, b) {
    return a * b;
}

console.log(mult(2, 3)); // Output: 

// Arrow function  permite una sintaxis mas corta para escribir funciones

const cuadrado = n => n * n;

console.log(cuadrado(4)); // Output: 16

// parametros por defecto

function promedio(...numeros) {

    if (numeros.length === 0) return 0;
    
    return numeros.reduce((acc, curr) => acc + curr, 0) / numeros.length; // suma todos los numeros y los divide por la cantidad de numeros. reduce es un metodo de los arrays que recibe una funcion y un valor inicial

}

console.log(promedio(4, 6, 8)); // Output: 6

const xs = [1, 2, 3];
const ys = [...xs, 4, 5, 6]; // operador spread  permite expandir un array en elementos individuales

console.log(ys); // Output: [1, 2, 3, 4, 5, 6]

// Destructuring assignment  permite extraer valores de arrays o propiedades de objetos en variables distintas
const [a, b, c] = xs;
console.log(a, b, c);   

const persona = { nombre: 'Juan', edad: 30 };
const { nombre,  edad} = persona;
console.log(nombre, edad);

// metdos de arrays

const numeros = [1, 2, 3, 4, 5];
console.log(numeros.map(n => n * 2));  // impmiendo cada numero por 2

console.log(numeros.filter(n => n % 2 === 0)); //imprimiendo solo los numeros pares

console.log(numeros.reduce((acc, curr) => acc + curr, 0)); // sumando todos los numeros
// reduce toma una funcion y un valor inicial, y aplica la funcion a cada elemento del array, acumulando el resultado

console.log(numeros.find(n => n > 3)); // buscando el primer numero mayor a 3
console.log(numeros.some(n => n > 4)); // verificando si hay algun numero mayor a 4
// some devuelve true si al menos un elemento cumple la condicion
console.log(numeros.every(n => n > 0)); // verificando si todos los numeros son mayores a 0
// every devuelve true si todos los elementos cumplen la condicion