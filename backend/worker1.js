import {parentPort,workerData} from 'worker_threads'; 
import {PineconeStore} from '@langchain/pinecone';
import {Pinecone} from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
import {RecursiveCharacterTextSplitter} from '@langchain/textsplitters';
import {GoogleGenerativeAIEmbeddings} from '@langchain/google-genai';
import {PDFLoader} from '@langchain/community/document_loaders/fs/pdf';
dotenv.config();

async function embedAndStore(path, gmail) {
    const pdfloader = new PDFLoader(path);
    const docs = await pdfloader.load();
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200
    });

    const embeddingsModel = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: 'text-embedding-004'
    });

    const chunkedDocs = await splitter.splitDocuments(docs);
    const pinecone = new Pinecone({
        apiKey: process.env.PINEAPI
    });

    const index = pinecone.Index(process.env.INDEXPINE);
    await PineconeStore.fromDocuments(chunkedDocs, embeddingsModel, {
        pineconeIndex: index,
        maxConcurrency: 5,
        namespace: String(gmail)
    });
    return true;
};

(async function(){
    try{
    const {path,gmail}=workerData;
    const result=await embedAndStore(path,gmail);
    parentPort.postMessage(result);
    }
    catch(err){
        parentPort.postMessage({
            success:false,
            error:err.message
        })
    }
})();
