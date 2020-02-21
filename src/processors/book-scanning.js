const _ = require('lodash');

const getLibraries = (numbers, bookScores, amountOfScanningDays) => {
    const libraries = [];
    for (let index = 0; index < numbers.length - 1; index += 2) {
        const signupTime = Number(numbers[index][1]);
        const shippingTime = Number(numbers[index][2]);
        const books = numbers[index + 1].map(index => ({ index: index, score: bookScores[index] }));
        let libraryIndex = 0;
        if (!(signupTime + 1 > amountOfScanningDays)) {
            libraries.push({
                id: libraryIndex,
                amountOfBooks: Number(numbers[index][0]),
                signupTime: signupTime,
                shippingTime: shippingTime,
                books: books,
                orderedBooksByScore: _.orderBy(books, 'score', 'desc')
            });
        }
        libraryIndex++;
    }
    return libraries;
}


const solve = (input) => {
    const numbers = input.map(line => line.map(x => x = +x));
    const amountOfBooks = numbers[0][0];
    const amountOfLibraries = numbers[0][1];
    const amountOfScanningDays = numbers[0][2];
    const bookScores = _.uniq(numbers[1]);
    const libraryData = numbers.filter((el, index) => index > 1);
    const libraries = getLibraries(libraryData, bookScores, amountOfScanningDays);

    console.log(libraries);
    return '';
}

module.exports = (input) => solve(input);