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
	'4r':'IV',
	'5':'V',
	'6':'IV6',
	'6d':'V64/V',
	'6r':'vi',
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

const degreeMap = {
	'1':'①',
	'2':'②',
	'3':'③',
	'4':'④',
	'5':'⑤',
	'6':'⑥',
	'7':'⑦',
	'8':'⑧'
};

const SPN = {
	'1':'C3',
	'2':'D3',
	'3':'E3',
	'4':'F3',
	'5':'G3',
	'6':'A3',
	'7':'B3',
	'8':'C4'
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

const expressSPN = function(measures) {
	return measures.map((element) => SPN[element]);
}

const expressDegrees = function(measures) {
	return measures.map((element) => degreeMap[element]);
}

const expressABC = function(measures) {
	measures.map((currElement, index) => {
			if ( currElement === '4' && measures[index+1] === '3' ) {
				measures[index] = '"_' + RNA['4d'] + '"' + letterMap[currElement];
			} else if ( currElement === '6' && measures[index+1] === '5' ) {
				measures[index] = '"_' + RNA['6d'] + '"' + letterMap[currElement];
			} else if ( currElement === '7' && measures[index+1] === '1' ) {
				measures[index] = '"_' + RNA['7u'] + '"' + letterMap[currElement];
			} else if ( currElement === '6' && ( measures[index+1] !== '5' && measures[index+1] !== '7' ) ) {
				measures[index] = '"_' + RNA['6r'] + '"' + letterMap[currElement];
			} else if ( currElement === '4' && ( measures[index+1] !== '3' && measures[index+1] !== '5' ) ) {
				measures[index] = '"_' + RNA['4r'] + '"' + letterMap[currElement];
			} else {
				measures[index] = '"_' + RNA[currElement] + '"' + letterMap[currElement];
			};
		}
	);
	let cadence = selectRandom(cadences);
	return '|' + measures.join('|') + '|' + cadence;
}

const buildBass = function() {
	let measures = ['1'];
	for (let i = 0; i < 8; i++) {
		let next = selectRandom(bass);
		if ( measures.length > 1 ) {
			penultimate = measures[measures.length-2];
		} else {
			penultimate = 0;
		}
		let last = measures[measures.length-1];
		let size = 5 // maximum size of the bass movement in steps, this number +1 is the interval size
		while ( ( Math.abs(Number(next) - Number(last)) > size ) || ( next === last ) || ( next === penultimate ) || ( isTritone(next, last) === true ) ) {
			next = selectRandom(bass);
		};
		measures.push(next);
	};
	return measures;
}
