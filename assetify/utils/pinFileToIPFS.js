import { ThirdwebStorage } from '@thirdweb-dev/storage';
import fs from 'fs';
import { Readable } from 'stream';

const storage = new ThirdwebStorage();

// Modified function to accept a file buffer and original file name
const pinFileToIPFS = async (fileBuffer, fileName) => {
    const filePath = `${fileName}`; // Use the original fileName for the saved file
    await new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(filePath);
        const stream = Readable.from(fileBuffer); // Assuming fileBuffer is already a buffer or stream
        stream.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
    });

    try {
        const upload = await storage.upload(filePath);

    } catch (error) {
        console.error('Error pinning file to IPFS:', error);
        throw error;
    }
};


export default pinFileToIPFS;