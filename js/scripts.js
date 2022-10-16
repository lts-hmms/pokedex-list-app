//IIFE
let a24Repository = (function() {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=42';
	

	//create and append loading spinner
	function loadingMessage() {
	let body = document.querySelector('body');
	let load = document.createElement('div');
	load.setAttribute('class', 'load');
	let loadImg = document.createElement('img');
	loadImg.src = 'https://www.sketchup.com/sites/www.sketchup.com/modules/license_wizard_green/images/loading.gif';
	load.appendChild(loadImg);
	body.appendChild(load);
	}

	//hide loading spinner
	function hidingMessage() {
	let load = document.querySelector('.load');
	load.remove();
	}

	// add item to array
	function add(item) {
		if (typeof item === 'object' && 'name' in item) {
			pokemonList.push(item);
		} else {
			return 'invalid input';
		}
	}

	// get array of items
	function getAll() {
		return pokemonList;
	}

	//create and buttons for each item
	function addListItem(item) {
		loadDetails(item).then(function() {
			let list = document.querySelector('.pokemon-list');
			let listItem = document.createElement('li');
			listItem.classList.add('liItem');
			let button = document.createElement('button');
			button.innerText = item.name.toUpperCase();
			button.classList.add('myButton', 'btn', 'btn-outline-warning');
			button.setAttribute('data-toggle', 'modal');
			button.setAttribute('data-target', '#pokeModal');
			button.setAttribute('id',item.name);
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

	//show details by click on button
	function showDetails(item) {
		loadDetails(item).then(function() {
			console.log(item);
			showModal(item);
		});
	}

	//fetch data from api
	let loadList = () => {
		loadingMessage();
		return fetch(apiUrl)
			.then((response) => {
				hidingMessage();
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
				hidingMessage();
				console.error(e);
			});
	};

	//fetch details from detailsUrl
	let loadDetails = (pokemon) => {
		let nextUrl = pokemon.detailsUrl;
		
		return fetch(nextUrl)
			.then((response) => {
				if (!response.ok) throw new Error(`Status Code Error: ${response.status}`);
				return response.json();
			})
			.then((data) => {
				pokemon.name= data.name;
				pokemon.id = data.id;
				pokemon.imgUrl = data.sprites.front_default;
				pokemon.height = data.height / 10;
				pokemon.weight = data.weight / 10;
				pokemon.abilities = data.abilities.map((ability) => ability.ability.name).join(', ');
				pokemon.types = data.types.map((type) => type.type.name).join(', ');
			})
			.catch((e) => {
				console.error(e);
			});
	};

		//create modal for each button
	function showModal(item) {
		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');
		//let modalHeader = $('.modal-header');

		//clear content of modal
		modalTitle.empty();
		modalBody.empty();

		//create elements for modal content
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

	//search list by item
	let searchValue = document.getElementById('input');
	searchValue.addEventListener('keyup', function(e) {
		let searchString = e.target.value.toLowerCase();
		
		let hiddenItems = pokemonList.filter((item)=>{
			if(!item.name.includes(searchString)){
				return item
			}
		})
		let shownItems = pokemonList.filter((item) =>{
			if(item.name.includes(searchString)){
				return item
			}
		})
	
	hiddenItems.map((item) =>{
		document.getElementById(item.name).classList.add('hidden');
	})
	shownItems.map((item)=>{
		document.getElementById(item.name).classList.remove('hidden');
	})
})

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
