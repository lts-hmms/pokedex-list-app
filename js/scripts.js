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
/*iterates over a24List and writes down each name and length,
when length is over 100 (minutes), then "Wow, it's long" is added. */
for (let i = 0; i < a24List.length; i++) {
	if (a24List[i].length >= 100) {
		document.write(`<li>
			${a24List[i].name} is ${a24List[i].length} minutes long – Wow, that\'s long!</li>`);
	} else {
		document.write(`<li>${a24List[i].name} is ${a24List[i].length} minutes long.</li>`);
	}
}
