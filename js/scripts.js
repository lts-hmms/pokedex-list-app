//IIFE
let a24Repository = (function() {
	let a24List = [
		{
			name: 'The Witch',
			year: '2015',
			length: 92,
			genre: [
				'Drama',
				'Fantasy',
				'Horror'
			]
		},
		{
			name: 'Lady Bird',
			year: '2017',
			length: 94,
			genre: [
				'Comedy',
				'Drama'
			]
		},
		{
			name: 'Moonlight',
			year: '2016',
			length: 111,
			genre: [
				'Drama'
			]
		}
	];
	// function for adding a movie
	function add(movie) {
		if (typeof movie === 'object' && 'name' in movie && 'year' in movie && 'length' in movie && 'genre' in movie) {
			a24List.push(movie);
		} else {
			return 'invalid input';
		}
	}
	// function to show all movies
	function getAll() {
		return a24List;
	}

	// function to find a specific movie
	function findMovie(userInput) {
		return movieList.filter((movie) => movie.name.toLowerCase() === userInput.toLowerCase());
	}

	//function which creates buttons for each movie including showDetails of movie by click
	function addListItem(movie) {
		let list = document.querySelector('.movie-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = movie.name;
		button.classList.add('name-button');
		listItem.appendChild(button);
		list.appendChild(listItem);
		list.classList.add('list-class');
		button.classList.add('button-class');
		button.addEventListener('click', function() {
			showDetails(movie);
		});
	}

	function showDetails(movie) {
		console.log(movie);
	}

	return {
		add: add,
		getAll: getAll,
		findMovie: findMovie,
		addListItem: addListItem,
		showDetails: showDetails
	};
})();

a24Repository.getAll().forEach(function(movie) {
	a24Repository.addListItem(movie);
});
