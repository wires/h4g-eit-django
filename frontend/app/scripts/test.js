W = require('./words.js')
w = new W.WorkSet()
w.fresh('sleutel', 'key');
w.fresh('nigga', 'neger');
w.fresh('dude', 'gozert');
w.fresh('what', 'wat');
w.fresh('schroef', 'draad');
w.fresh('baywatch', 'strandwacht');
w.fresh('monkey', 'aap');

console.log(w.mkQuestion(5))
