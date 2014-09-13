(function () {

'use strict';

var workset = new WorkSet();
	workset.fresh('sleutel', 'key');
	workset.fresh('nigga', 'neger');
	workset.fresh('dude', 'gozert');
	workset.fresh('what', 'wat');
	workset.fresh('schroef', 'draad');
	workset.fresh('baywatch', 'strandwacht');
	workset.fresh('monkey', 'aap');

var game = {}

angular.module('myApp.controllers', [])
	.controller('ListController', ['$scope', '$http', '$location',
		function($scope, $http, $location) {

			$scope.game = game;

			$scope.presets = ['arabic', 'basico-uno']

			$scope.setList = function(preset) {
				return $http
					.get('/word-lists/' + preset + '.csv')
					.success(function(data){
						$scope.listtext = data;
					});
			};

			$scope.newWorkset = function(newList) {
				// simple parser (word,translation\n)+
				// split on lines and then on comma's. trim the result
				var list = newList.split('\n').map(
					function(s){
						if(s && (!/^#/.test(s)))
							return s.split(',').map(
								// trim it
								function(z){
									return z.trim()
								});
					});

				// build new workset
				var workset = new WorkSet();
				list.forEach(function(entry) {
					if(entry)
					workset.fresh(entry[0], entry[1]);
				});

				console.log('created new workset');
				$location.url('/workset')

				game.workset = workset;
			};

			function quickStart() {
				// load the first preset
				$scope.setList(_.head($scope.presets))
					// when done, create a workset
					.then(function(){
						$scope.newWorkset($scope.listtext);
					});
			}
		}
	])
	.controller('WorkSetController', ['$scope', '$location',
		function($scope, $location){
			$scope.game = game;
			$scope.startGame = function() {
				game.question = game.workset.mkQuestion(5);
				game.roundType = 'quiz';
				$location.url('/game');
			}
		}
	])
  .controller('GameController', ['$scope',
		function($scope)
		{
			$scope.game = game;

			$scope.answered = function(answer) {

				console.log('transition', game.question, answer)

				if (game.roundType === 'quiz')
				{
					var w = game.question.word;
					var dfactor = 2;
					// of gewoon met een reduce
					if(answer.is_correct)
					{
						w.streaker.streak('correct');
						w.difficulty /= dfactor;
					}
					else
					{
						w.streaker.streak('incorrect');
						w.difficulty *= dfactor;
					};
				}

				// hide congratulations
				$scope.correct = false;

				// new question
				$scope.game.question = $scope.game.workset.mkQuestion(5)
			}
		}
  ])
  .controller('LogController', ['$scope', function($scope) {
		$scope.game = game;
//		$scope.workset = workset;
  }]);
})();