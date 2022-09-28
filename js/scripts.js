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
			types: [
				'Drama'
			]
		}
	];
	function add(movie) {
		a24List.push(movie);
	}

	function getAll() {
		return a24List;
	}
})();

/*iterates over a24List and writes down each name and length,
when length is over 100 (minutes), then "Wow, it's long" is added. */

a24List.forEach(function(movie) {
	if (movie.length >= 100) {
		document.write(`<li>
			${movie.name} is ${movie.length} minutes long – Wow, that\'s long!</li>`);
	} else {
		document.write(`<li>${movie.name} is ${movie.length} minutes long.</li>`);
	}
});
