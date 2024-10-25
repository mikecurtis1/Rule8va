function load() {
	let progression = expressABC(buildBass());
	let abc = '';
	abc += 'M: 4/4' + "\n";
	abc += 'L:1/1' + "\n";
	abc += 'K:C' + "\n";
	abc += 'V: 1 clef=bass' + "\n";
	abc += progression + "\n";
	ABCJS.renderAbc("paper", abc);
	divABC.innerHTML = '';
	divABC.insertAdjacentHTML("beforeend", abc);
};
const buildButton = document.getElementById('build');
const divABC = document.getElementById('abc');
buildButton.addEventListener('click', load);