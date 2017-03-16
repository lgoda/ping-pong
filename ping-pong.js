/*
Use of Generator functions in JavaScript
OBJECTIVE: execute two (more) functionalities alternatively with a random delay between each functionality.
Example: PING PONG function -> execute PING and wait for a random delay and then execute PONG and wait for a random delay. And repeat this infinitely.
*/
let element = document.getElementById('pingpong');

//Returns random ms less than 5000 ms
let getRandomDelay = function() {
	return Math.floor(Math.random() * 5000);
}

//Ping pong output
let output = function(text) {
	console.log(text);
	let div = document.createElement('div');
	div.textContent = text;
	element.appendChild(div);
}

//Generator function which waits for next operation after completing the current one.
function *generator_pingpong() {
	while(true) {
    yield `**** PING ****`;
    yield `**** PONG ****`;
  }
}

function pingpong(iterator) {
	setTimeout(function() {
  	output(iterator.next().value);
    pingpong(iterator);
  }, getRandomDelay());
}

pingpong(generator_pingpong());
