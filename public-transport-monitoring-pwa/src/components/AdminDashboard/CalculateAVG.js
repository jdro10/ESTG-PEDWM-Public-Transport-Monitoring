const workercode = () => {
	onmessage = function (evt) {
		let data = evt.data;

		let sum = 0;
		let max = data[0].executionTime;
		let min = data[0].executionTime;
		let count = 0;

		data.forEach((item) => {
			if (item.executionTime != 0) {
				sum += item.executionTime;
				count++;
				if (item.executionTime >= max) {
					max = item.executionTime;
				}
				if (item.executionTime <= min) {
					min = item.executionTime;
				}
			}
		});

		let avg = sum / count;

		let dataArray = [max, min, avg];

		console.log('aqui dentro do worker');
		postMessage(dataArray);
	};
};

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
