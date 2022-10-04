//IIFE
let a24Repository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

	function loadingMessage() {
		let loadImg = document.createElement('img');
		loadImg.src = 'https://www.sketchup.com/sites/www.sketchup.com/modules/license_wizard_green/images/loading.gif';
		let divItem = document.querySelector('.load');
		divItem.appendChild(loadImg);
	}

	function hidingMessage() {
		document.querySelector('#body').classList.remove('load');
	}

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

	//function which creates buttons for each pokemon including showDetails of pokemon by click
	function addListItem(pokemon) {
		let list = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('name-button');
		listItem.appendChild(button);
		list.appendChild(listItem);
		list.classList.add('list-class');
		button.classList.add('button-class');
		button.addEventListener('click', function(event) {
			showDetails(pokemon);
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
				item.types = details.types;
			})
			.catch(function(e) {
				hidingMessage();
				console.error(e);
			});
	}

	function showDetails(item) {
		a24Repository.loadDetails(item).then(function() {
			console.log(item);
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
