const { parentPort, workerData } = require("worker_threads");
const scandir = require("./scandir.js");

parentPort.postMessage(scandir(workerData));
