const { parentPort } = require('worker_threads');

parentPort.on('message', function(msg) {
    console.log(`You: ${msg}`);
    if (msg == 'quit') {
        parentPort.postMessage('goodbye');
    } else {
        const message = translate(msg);
        parentPort.postMessage(message);
    }
});

// Source: https://exercism.io/tracks/javascript/exercises/pig-latin/solutions/265ad356f0f64d74bfc67a0c322dd751
const VOWELS = ['a', 'e', 'i', 'o', 'u'];

function translate(message) {
  return message.split(' ').map(translateWord).join(' ');
}

function translateWord(word) {
  for(var i = 0; i < word.length; i++) {
    if(VOWELS.indexOf(word[i]) !== -1) break;
    if(word.slice(i, i+2) === 'qu') i += 1;
  };
  return word.slice(i) + word.slice(0, i) + 'ay';
}
