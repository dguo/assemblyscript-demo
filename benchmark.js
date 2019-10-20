const Benchmark = require('benchmark');

const assemblyScriptIsPrime = require('./index').isPrime;

function isPrime(x) {
    for (let i = 2; i < x; i++) {
        if (x % i === 0) {
            return false;
        }
    }

    return true;
}

const suite = new Benchmark.Suite;
const startNumber = 2;
const stopNumber = 10000;

suite.add('AssemblyScript isPrime', function () {
    for (let i = startNumber; i < stopNumber; i++) {
        assemblyScriptIsPrime(i);
    }
}).add('JavaScript isPrime', function () {
    for (let i = startNumber; i < stopNumber; i++) {
        isPrime(i);
    }
}).on('cycle', function (event) {
    console.log(String(event.target));
}).on('complete', function () {
    const fastest = this.filter('fastest');
    const slowest = this.filter('slowest');
    const difference = (fastest.map('hz') - slowest.map('hz')) / slowest.map('hz') * 100;
    console.log(`${fastest.map('name')} is ~${difference.toFixed(1)}% faster.`);
}).run();
