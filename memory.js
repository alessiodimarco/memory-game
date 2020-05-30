document.addEventListener('DOMContentLoaded', () => {
	//My card name and img array for 6 cards
	var cardArr = [{
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

	//array random sort
	cardArr.sort(order => 0.5 - Math.random());

	var grid = document.getElementById('grid');
	var result = document.getElementById('result');
	var cardsChosen = [];
	var cardsChosenId = [];
	const cardsWon = [];

	/*Foreach statement used to create cards and assign the click event listener*/
	cardArr.forEach((item, i) => {
		var card = document.createElement('img');
		card.setAttribute('src', 'images/back.png');
		card.setAttribute('id-card', i);
		grid.appendChild(card);
		card.addEventListener('click', flipCard);
	});

	//flip your card
	function flipCard() {
		var cardId = this.getAttribute('id-card');
		cardsChosen.push(cardArr[cardId].name);
		cardsChosenId.push(cardId);
		this.setAttribute('src', cardArr[cardId].img);
		if (cardsChosen.length == 2) {
			setTimeout(checkForMatch, 500);
		}
	}

	//check for matches
	function checkForMatch() {
		var cards = document.querySelectorAll('img');
		const idFirst = cardsChosenId[0];
		const idSecond = cardsChosenId[1];
		//if player click same card two times..
		if (idFirst == idSecond) {
			//Flip back the selected wrong cards
			cards[idFirst].setAttribute('src', 'images/back.png');
			alert('You cannot select the same card!!')
		} else if (cardsChosen[0] == cardsChosen[1]) {
			alert('You found a match')
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