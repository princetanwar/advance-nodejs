# Worker Threads

The Node.js worker_threads module enables the creation of lightweight threads, known as worker threads, to perform CPU-intensive JavaScript operations in parallel. This module allows Node.js applications to leverage multi-core systems effectively and execute code concurrently, enhancing performance and responsiveness.

``` const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  // Code for the main thread
  const worker = new Worker("./worker.js"); // same file path

  // Receive messages from worker thread
  worker.on("message", (message) => {
    console.log(`Message from worker: ${message}`);
  });

  setTimeout(() => {
    worker.postMessage("Hello from worker");
  }, 1000);
} else {
  // Code for the worker thread
  // Send message to main thread

  parentPort.on("message", (message) => {
    console.log(`Message from main thread: ${message}`);
    parentPort.postMessage("from worker");
  });
}

```