//IIFE
let a24Repository = (function() {
	let movieList = [
		{
			name: 'The Witch',
			year: '2015',
			length: 92,
			genre: [
				'Drama',
				'Fantasy',
				'Horror'
			],
			URL: 'https://de.web.img3.acsta.net/c_310_420/pictures/16/03/21/12/29/404212.jpg'
		},
		{
			name: 'Lady Bird',
			year: '2017',
			length: 94,
			genre: [
				'Comedy',
				'Drama'
			],
			URL: 'https://i0.wp.com/teaser-trailer.com/wp-content/uploads/Lady-Bird-New-Film-poster.jpg'
		},
		{
			name: 'Moonlight',
			year: '2016',
			length: 111,
			genre: [
				'Drama'
			],
			URL: 'https://www.cineworld.co.uk/xmedia-cw/repo/feats/posters/HO00004174.jpg'
		}
	];
	// function for adding a movie
	function add(movie) {
		if (typeof movie === 'object' && 'name' in movie && 'year' in movie && 'length' in movie && 'genre' in movie) {
			movieList.push(movie);
		} else {
			return 'invalid input';
		}
	}
	// function to show all movies
	function getAll() {
		return movieList;
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

	// image function
	function images(image) {
		let img = document.createElement('img');
		img.src = image;
		let listItem = document.querySelector('.list-class');
		listItem.appendChild(img);
	}

	return {
		add: add,
		getAll: getAll,
		findMovie: findMovie,
		addListItem: addListItem,
		showDetails: showDetails,
		images: images
	};
})();

a24Repository.getAll().forEach(function(movie) {
	a24Repository.addListItem(movie);
	a24Repository.images(movie.URL);
});
