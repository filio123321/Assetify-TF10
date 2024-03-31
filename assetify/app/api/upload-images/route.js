// Assuming pinFileToIPFS is correctly implemented to handle a stream and filename
import pinFileToIPFS from "@/utils/pinFileToIPFS";
import { pipeline } from 'stream/promises'; // Use pipeline for error handling
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; // For generating unique filenames

export async function POST(req) {
    try {
        const formData = await req.formData();
        const files = await formData.getAll('file');
        console.log('Files received:', files.map(file => file.name));

        // Handle file saving and uploading concurrently with Promise.all
        const uploads = await Promise.all(files.map(async (file) => {
            const uniqueFilename = `${uuidv4()}_${file.name}`;
            const path = `./uploads/${uniqueFilename}`; // Ensure your uploads directory exists

            // Save the file locally for debugging (optional)
            await pipeline(file.stream(), fs.createWriteStream(path));
            console.log(`Saved ${file.name} to ${path}`);

            // Now upload the file to IPFS
            const ipfsHash = await pinFileToIPFS(fs.createReadStream(path), file.name);

            // delete the file
            fs.unlinkSync(path);
            
            return { IpfsHash: ipfsHash, LocalPath: path };
        }));

        const ipfsHashes = uploads.map(upload => upload.IpfsHash);
        console.log('IPFS hashes:', ipfsHashes);
        return new Response(JSON.stringify({ ipfsHashes }), { status: 200 });
    } catch (error) {
        console.error('Error in operation:', error);
        return new Response('Failed to upload to IPFS', { status: 500 });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
