const _ = require('lodash');

const solve = (input) => {
    const numbers = input.map(line => line.map(x => x = +x));
    const maxSlices = numbers[0][0];
    const amountOfPizzas = numbers[1].length;
    const slicesPerType = numbers[1];
    let currentIndex;
    let solution = [];
    let total = 0;

    // Go through each pizza type
    for (let pizzaIndex = amountOfPizzas - 1; pizzaIndex >= 0; pizzaIndex--) {
        let sumPerPizza = 0;
        currentIndex = pizzaIndex;
        let tempSolution = [];

        // Go through each pizza type, except the pizza types with smaller slice count the current one
        for (let otherSliceIndex = currentIndex; otherSliceIndex >= 0; otherSliceIndex--) {
            const amountOfSlices = slicesPerType[otherSliceIndex];
            let sumWithNextElement = sumPerPizza + amountOfSlices;

            if (sumWithNextElement === maxSlices) {
                // Stop looking if you already found the best solution
                sumPerPizza = sumWithNextElement;
                tempSolution.unshift(otherSliceIndex);
                break;
            } else if (sumWithNextElement <= maxSlices) {
                // Add the current solution if you haven't found the best one yet
                sumPerPizza = sumWithNextElement;
                tempSolution.unshift(otherSliceIndex);
            } else {
                // Solutions higher than the max amount of slices should be discarded
                continue;
            }
        }

        // Stop when the best solution is found in the inner loop
        if (total < sumPerPizza) {
            total = sumPerPizza;
            solution = tempSolution;
        }
    }
    return `${solution.length}\n${solution.join(' ')}`
}

module.exports = (input) => solve(input);