const fs = require('fs');
const LZString = require('lz-string');

let data = ''; // Data to be compressed
fs.readFile('input.txt', 'utf8', (err, fileContent) => {
    if (err) {
        console.error(err);
        return;
    }

    // Decompress the data
    data = fileContent
    console.log("Data length is ", data.length)


    const compressedData = LZString.compressToBase64(data);
    console.log("Compressed. Now it looks like, ", compressedData)
    fs.writeFile('compressed.txt', compressedData, 'utf8', (err) => {
        if (err) {
        console.error(err);
        return;
        }

        console.log('Compressed data has been saved to file.');
    });
    console.log("Reading compressed data from file ")
    fs.readFile('compressed.txt', 'utf8', (err, fileContent) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Decompressing data")
        // Decompress the data
        const decompressedData = LZString.decompressFromBase64(fileContent);
        console.log('Decompressed. Now it looks like, ', decompressedData);
        console.log("Writting decompressed data to file")
        fs.writeFile('compressedUncompressed.txt', decompressedData, 'utf8', (err) => {
            if (err) {
            console.error(err);
            return;
            }
    
            console.log('Decompressed data has been saved to file.');
        });
      
    });
});
