function makeLowerCase(word) {
    word = word.toLowerCase();
    console.log(`Inside:\t${word}`);
}

function updateCoordinate(coordinate) {
    coordinate = [-8.409518, 115.188919];
    console.log(`Inside:\t${coordinate}`);
}

function doSquare(num) {
    num = num ** 2;
    console.log(`Inside:\t${num}`);
}

function bubbleSort(numbers) {
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = 0; j < numbers.length - i - 1; j++) {
            if (numbers[j] > numbers[j + 1]) {
                const tmp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = tmp;
            }
        }
    }
    console.log(`Inside:\t${numbers}`);
}

function updateStatusCode(statusCodes) {
    statusCodes['ok'] = 201;
    console.log(`Inside:\t${JSON.stringify(statusCodes)}`);
}

function addFruit(fruits) {
    fruits.add('avocado');
    console.log(`Inside:\t${[...fruits]}`);
}

function changeFruits(fruits) {
    fruits = new Set(['orange', 'pineapple', 'apricot']);
    console.log(`Inside:\t${[...fruits]}`);
}

function main() {
  
    /*  const fruit = 'APPLE';
    console.log(`\nBefore:\t${fruit}`);
    makeLowerCase(fruit);
    console.log(`After:\t${fruit}`);*/

   /*  const coordinate = [47.497913, 19.040236];
    console.log(`\nBefore:\t${coordinate}`);
    updateCoordinate(coordinate);
    console.log(`After:\t${coordinate}`); */

    /* const number = 10;
    console.log(`\nBefore:\t${number}`);
    doSquare(number);
    console.log(`After:\t${number}`); */

    /* const numbers = [5, 7, 1, 15, 3];
    console.log(`\nBefore:\t${numbers}`);
    bubbleSort(numbers);
    console.log(`After:\t${numbers}`);*/
   
    /* statusCodes = {'ok': 200, 'bad_request': 400, 'forbidden': 403};
    console.log(`\nBefore:\t${JSON.stringify(statusCodes)}`);
    updateStatusCode(statusCodes);
    console.log(`After:\t${JSON.stringify(statusCodes)}`); */

    const fruits = new Set(['apple', 'banana', 'mango']);
    console.log(`\nBefore:\t${[...fruits]}`);
    addFruit(fruits);
    console.log(`During:\t${[...fruits]}`);
    changeFruits(fruits);
    console.log(`After:\t${[...fruits]}`); 
}

main();