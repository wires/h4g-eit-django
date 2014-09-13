
var streak_lims = {
	// once 5 correct answers are given you are considered to know the word
	correct: 5,

	// after three wrong answers, you are considered to no longer know the word
	incorrect: 3
}

Streaker = function(initial) {
	this.state = 'fresh';
	this.direction = this.state;
	this.length = 0;
}

Streaker.prototype.streak = function(direction)
{
	// reset count when we change direction
	if(this.direction !== direction)
		this.length = 0;

	// anyway, we are now counting in this direction
	this.direction = direction;
	this.length += 1;

	// streak reached, update state
	if (this.length === streak_lims[direction])
		this.state = direction;

	return null;
}



Word = function(word, translation) {
	this.streaker = new Streaker()
	this.difficulty = 1
	this.interval = 1
	this.word = word;
	this.translation = translation;
}

// compare two words, ignoring state
Word.prototype.sameWord = function (other) {
	return (this.word === other.word) &&
		(this.translation === other.translation);
}

// when should a word be included in the set of active words
Word.prototype.isActive = function () {
	return this.streaker.state !== 'know';
}

WorkSet = function() {
	this.words = [];
}

WorkSet.prototype.fresh = function (word, translation) {
	this.words.push(new Word(word, translation));
}

WorkSet.prototype.active = function () {
	return _.filter(this.words, function(word){
		return word.isActive();
	})
}

/// size of active words, pass true to include inactive words
WorkSet.prototype.size = function (inActive) {

	if(inActive)
		return _.size(this.words);

	// todo, make sublinear in the size of the nr of words quizzed
	return _(this.words).reduce(function(acc, val){
		return acc + (val.isActive() ? 1 : 0)
	},0);
}

/// weighted random selection [{weight: 0.2, value: ... }]
function weighted_random_pick(list) {
	// sum the weights
	var M = _(list)
		.pluck('weight')
		.reduce(function sum(acc, val) { return acc + val }, 0);

	// pick a random nr between 0 and M
	var r = Math.random() * M;

	// return value of first element with cumulative weight => M
	var e = _.reduce(list,
		function first(acc, val, j) {
			// we found the element, dont do anything
			if (typeof acc !== 'number')
				return acc;

			// keep accumulating weight
			if(acc < val.weight)
				return acc + val.weight

			// found it!
			return val;
		}, 0);

	if(typeof e === 'number')
		e = _.last(e);

	return e.value;
}

/// wordlist weighted on difficulty
function weights_difficulty(word_list) {
	return _.map(word_list, function(word){
		return {
			weight: word.difficulty,
			value: word
		};
	});
}

function random_sample(list, excludes, size) {
	return _(list)
		// keep all but excluded
		.reject(function whenExcluded(entry) {
			if(!excludes)
				return false;
			return _(excludes)
				.map(function(exclude) {
					return entry.sameWord(exclude);
				})
				.any();
		})
		// pick 'size' at random
		.sample(size)
		.value();
}

/// build list of 'size' possible answers,
/// take care not in include 'question_word' twice
function mkContext (word_list, question_word, size) {
	var correct = [{
			is_correct: true,
			answer: question_word
		}];

	if(size < 2)
		return correct;

	// randomly pick size-1 words from the word_list
	return _(random_sample(word_list, [question_word], size - 1))
		// those are all incorrect answers
		.map(function (word) {
			return {
				is_correct: false,
				answer: word
			};
		})
		// now add the correct answer,
		.concat(correct)
		// reshuffle,
		.shuffle()
		// that's your context for you
		.value();
}

WorkSet.prototype.mkQuestion = function (size) {
	var word = weighted_random_pick( weights_difficulty(this.words) );
	var context = mkContext(this.words, word, size);

	return {
		word: word,
		possible_answers: context
	};
}

// update the wordset to reflect a given answer
WorkSet.prototype.update = function (question, answer)
{
	// if correct, update the word

}