const calculator = (function () {

    function add(numberString) {

        if (numberString === '') {
            return 0;
        }

        return calculateSum(getNumbers(numberString, ','));

    }


    /*Function to extract numbers from string based on delimeter */
    function getNumbers(string, delimiter) {
        return string.split(delimiter)
            .filter(n => n !== '')
            .map(n => parseInt(n));
    }

    /*Function to return sum of numbers */
    function calculateSum(numbers) {

        const finalSum = numbers.reduce((sum, n) => {

            return sum + n;
        }, 0);

        return finalSum;
    }


    return { add };

}());

console.info(calculator.add('')); // 0
console.info(calculator.add('1,2,3')); // 6
