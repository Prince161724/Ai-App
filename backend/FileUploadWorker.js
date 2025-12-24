import { Worker } from 'worker_threads';

const ToReply = (path, gmail) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker1.js', {
            workerData: { path, gmail }
        });

        worker.on('message', (data) => {
            resolve(data);
        });

        worker.on('error', (err) => {
            reject(err);
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker exited with code ${code}`));
            }
        });
    });
};

export default ToReply;