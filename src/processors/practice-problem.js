const _ = require('lodash');

const findMaxArray = (array) => array.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

const processSum = (sum, otherSlice, index, tempSolutions) => {
    tempSolutions[index].push(otherSlice);
    sum += otherSlice;
}

module.exports = (input) => {
    const numbers = input.map(line => line.map(x => x = +x));
    const max = numbers[0][0];
    const typesOfPizza = numbers[0][1];
    const slicesPerType = numbers[1];
    let tempSolutions = [];
    let solutions = [];

    slicesPerType.forEach((slicesPerPizza, index) => {
        const otherSlicesPerType = slicesPerType.filter((slices, slicesIndex) => slicesIndex !== index);
        let sum = slicesPerPizza;
        tempSolutions[index] = [slicesPerPizza];
        let breakLoop = false;
        _.sortBy(otherSlicesPerType).reverse().forEach(otherSlice => {
            const tempSum = sum + otherSlice;
            breakLoop = tempSum === max;
            if (tempSum <= max) {
                processSum(sum, otherSlice, index, tempSolutions);
            }
        });
        solutions.push(tempSolutions.map(tempSolution => _.sortBy(tempSolution)));
        if (breakLoop) {
            return;
        }
    });
    const solution = _.flatten(solutions)[findMaxArray(_.flatten(solutions.map(sol => sol.map(sol => _.sum(sol)))))];
    return `${solution.length}\n${solution.join(' ')}`;
}