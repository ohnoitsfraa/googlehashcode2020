const _ = require('lodash');

module.exports = (input) => {
    const numbers = input.map(line => line.map(x => x = +x));
    const max = numbers[0][0];
    const typesOfPizza = numbers[0][1];
    const slicesPerType = numbers[1];
    let tempSolutions = [];

    slicesPerType.forEach((slicesPerPizza, index) => {
        const otherSlicesPerType = slicesPerType.filter((slices, slicesIndex) => slicesIndex !== index);
        let sum = slicesPerPizza;
        tempSolutions[index] = [slicesPerPizza];
        _.sortBy(otherSlicesPerType).reverse().forEach(otherSlice => {
            if (sum + otherSlice <= max) {
                sum += otherSlice;
                tempSolutions[index].push(otherSlice);
            }
        });
        tempSolutions = tempSolutions.map(tempSolution => _.sortBy(tempSolution));
        console.log(tempSolutions);
    });

    return input;
}