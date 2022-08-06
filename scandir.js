const path = require("path");
const fs = require("fs");

module.exports = scandir = ({ scanPath }) => {
	let count = 0;

	function scanRecursive(scanPath) {
		fs.readdirSync(scanPath, {
			withFileTypes: true,
		}).forEach((file) => {
			const newPath = path.join(scanPath, file.name);
			return file.isFile() ? count++ : scanRecursive(newPath);
		});
	}

	try {
		scanRecursive(scanPath);
	} catch (e) {
		throw new Error(e.message);
	}

	return count;
};
