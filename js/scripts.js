//IIFE
let a24Repository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

	function loadingMessage() {
		let load = document.createElement('div');
		load.setAttribute('class', 'load');
		let loadImg = document.createElement('img');
		loadImg.src = 'https://www.sketchup.com/sites/www.sketchup.com/modules/license_wizard_green/images/loading.gif';
		load.appendChild(loadImg);
		body.appendChild(load);
	}

	function hidingMessage() {
		let load = document.querySelector('.load');
		load.remove();
	}

	//modal
	let modalContainer = document.querySelector('#modal-container');

	//show modal func
	function showModal(title, text, URL) {
		modalContainer.innerHTML = '';
		let modal = document.createElement('div');
		modal.classList.add('modal');

		//add modal content
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('modal-close');
		closeButtonElement.innerText = 'x';
		closeButtonElement.addEventListener('click', hideModal);

		let titleElement = document.createElement('h1');
		titleElement.innerText = title;
		let textElement = document.createElement('p');
		textElement.innerText = text;
		imgElement = document.createElement('img');
		imgElement.setAttribute('src', URL);
		imgElement.setAttribute('width', 150);
		imgElement.setAttribute('alt', 'Pokemon picture');

		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(textElement);
		modal.appendChild(imgElement);
		modalContainer.appendChild(modal);

		modalContainer.classList.add('is-visible');
	}
	//hide Modal by keydown 'Escape' and click outside modal
	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});
	modalContainer.addEventListener('click', (e) => {
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});

	// function for adding a pokemon
	function add(pokemon) {
		if (typeof pokemon === 'object' && 'name' in pokemon) {
			pokemonList.push(pokemon);
		} else {
			return 'invalid input';
		}
	}
	// function to show all pokemons
	function getAll() {
		return pokemonList;
	}

	// function to find a specific pokemon
	function findPokemon(userInput) {
		return pokemonList.filter((pokemon) => pokemon.name.toLowerCase() === userInput.toLowerCase());
	}

	function showDetails(item) {
		loadDetails(item).then(function() {
			showModal(
				item.name.toUpperCase(),
				'Height: ' + item.height + ', ' + 'Weight: ' + item.weight + ', ' + 'Ability: ' + item.ability,
				item.imgUrl
			);
		});
	}

	//function which creates buttons for each pokemon including showDetails of pokemon by click
	function addListItem(item) {
		let list = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = item.name;
		listItem.appendChild(button);
		list.appendChild(listItem);
		list.classList.add('list-class');
		button.classList.add('button-class');
		button.addEventListener('click', function() {
			showDetails(item);
		});
	}

	function loadList() {
		loadingMessage();
		return fetch(apiUrl)
			.then(function(response) {
				hidingMessage();
				return response.json();
			})
			.then(function(json) {
				json.results.forEach(function(item) {
					let pokemon = {
						name: item.name,
						detailsUrl: item.url
					};
					add(pokemon);
					console.log(pokemon);
				});
			})
			.catch(function(e) {
				hidingMessage();
				console.error(e);
			});
	}

	function loadDetails(item) {
		loadingMessage();
		let url = item.detailsUrl;
		return fetch(url)
			.then(function(response) {
				hidingMessage();
				return response.json();
			})
			.then(function(details) {
				item.imgUrl = details.sprites.front_default;
				item.height = details.height;
				item.weight = details.weight;
				item.ability = details.abilities[0].ability.name;
			})
			.catch(function(e) {
				hidingMessage();
				console.error(e);
			});
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList
	};
})();

a24Repository.loadList().then(function() {
	// Now the data is loaded!
	a24Repository.getAll().forEach(function(pokemon) {
		a24Repository.addListItem(pokemon);
	});
});
