export function isPrime(x: u32): bool {
    for (let i: u32 = 2; i < x; i++) {
        if (x % i === 0) {
            return false;
        }
    }

    return true;
}
