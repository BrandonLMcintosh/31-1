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

	for (let i = 0; i < 4; i++) {
		numbersRequests.push(axios.get(url + numberString));
	}

	Promise.all(numbersRequests)
		.then((result) => {
			const factsArray = [[], [], [], []];
			for (let facts of result) {
				let index = 0;
				for (let fact in facts.data) {
					p = document.createElement("p");
					p.innerText = facts.data[fact];
					factsArray[index].push(p);
					index++;
				}
				index = 0;
				for (let div of numberDivs) {
					for (let fact of factsArray[index]) {
						div.appendChild(fact);
					}
					div.style.backgroundColor = "gray";
					index++;
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
