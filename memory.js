
document.addEventListener('DOMContentLoaded', () => {
	//My array with cards' names and path of each image
	let cardArr = [{
			name: 'medusa',
			img: 'images/medusa.png'
		}, {
			name: 'mostrocorna',
			img: 'images/mostrocorna.png'
		}, {
			name: 'mostrorosso',
			img: 'images/mostrorosso.png'
		},
		{
			name: 'mostrosole',
			img: 'images/mostrosole.png'
		}, {
			name: 'mostroviola',
			img: 'images/mostroviola.png'
		}, {
			name: 'alieno',
			img: 'images/alieno.png'
		}
	];

	//Now we duplicate each element to make pairs
	cardArr = cardArr.reduce((res, item) => {
		return res.concat([item, item]);
	}, []);

	//We apply random sort
	cardArr.sort(order => 0.5 - Math.random());

	let grid = document.getElementById('grid');
	let result = document.getElementById('result');
	let cardsChosen = [];
	let cardsChosenId = [];
	const cardsWon = [];

	//Foreach statement used to create cards , we assign the click event listener
	cardArr.forEach((item, i) => {
		let card = document.createElement('img');
		card.setAttribute('src', 'images/back.png');
		card.setAttribute('id-card', i);
		grid.appendChild(card);
		card.addEventListener('click', flipCard);
	});

	//Flip your card
	const flipCard = () => {
		let cardId = this.getAttribute('id-card');
		cardsChosen.push(cardArr[cardId].name);
		cardsChosenId.push(cardId);
		this.setAttribute('src', cardArr[cardId].img);
		if (cardsChosen.length == 2) {
			setTimeout(checkForMatch, 500);
		}
	}

	//Check for matches
	const checkForMatch = () => {
		let cards = document.querySelectorAll('img');
		const idFirst = cardsChosenId[0];
		const idSecond = cardsChosenId[1];
		//if player click same card two times..
		if (idFirst == idSecond) {
			//Flip back if you select the wrong card
			cards[idFirst].setAttribute('src', 'images/back.png');
			alert('You cannot select the same card!!');
		} else if (cardsChosen[0] == cardsChosen[1]) {
			alert('You found a match');
			cards[idFirst].setAttribute('src', 'images/white.png');
			cards[idSecond].setAttribute('src', 'images/white.png');
			cards[idFirst].removeEventListener('click', flipCard);
			cards[idSecond].removeEventListener('click', flipCard);
			cardsWon.push(cardsChosen);
		} else {
			cards[idFirst].setAttribute('src', 'images/back.png');
			cards[idSecond].setAttribute('src', 'images/back.png');
			alert('Wrong cards..try again');
		}
		cardsChosen = [];
		cardsChosenId = [];
		result.textContent = 100 * cardsWon.length + " pt";
		if (cardsWon.length == cardArr.length / 2) {
			result.textContent = 'Well done! You found them all!';
		}
	}
})
