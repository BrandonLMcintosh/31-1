const shuffle = document.querySelector("#shuffle");
const draw = document.querySelector("#draw");
const table = document.querySelector("div");

const baseURL = "https://deckofcardsapi.com/api/deck/";
const shuffleURL = baseURL + "new/shuffle/?deck_count=1";
let deckID = null;
let cardCount = 0;

draw.style.marginBottom = "4rem";
shuffle.style.marginBottom = "4rem";

const degrees = () => {
	return Math.floor(Math.random() * 360 + 1);
};

draw.style.display = "none";

shuffle.addEventListener("click", () => {
	axios.get(shuffleURL)
		.then((res) => (deckID = res.data.deck_id))
		.catch((err) => console.log(err));
	draw.style.display = "block";
	shuffle.style.display = "none";
});

draw.addEventListener("click", () => {
	const drawURL = baseURL + deckID + "/draw/?count=1";
	axios.get(drawURL)
		.then((res) => {
			if (res.data.remaining == 0) {
				draw.style.display = "none";
				shuffle.style.display = "block";
				table.innerHTML = "";
				cardCount = 0;
				return;
			}
			card = res.data.cards[0];
			const suit = card.suit;
			const value = card.value;
			const title = `${value} of ${suit}`;
			const cardImage = document.createElement("img");
			cardImage.src = card.image;
			cardImage.alt = card.title;
			cardImage.style.position = "absolute";
			cardImage.style.zIndex = String(cardCount);
			table.appendChild(cardImage);
			console.log(res.data.cards[0]);
			console.log(title);
			cardCount++;
		})
		.catch((err) => console.log(err));
});
//
