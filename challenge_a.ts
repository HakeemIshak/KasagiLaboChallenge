import fs from 'node:fs';
import { Buffer } from 'node:buffer';

const randomInRange = (max: number) => Math.floor(Math.random() * (max - 1));

interface RandomGenerator {
    alphabetical: () => any
    // Assume real numbers including decimal
    realNumbers: () => string
    // Assume whole numbers
    integers: () => string
    alphanumerics: () => string
}
const RandomStringGenerator: RandomGenerator = {
    alphabetical: () => {
        const chars = 'abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ';
        // Make it extra long, just add 100 to it
        const length = 10 + Math.floor(Math.random() * 10);

        return Array.from(
            { length },
            () => chars[randomInRange(chars.length)]
        ).join('');
    },

    realNumbers: () => {
        return (Math.random() * 100000).toFixed(6)
    },

    integers: () => {
        return Math.floor(Math.random() * 1000000000).toString();
    },

    alphanumerics: () => {
        const chars = '0123456789abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ';
        // Make it extra long, just add 100 to it
        const length = 10 + Math.floor(Math.random() * 10);
        const str = Array.from(
            { length },
            () => chars[randomInRange(chars.length)]
        ).join('');

        // Min space possible for left side 1; Maximum space possible for right side 9;
        const leftSpace = Math.floor(Math.random() * 10) || 1;
        // Random whatever balance from left side, maximum 10 space total
        const rightSpace = Math.floor(Math.random() * (10 - leftSpace + 1)) || 1;

        return ' '.repeat(leftSpace) + str + ' '.repeat(rightSpace);
    }
}

const Randomizer = (): string => {
    const keys = Object.keys(RandomStringGenerator);
    const random = keys[Math.floor(Math.random() * keys.length)];

    return RandomStringGenerator[random]();
}

function writeData(): void {
    const TARGET_SIZE = 10 * 1024 * 1024; // 10MB
    const writeStream = fs.createWriteStream('./challenge-A.txt');
    let totalWritten = 0;

    while (totalWritten < TARGET_SIZE) {
        const value = Randomizer() + ',';

        // Get the size of the buffer
        const buffer = Buffer.from(value);
        const bufferSize = buffer.length;

        // Write to file
        writeStream.write(buffer);
        totalWritten += bufferSize;
    }

    writeStream.end();
}

// Main execution
writeData();
