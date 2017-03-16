/*
Use of Generator functions in JavaScript
OBJECTIVE: execute two (more) functionalities alternatively with a random delay between each functionality.
Example: PING PONG function -> execute PING and wait for a random delay and then execute PONG and wait for a random delay. And repeat this infinitely.
*/
let element = document.getElementById('pingpong');

function message(who, msg) {
	document.getElementById(who).innerHTML += msg + "<br>"
}

//Returns random ms less than 5000 ms
let getRandomDelay = () => Math.floor(Math.random() * 5000);

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}

//Ping pong output
let output = (text) => {
	console.log(text);
	let div = document.createElement('div');
	div.textContent = text;

	element.appendChild(div);
}

let table = {
  players: ['ping', 'pong'],
  referee: 'PLAY',
  ball: {
    hits:0
  }
}
function *referee(table) {

  var alarm = false;
  // referee sets an alarm timer for the game on
  // his stopwatch (10 seconds)
  setTimeout( function(){ alarm = true; }, 10000 );

  // keep the game going until the stopwatch
  // alarm sounds
  while (!alarm) {
      // let the players keep playing
      yield table;
  }

  // signal to players that the game is over
  table.referee= 'CLOSED';
  console.log('closed');
  // what does the referee say?
  yield "Time's up!";
  message('referee', "Time's up!");
}

function *player(table) {
  var name = table.players.shift();
  var ball = table.ball;
  while (table.referee !== 'CLOSED') {
    //hit the ball
    ball.hits++;
    console.log(`name: ${name}, hits: ${ball.hits}`);
    message(name, ball.hits);
    //artificial delay as ball goes back to other player
    //sleep(5000).then(() => {yield});
    yield sleepFor(1000);
    /*setTimeout(()=> {
      _yield;
      console.log('waiting...');
    }, 500);*/

    //game still going?
    if (table.referee !== 'CLOSED') {
      //ball's now back in other player's court
      yield table;
    }
  }
  console.log(`name: ${name}, hits: ${ball.hits}`);
  message(name, "Game over!");
}

let player1 = player(table);
let player2 = player(table);
let referee2 = referee(table);
/*player1.next();
player2.next();
referee2.next();*/


// run (async) a generator to completion
// Note: simplified approach: no error handling here
function runGenerator(g, v) {
    sleepFor(500);
    var it = g(v), ret;

    // asynchronously iterate over generator
    (function iterate(val){
        ret = it.next( val );

        if (!ret.done) {
            // poor man's "is it a promise?" test
            // immediate value: just send right back in
                // avoid synchronous recursion
                setTimeout( function(){
                    iterate( ret.value );
                }, 0 );

        }
    })();
}

/*function runners(...generators) {

  let execute = (generator) => {
    setTimeout(() => {
      generator.next();
      execute(generator);
    }, 0);
  };

  for (let generator of generators) {
  	//execute(generator);
    runGenerator(generator);
  }
}*/
runGenerator(referee, table);
runGenerator(player, table);
runGenerator(player, table);

//runners(player1, player2, referee2);
//pingpong(generator_pingpong());
