const init = document.querySelector('div#intro button');
const intro = document.querySelector('#intro');
const sim = document.querySelector('#sim');
const pushtray = document.querySelector('#pushtray');
const inputForest = document.querySelector('#inputForest');
let pinnedArray = [];


// length 68 emoji characters
const emojis = [
..."🦊🌱 🌿🌳🐞🏵🦊🐖🐝🍄   🦋🐒🐍🐊🌴🐞🌾🌱🦉 🦎🌿🐝🌳🌷🦊 🐐🦉🐍🐊🌾🐝🐞🌲🐓 🐈 🦎🌵🦋 🐐 🐒🐝💐 🦎 🦉🐊🌻 🌲🏵🐝🦋🌾  🌺🐶"
];
// length 18 including spaces
const forest = [..." 🌵💐🌲🌻🌴 🌲🏵🌾️🌱🌹 🌿 🌺🌳🌷"];








/*------------------ Helper Functions ------------------*/

/*
 * a function takes one argument in the form of an array of emoji strings 
 * to output the Simpson's Index biodiversity estimate for the forest at hand
 */
/* eslint-disable */
function simpsonsIndex(forest){
	const index = 1 - Object.entries([...forest.join("")].reduce(
		(counts, emoji) => ({...counts, [emoji]: (counts[emoji] || 0) + 1}),
		{})).reduce(([top, bottom], [species, count]) => [top + (count * (count - 1)), bottom + count], [0, 0])
		.reduce((sumLilN,bigN) => sumLilN / (bigN * (bigN - 1)));
	return index.toFixed(2);
}
/* eslint-enable */


/* 
 * a function that generates a random row of forest,
 * return a string of 8 emojis
 */
function generateRandomRow(){
	let emoji = [8];
	for(let i = 0; i < 8; i+=2){
		emoji[i] = (emojis[Math.floor(Math.random() * 68) + 1]);
		emoji[i+1] = (forest[Math.floor(Math.random() * 18) + 1]);
	}
	emoji = emoji.join(' ');
	return emoji;
}
/*
 * a function that generates an 8x8 forest,
 * the function should output an array of 8 strings, where each string is 8 emojis (or spaces) long.
 */
function generateRandomForest(){
	const randomForest=[8];
	for(let i = 0; i < 8; i++){
		randomForest[i] = generateRandomRow();	
	}
	return randomForest;
}

/*
 * a function that takes the input emojis by user and generates an 8x8 forest,
 * return an array of 8 emoji strings
 */
function generateInputForest(string){
	const inputForest = string.match(/.{1,14}/g);
	return inputForest;
}


function checkWarning(index){
	if(index < 0.70){
		pushtray.innerHTML = `<div class="warning">Warning: Simpson's index dropped to ${index}!</div>`;
	}
	else{
		pushtray.innerHTML ='';
	}
}


/*
 * a function that returns the html for the generated forest
 *
 */
function generate(string){
	let forest;
	if(string !== undefined){
		forest = generateInputForest(string);
	}
	else{
		forest = generateRandomForest();
	}

	const index = simpsonsIndex(forest);
	// check the index if it's below 0.70
	checkWarning(index);
	sim.innerHTML = `<h3> The current Simpson's Index is: ${index}</h3>`;
	// if not the first generate, check for pinned rows

	const pre = document.createElement('pre');
	for(let i = 0; i < 8; i++){
		const emojiRow = document.createElement('p');
		emojiRow.className = "emoji";
		if(pinnedArray[i]){
			emojiRow.textContent = pinnedArray[i];
			emojiRow.classList.add('pinned');
		}
		else{
			emojiRow.textContent = forest[i];
		}
		emojiRow.addEventListener('click', function(){
			emojiRow.classList.toggle('pinned');
			if(emojiRow.classList.contains('pinned')){
				pinnedArray[i] = emojiRow.textContent;
			}
			else{
				pinnedArray[i] = '';
			}
		});
		pre.appendChild(emojiRow);
	}
	sim.appendChild(pre);
	const button = document.createElement('button');
	button.textContent = 'generate';
	button.addEventListener('click', function(){
		generate();
	});
	const restart = document.createElement('button');
	restart.textContent = 'restart';
	restart.addEventListener('click', function(){
		intro.classList.remove('hidden');
		sim.classList.add('hidden');
		sim.innerHTML='';
		pushtray.innerHTML ='';
		pinnedArray = [];
	});
	sim.appendChild(button);
	sim.appendChild(restart);
}




/*----------------- initial setup ------------------*/
// first generate
init.addEventListener('click', function(){
		intro.classList.add('hidden');
		sim.classList.remove('hidden');
		if(inputForest.value !== ''){
			generate(inputForest.value);
		}
		else{
			generate();
		}
});