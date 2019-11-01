(async () => {
    const importObject = {
        env: {
            abort(_msg, _file, line, column) {
                console.error("abort called at index.ts:" + line + ":" + column);
            }
        }
    };
    const module = await WebAssembly.instantiateStreaming(
        fetch("build/optimized.wasm"),
        importObject
    );
    const isPrime = module.instance.exports.isPrime;

    const result = document.querySelector("#result");
    document.querySelector("#prime-checker").addEventListener("submit", event => {
        event.preventDefault();
        result.innerText = "";
        const number = event.target.elements.number.value;
        result.innerText = `${number} is ${isPrime(number) ? '' : 'not '}prime.`;
    });
})();

