const calculator = (function () {

    function add(numberString) {

        if (numberString === '') {
            return 0;
        }
        const delimiter = getDelimiter(numberString);
        const formattedInput = formatInput(numberString);
        return calculateSum(getNumbers(formattedInput, delimiter));
    }

    /*Function to format the input string */
    function formatInput(input) {
        const delimiterRegExp = /^(\/\/.*\n)/;
        const matches = delimiterRegExp.exec(input);
        if (matches && matches.length > 0) {
            return input.replace(delimiterRegExp, '');
        }

        return input;
    }

    /*Function to get the delimiters */
    function getDelimiter(input) {
        const delimiters = [];
        const multipleDelimiterRegexp = /(?:^\/\/)?\[([^\[\]]+)\]\n?/g;
        let matches = multipleDelimiterRegexp.exec(input);
        while (matches !== null) {
            delimiters.push(matches[1]);
            matches = multipleDelimiterRegexp.exec(input);
        }
        if (delimiters.length > 0) {
            return new RegExp('[' + delimiters.join('') + ']');
        }
        matches = /^\/\/(.*)\n/.exec(input);
        if (matches && matches[1]) {
            return matches[1];
        }
        return /[\n,]/;

    }


    /*Function to extract numbers from string based on delimeter */
    function getNumbers(string, delimiter) {
        return string.split(delimiter)
            .filter(n => n !== '')
            .map(n => parseInt(n));
    }

    /*Function to return sum of numbers */
    function calculateSum(numbers) {

        const negatives = [];
        const finalSum = numbers.reduce((sum, n) => {
            if (n > 1000) {
                return 0;
            }
            if (n < 0) {
                negatives.push(n);
                return 0;
            }
            return sum + n;
        }, 0);
        if (negatives.length > 0) {
            throw new Error('Negatives not allowed: ' + negatives.join(','));
        }
        return finalSum;
    }


    return { add };

}());

console.info(calculator.add('')); // 0
console.info(calculator.add('1,2,3')); // 6
console.info(calculator.add('1\n2,3')); // 6
console.info(calculator.add('//;\n1;2;3')); // 6
console.info(calculator.add('1001,2')); // 2
console.info(calculator.add('//[**]\n1**2**3')); // 6
console.info(calculator.add('//[*][%]\n1*2%3')); // 6
console.info(calculator.add('//[..][%%]\n1..2%%3')); // 6
console.info(calculator.add('-1,-3,2')); // Negatives not allowed: -1,-3
