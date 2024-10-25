const selectRandom = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

const bass = ['1','2','3','4','5','6','7','8'];

const RNA = {
	'1':'I',
	'2':'V43',
	'3':'I6',
	'4d':'V42',
	'4':'ii65',
	'5':'V',
	'6':'IV6',
	'6d':'V64/V',
	'7':'V6',
	'7u':'V65',
	'8':'I'
};

const letterMap = {
	'1':'C,',
	'2':'D,',
	'3':'E,',
	'4':'F,',
	'5':'G,',
	'6':'A,',
	'7':'B,',
	'8':'C'
};

const cadences = [
	'"_V7" G,|"^p.a.c.""_I" C,||',
	'"_I64" G,/ "_V7" G,,/|"^p.a.c.""_I" C,||',
	'"_I64" G,|"^h.c.""_V" G,,||',
	'"_V65/V" ^F,|"^h.c.""_V" G,||',
	'"^h.c.""_V" G,|'
];

const isTritone = function(n1, n2) {
	let check = false;
	if ( n1 === '4' && n2 === '7' ) {
		check = true;
	};
	if ( n1 === '7' && n2 === '4' ) {
		check = true;
	};
	return check;
};

const expressABC = function(measures) {
	measures.map((currElement, index) => {
			if ( currElement === '4' && measures[index+1] === '3' ) {
				//console.log('index:' + index + ', currElement:' + currElement + ', RNA:' + RNA['4d']);
				//console.log('4 descending to 3')
				measures[index] = '"_' + RNA['4d'] + '"' + letterMap[currElement];
			} else if ( currElement === '6' && measures[index+1] === '5' ) {
				//console.log('index:' + index + ', currElement:' + currElement + ', RNA:' + RNA['6d']);
				//console.log('6 descending to 5')
				measures[index] = '"_' + RNA['6d'] + '"' + letterMap[currElement];
			} else if ( currElement === '7' && measures[index+1] === '1' ) {
				//console.log('index:' + index + ', currElement:' + currElement + ', RNA:' + RNA['7u']);
				//console.log('4 descending to 3')
				measures[index] = '"_' + RNA['7u'] + '"' + letterMap[currElement];
			} else {
				//console.log('index:' + index + ', currElement:' + currElement + ', RNA:' + RNA[currElement]);
				measures[index] = '"_' + RNA[currElement] + '"' + letterMap[currElement];
			};
		}
	);
	let cadence = selectRandom(cadences);
	return '|' + measures.join('|') + '|' + cadence;
}

const buildProgression = function() {
	let measures = ['1'];
	for (let i = 0; i < 8; i++) {
		let next = selectRandom(bass);
		let prev = measures[measures.length-1];
		let size = 3 // maximum size of the bass movement in steps, this number +1 is the interval size
		while ( ( Math.abs(Number(next) - Number(prev)) > size ) || ( next === prev ) || ( isTritone(next, prev) === true ) ) {
			next = selectRandom(bass);
		};
		measures.push(next);
	};
	return measures;
}
