
/// weighted random selection [{weight: 0.2, value: ... }]
function weighted_random_pick(list) {
	// sum the weights
	var M = _(list)
		.pluck('weight')
		.reduce(function sum(acc, val) { return acc + val }, 0);

	// pick a random nr between 0 and M
	var r = Math.random() * M;

	// return value of first element with cumulative weight => M
	var e = _(list)
		.sortBy(_.property('weight'))
		.reduce(function first(acc, val, j) {
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

/// wordlist weighted on state.difficulty
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