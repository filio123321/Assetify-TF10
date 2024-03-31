// import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
// readable
import { Readable } from 'stream';

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YTE2ZjFlOC02Y2IwLTQ1OWEtOTFmYS1mMWYyYjc4ZmM3ZjUiLCJlbWFpbCI6ImZ0aXRvcG91bG9zQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiOTAwMWUzYjZjYmYxNTJhNjc4OCIsInNjb3BlZEtleVNlY3JldCI6IjQ2NmI4MTcyNGFhMzM0OWQzMzEwN2U3OGQ1OTRiNWNmOTllN2E1ODgxNmY2MGM5OTNmNjc0Mjc0Yzc4OWY0ZDciLCJpYXQiOjE3MTE1ODc0NDJ9.Ym7z5CO_OvjZ_OQHp2x51gZ533GjI3HOaY9K7UXETL8'


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

    console.log('Successfully wrote all data to file:', filePath);

    // Pinning file to IPFS
    let formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const pinataOptions = JSON.stringify({ cidVersion: 0 });
    formData.append('pinataOptions', pinataOptions);

    const pinataMetadata = JSON.stringify({ name: fileName });
    formData.append('pinataMetadata', pinataMetadata);

    try {
        console.log('Trying to pin file to IPFS...');
        const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${JWT}`, // Ensure JWT is valid
                // Do not set Content-Type here, let FormData handle it
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Successfully pinned file to IPFS:', data);
        return data;
    } catch (error) {
        console.error('Error pinning file to IPFS:', error);
        throw error;
    }
};


export default pinFileToIPFS;