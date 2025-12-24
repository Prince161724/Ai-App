import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { Pinecone } from '@pinecone-database/pinecone';
import { ChatGroq } from '@langchain/groq';
import dotenv from 'dotenv';
import {parentPort,workerData} from 'worker_threads'

dotenv.config();

const history = {};  // ✅ Object, not array

const llm = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.5
});

async function queryModifier(ques, gmail) {
    // ✅ Initialize history for user if not exists
    if (!history[gmail]) history[gmail] = [];
    
    if (history[gmail].length == 0) return ques;

    const context = history[gmail].slice(-3);

    const prompt = `You are expert in chaining up questions by relating the new question given to you in newQuestion them with the previous question and answers given to you, and you can make up one single question that can be understandable without any other context and you have to return that one question only and if the question is totally different from the topic or context given to you then you can reply "not related to the context"
    context: ${JSON.stringify(context)},
    newQuestion: ${ques}
    `;
    console.log("Done till here ");
    const response = await llm.invoke(prompt);
    return response.content;
}

async function chat(ques, gmail) {
    try {
        const response = await queryModifier(ques, gmail);  // ✅ Pass gmail
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_API_KEY,
            model: 'text-embedding-004'
        });

        const embeddedQuery = await embeddings.embedQuery(response);

        const pinecone = new Pinecone({
            apiKey: process.env.PINEAPI
        });

        const pineIndex = pinecone.Index(process.env.INDEXPINE).namespace(String(gmail));  // ✅ Use gmail namespace

        const context = await pineIndex.query({
            topK: 3,
            vector: embeddedQuery,
            includeMetadata: true
        });

        const toGiveAi = context.matches
            .map(match => match. metadata?. text || '')
            .join('\n---\n');

        const prompt = `you are an expert in answering questions from the context given and if it is the context and the context is related, than you have to answer everything whatever the user asks like if that thing is present you can elaborate on the wish of user as much as the user wants and if it totally not related to the context than you have to reply that "Out of context"
        context: ${toGiveAi},
        question: ${response}
        `;

        const answer = await llm.invoke(prompt);

        // ✅ Store in user-specific history
        if (! history[gmail]) history[gmail] = [];
        history[gmail]. push({
            user: response,
            answer: answer.content
        });

        return answer.content;  // ✅ Return answer

    } catch (error) {
        console.error('\n❌ Error:', error. message);
        throw error;
    }
}

(async function(){
const {ques,gmail}=workerData;
const reply=await chat(ques, gmail);
try{
parentPort.postMessage(reply);
}
catch(err){
parentPort.postMessage({
    status:false,
    error:err.message
})
}
})();