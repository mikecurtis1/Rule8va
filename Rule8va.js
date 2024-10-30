const selectRandom = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const figuredBassRules = {
	'0':'"_6"',
	'0u':'"_6;5"',
	'1':'',
	'2':'"_4;3"',
	'3':'"_6"',
	'4d':'"_4;2"',
	'4':'"_6;5"',
	'4r':'',
	'5':'',
	'6':'"_6"',
	'6d':'"_♯6;4;3"',
	'6r':'',
	'7':'"_6"',
	'7u':'"_6;5"',
	'8':'',
	'9':'"_4;3"',
	'10':'"_6"'
};

const pitches = [0,1,2,3,4,5,6,7,8,9,10];

const mapABC = ['B,,','C,','D,','E,','F,','G,','A,','B,','C','D','E'];

const expressABC = function(melody) {
	return melody.map((n) => mapABC[n]).join(' ');
};

const expressSPN = function(melody) {
	return melody.map((n) => mapSPN[n]).join(' ');
};

const repeatedContour = function(melody, next) {
	let repeatedContour = false;
	if ( melody.length >= 2 && ( ( next === melody[melody.length-1] ) || ( next === melody[melody.length-2] ) ) ) {
		repeatedContour = true;
	}
	return repeatedContour;
}

const exceedsRange = function(next) {
	let exceedsRange = false;
	if ( next < 0 || next > 10 ) {
		exceedsRange = true;
	}
	return exceedsRange;
}

const excessiveTendencyTones = function(melody, next) {
	let excessiveTendencyTones = false;
	let tendencyTones = [0,2,4,6,7,9];
	if ( melody.length >= 1 && ( tendencyTones.includes(next) && tendencyTones.includes(melody[melody.length-1]) && tendencyTones.includes(melody[melody.length-2]) ) ) {
	console.log(melody[melody.length-2] + ' ' + melody[melody.length-1] + ' next:' + next);
		excessiveTendencyTones = true;
	}
	return excessiveTendencyTones;
}

const getNextPitch = function(melody) {
	let availablePitches = [];
	let penultimate = null;
	let last = melody[melody.length-1];
	if ( melody.length > 1 ) {
		penultimate = melody[melody.length-2];
	}
	if ( last === 0 ) {
		availablePitches.push(1);
		availablePitches.splice(availablePitches.length, 0, 2,4,6,7);
	} else if ( last === 1 ) {
		//availablePitches.splice(availablePitches.length, 0, 3,5,8); // weighted tonic chord tones
		availablePitches.splice(availablePitches.length, 0, 0,2); // weight moves by single step
		availablePitches.splice(availablePitches.length, 0, 0,2,3,4,5,6,8); // all moves within an octave excluding a seventh
	} else if ( last === 2 ) {
		availablePitches.push(1); // normal resolution of tendency
		availablePitches.splice(availablePitches.length, 0, 0,4,6,7,9); // move to another tendency tone
		if ( penultimate === 1 ) {
			availablePitches.push(3); // allowed move contrary to tendency 
		}
	} else if ( last === 3 ) {
		availablePitches.splice(availablePitches.length, 0, 2,4);
		availablePitches.splice(availablePitches.length, 0, 0,1,2,4,5,6,7,8,10);
	} else if ( last === 4 ) {
		availablePitches.push(3);
		availablePitches.splice(availablePitches.length, 0, 0,2,6,7,9);
		if ( penultimate === 3 ) {
			availablePitches.push(5);
		}
	} else if ( last === 5 ) {
		availablePitches.splice(availablePitches.length, 0, 4,6);
		availablePitches.splice(availablePitches.length, 0, 0,1,2,3,4,6,7,8,9,10);
	} else if ( last === 6 ) {
		availablePitches.push(5);
		availablePitches.splice(availablePitches.length, 0, 2,4,7,9);
		if ( penultimate === 5 ) {
			availablePitches.push(7);
		}
	}	else if ( last === 7 ) {
		availablePitches.push(8);
		availablePitches.splice(availablePitches.length, 0, 0,2,4,6,9);
		if ( penultimate === 8 ) {
			availablePitches.push(6);
		}
	} else if ( last === 8 ) {
		availablePitches.splice(availablePitches.length, 0, 7,9);
		availablePitches.splice(availablePitches.length, 0, 1,3,4,5,6,7,9,10);
	} else if ( last === 9 ) {
		availablePitches.push(8);
		availablePitches.splice(availablePitches.length, 0, 2,4,6,7);
		if ( penultimate === 8 ) {
			availablePitches.push(10);
		}
	} else if ( last === 10 ) {
		availablePitches.splice(availablePitches.length, 0, 9);
		availablePitches.splice(availablePitches.length, 0, 3,5,6,7,8,9);
	} else {
		// availablePitches.push(5);
	}
	let next = selectRandom(availablePitches);
	return next;
}

const cadences = [
	'"_7" G,|"^p.a.c." C,||',
	'"_6;4" G,/ "_7" G,,/|"^p.a.c." C,||',
	'"_6;4" G,|"^h.c." G,,||',
	'"_♯6;5" ^F,|"^h.c." G,||',
	'"^h.c." G,|'
];

const applyFiguredBass = function(melody) {
	melody.map((currElement, index) => {
			if ( currElement === 4 && melody[index+1] === 3 ) {
				melody[index] = figuredBassRules['4d'] + mapABC[currElement];
			} else if ( currElement === 6 && melody[index+1] === 5 ) {
				melody[index] = figuredBassRules['6d'] + mapABC[currElement];
			} else if ( currElement === 7 && melody[index+1] === 1 ) {
				melody[index] = figuredBassRules['7u'] + mapABC[currElement];
			} else if ( currElement === 6 && ( melody[index+1] !== 5 && melody[index+1] !== 7 ) ) {
				melody[index] = figuredBassRules['6r'] + mapABC[currElement];
			} else if ( currElement === 4 && ( melody[index+1] !== 3 && melody[index+1] !== 5 ) ) {
				melody[index] = figuredBassRules['4r'] + mapABC[currElement];
			} else if ( currElement === 0 && melody[index+1] === 1 ) {
				melody[index] = figuredBassRules['0u'] + mapABC[currElement];
			} else {
				melody[index] = figuredBassRules[currElement] + mapABC[currElement];
			};
		}
	);
	let cadence = selectRandom(cadences);
	return '|' + melody.join('|') + '|' + cadence;
}

const buildBass = function() {
	let first = selectRandom(Array(1,8));
	let melody = [];
	melody.push(first);
	for ( let i = 0; i < 8; i++ ) {
		let next = getNextPitch(melody);
		while ( repeatedContour(melody, next) || exceedsRange(next) || excessiveTendencyTones(melody, next) ) {
			next = getNextPitch(melody);
		}
		melody.push(next);
	}
	return melody;
}
