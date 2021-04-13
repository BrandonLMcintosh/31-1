const url = "http://numbersapi.com/";

const numberForm = document.querySelector("form");
const numberInputs = document.querySelectorAll("input");
const numberDivs = document.querySelectorAll("div");
const numbersRandom = document.querySelector("#random");
const numberSubmit = document.querySelector("#submit");

const random = () => {
	return Math.floor(Math.random() * 100 + 1);
};

numberSubmit.addEventListener("click", function (evt) {
	const numbersRequests = [];
	let numberString = "";
	for (let number of numberInputs) {
		numberString += `${number.valueAsNumber},`;
	}

	numberString = numberString.slice(0, numberString.length - 1);

	for (let i = 0; i < 5; i++) {
		numbersRequests.push(axios.get(url + numberString));
	}
	Promise.all(numbersRequests)
		.then((result) => {
			for (let facts of result) {
				for (let fact in facts.data) {
					p = document.createElement("p");
					p.innerText = facts.data[fact];
					for (let div of numberDivs) {
					}
				}
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

numbersRandom.addEventListener("click", function (evt) {
	for (let number of numberInputs) {
		number.valueAsNumber = random();
	}
});
