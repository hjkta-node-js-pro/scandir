const path = require("path");
const { Worker } = require("worker_threads");

const [_pathToRead] = process.argv.slice(2);
const pathToRead = _pathToRead || path.join(__dirname, "dummy_structure");

const main = new Promise((resolve, reject) => {
	const worker = new Worker("./worker.js", {
		workerData: {
			scanPath: pathToRead,
		},
	});

	worker.on("message", (response) => {
		resolve(response);
	});

	worker.on("error", (error) => {
		reject(error);
	});
});

main
	.then((count) => {
		console.log(count);
	})
	.catch((error) => {
		console.error(error.message);
	});
