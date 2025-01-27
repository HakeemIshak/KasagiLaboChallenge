import fs from 'node:fs';

const getType = (value: string) => {
    if (value.includes('.')) return 'realNumbers';
    else if (/^\d+$/.test(value)) return 'integers';
    else if (/\d/.test(value)) return 'alphanumerics';
    else return 'alphabetical';
}

const processFile = (filename: string) => {
    const writeStream = fs.createWriteStream('./logs/challenge-B.log');
    const readStream = fs.createReadStream(filename, { encoding: 'utf8' });
    let remains = ''; // remains from previous chunk that we didnt process

    readStream.on('data', chunk => {
        const data = remains + chunk;

        const parts = data.split(',');
        remains = parts.pop() || '' // this part maybe incomplete, didnt reach next comma

        parts.forEach(i => {
            i = i.trim();
            const type = getType(i);

            // Print to console and log in seperate file
            console.log(i, type);
            writeStream.write(`${i}, Type: ${type}\n`);
        });
    })

    // Process remains if there's any since we already done reading
    readStream.on('end', () => {
        if (remains) {
            remains = remains.trim();
            const type = getType(remains);

            // Print to console and log in seperate file
            console.log(remains, getType(remains));
            writeStream.write(`${remains}, Type: ${type}\n`);
        }

        console.log("File processed...");
        writeStream.end();
    })

    readStream.on('error', (err) => {
        console.error(`Error processing file, have you running challenge_a.ts?\n`, err.message);
    });
}

// Main execution
// Ensure the logs directory exists
if (!fs.existsSync("./logs")) {
  fs.mkdirSync("./logs", { recursive: true });
}

processFile('./challenge-A.txt');
