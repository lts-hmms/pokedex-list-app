//IIFE
let a24Repository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=42';

	// function for adding an item
	function add(item) {
		if (typeof item === 'object' && 'name' in item) {
			pokemonList.push(item);
		} else {
			return 'invalid input';
		}
	}

	// function to show all items
	function getAll() {
		return pokemonList;
	}

	// function to find a specific pokemon
	function findPokemon(userInput) {
		return pokemonList.filter((item) => item.name.toLowerCase() === userInput.toLowerCase());
	}
	//function for creating buttons for each item including showDetails of item by click

	function addListItem(item) {
		loadDetails(item).then(function() {
			let list = document.querySelector('.pokemon-list');
			let listItem = document.createElement('li');
			listItem.classList.add('liItem');
			let button = document.createElement('button');
			button.innerText = item.name;
			button.classList.add('button', 'btn', 'btn-outline-warning');
			button.setAttribute('data-toggle', 'modal');
			button.setAttribute('data-target', '#pokeModal');
			let buttonImage = document.createElement('img');
			buttonImage.setAttribute('src', item.imgUrl);
			button.appendChild(buttonImage);
			listItem.appendChild(button);
			list.appendChild(listItem);
			button.addEventListener('click', function() {
				showDetails(item);
			});
		});
	}

	function showDetails(item) {
		loadDetails(item).then(function() {
			console.log(item);
			showModal(item);
		});
	}

	//fetch data from api
	let loadList = () => {
		// loadingMessage();
		return fetch(apiUrl)
			.then((response) => {
				// hidingMessage();
				if (!response.ok) throw new Error(`Status Code Error: ${response.status}`);
				return response.json();
			})
			.then((data) => {
				data.results.forEach((item) => {
					let pokemon = {
						name: item.name.toUpperCase(),
						detailsUrl: item.url
					};
					add(pokemon);
					console.log(pokemon); //just for debbuging
				});
			})
			.catch((e) => {
				// hidingMessage();
				console.error(e);
			});
	};

	//function for fetching the details from detailsUrl
	let loadDetails = (pokemon) => {
		// loadingMessage();
		let nextUrl = pokemon.detailsUrl;
		return fetch(nextUrl)
			.then((response) => {
				// hidingMessage();
				if (!response.ok) throw new Error(`Status Code Error: ${response.status}`);
				return response.json();
			})
			.then((data) => {
				pokemon.id = data.id;
				pokemon.imgUrl = data.sprites.front_default;
				pokemon.height = data.height / 10;
				pokemon.weight = data.weight / 10;
				pokemon.abilities = data.abilities.map((ability) => ability.ability.name).join(', ');
				pokemon.types = data.types.map((type) => type.type.name).join(', ');
			})
			.catch((e) => {
				//hidingMessage();
				console.error(e);
			});
	};

	function showModal(item) {
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');
		//let modalHeader = $('.modal-header');

		//clear content of the modal
		modalTitle.empty();
		modalBody.empty();

		//creating elements for modal content
		let idElement = $('<h5>' + '#' + item.id + '</h5>');
		let nameElement = $('<h3>' + item.name.toUpperCase() + '</h3>');
		let imgElement = $('<img class="modal-img" style="width:50%">');
		imgElement.attr('src', item.imgUrl);
		let heightElement = $('<p>' + 'Height: ' + item.height + ' m' + '</p>');
		let weightElement = $('<p>' + 'Weight: ' + item.weight + ' kg' + '</p>');
		let abilitiesElement = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

		modalTitle.append(idElement);
		modalTitle.append(nameElement);
		modalBody.append(imgElement);
		modalBody.append(heightElement);
		modalBody.append(weightElement);
		modalBody.append(abilitiesElement);
	}
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showModal: showModal
	};
})();

a24Repository.loadList().then(function() {
	// Now the data is loaded!
	a24Repository.getAll().forEach(function(pokemon) {
		a24Repository.addListItem(pokemon);
	});
});
