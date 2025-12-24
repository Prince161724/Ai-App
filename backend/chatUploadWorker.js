import { Worker } from 'worker_threads';

const chatUpload=(ques,gmail)=>{
    return new Promise((resolve,reject)=>{
        const worker=new Worker('./worker2.js',{
        workerData:{ques:ques,gmail:gmail}
    });

    worker.on('message',(data)=>{
        resolve(data);
    })

    worker.on('error',(err)=>{
        reject(new Error("New Error is ",err.error))
    });

    worker.on('exit',(code)=>{
        if(code!=0) reject(new Error("code Exited with ",code));
    })
    })
}

export default chatUpload;

