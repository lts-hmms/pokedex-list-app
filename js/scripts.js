let a24Repository = (function() {
	let a24List = [
		{
			name: 'The Witch',
			year: 2015,
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
			year: 2016,
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
	function findMovie() {
		a24List.filter((movie) => movie.name === 'Moonlight');
	}

	return {
		add: add,
		getAll: getAll,
		findMovie: findMovie
	};
})();

/*iterates over a24List and writes down each name and length,
when length is over 100 (minutes), then "Wow, it's long" is added. */

a24Repository.getAll().forEach(function(movie) {
	if (movie.length >= 100) {
		document.write(`<li>
			${movie.name} is ${movie.length} minutes long – Wow, that\'s long!</li>`);
	} else {
		document.write(`<li>${movie.name} is ${movie.length} minutes long.</li>`);
	}
});
