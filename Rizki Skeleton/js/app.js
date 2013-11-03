var FRISBEEAPP = FRISBEEAPP || {};

(function () {

	'use strict';

	// Verwijder deze objecten =) 
	
	// // Schedule data object
	// FRISBEEAPP.schedule = {
	// 	schedule: [

	// 	]
	// };

	// 		// { date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
	// 		// { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
	// 		// { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
	// 		// { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
	// 		// { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
	// 		// { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
	// 		// { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
	// 		// { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
	// 		// { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
	// 		// { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}

	// //Game data object
	// FRISBEEAPP.game = {
	// 	title:'Pool A - Score: Boomsquad vs. Burning Snow',
	// 	description:'Boomsquad* 15 - 8 Burning Snow',
	// 	game: [
	// 		{ score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
	// 		{ score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
	// 		{ score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
	// 		{ score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
	// 		{ score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
	// 		{ score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
	// 		{ score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
	// 		{ score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
	// 		{ score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
	// 		{ score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
	// 		{ score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
	// 		{ score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
	// 		{ score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
	// 		{ score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
	// 		{ score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
	// 		{ score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
	// 		{ score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
	// 		{ score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
	// 		{ score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
	// 		{ score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
	// 		{ score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
	// 		{ score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
	// 		{ score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
	// 	]
	// };

	// Delete this shit, you makin' it twice =) (see *)
	// //Ranking data object
	// FRISBEEAPP.ranking = {
	// 	rank: [
	// 	]
	// };
	
	// Controller Init
	FRISBEEAPP.controller = {
		init: function () {
			// Initialize router
			//FRISBEEAPP.calculator.init();
			FRISBEEAPP.ajax.init();
			//FRISBEEAPP.router.init();
		}
	};

	// Router
	FRISBEEAPP.router = {
		init: function () {
	  		routie({
			    '/schedule': function() {
			    	FRISBEEAPP.page.render('schedule');
				},
			    '/game': function() {
			    	FRISBEEAPP.page.render('game');
			    },

			    '/ranking': function() {
			    	FRISBEEAPP.page.render('ranking');
			    },
			    '*': function() {
			    	FRISBEEAPP.page.render('schedule');
			    }
			});
						   // Nodig ?
						   //console.log("INITTTT");
		},

		change: function () {
            var route = window.location.hash.slice(2),
                sections = qwery('section'),
                section = qwery('[data-route=' + route + ']')[0];

            // Show active section, hide all other
            // If section is true, remove active class in all sections then add active to section
            if (section) {
            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route
            if (!route) {
            	sections[0].classList.add('active');
            }

		}
	};

	// Pages
	FRISBEEAPP.page = {
		render: function (route) {
			// http://javascriptweblog.wordpress.com/2010/04/19/how-evil-is-eval/
			var data = FRISBEEAPP[route];

			Transparency.render(qwery('[data-route='+route+']')[0], data);
			FRISBEEAPP.router.change();
		}
	}

<<<<<<< HEAD
=======
	// Calculate ± points

	// Don't need this too =)
	// FRISBEEAPP.calculator = {
	// 	init: function() {
	// 		//Create a loop that loops through every array and picks up/calculates the balance of scores:
	// 		for(var i = 0; i < FRISBEEAPP.ranking.rank.length; i++) {
	// 			var balance = this.calculateBalance(FRISBEEAPP.ranking.rank[i]["Pw"], FRISBEEAPP.ranking.rank[i]["Pl"]);
				
	// 			FRISBEEAPP.ranking.rank[i]["Bl"] = balance;
	// 		}
	// 	},

	// 	calculateBalance: function (won, lost) {
	// 		var pointsWon = parseInt(won);
	// 		var pointsLost = parseInt(lost);

	// 		var pointsBalance = pointsWon - pointsLost;

	// 		return pointsBalance;
	// 	}
	// }

>>>>>>> f03c86f2c271b758427df0d3b4e00d4cb35f428c
	FRISBEEAPP.ajax = {
		init: function () {
			this.getObjectsForRanking("https://api.leaguevine.com/v1/pools/?tournament_id=19389&order_by=%5Bname%5D");
			this.getObjectsForSchedule("https://api.leaguevine.com/v1/games/?tournament_id=19389&limit=100&access_token=6c8247a098");
		},

		getObjectsForRanking: function (url) {
			// data is duidelijker als text
			promise.get(url).then(function(error, data, xhr){
				if (error) {
       				alert('Error ' + xhr.status);
        			return;
    			}	

				// var parsedObject = JSON.parse(text);
				data = JSON.parse(data)
				// Zo hoef je geen nieuwe var aan te maken en blijft de var duidelijk =)

				// For elke pool in de api
				for (var i = 0; i < data.objects.length; i++) {
					var poolName = data.objects[i].name;

					FRISBEEAPP.ranking.rank[i] = {
						poolID: "Pool " + poolName
					};

					// (*)
					FRISBEEAPP.ranking.rank[i].teams = [];

					// For elke team binnen een pool
					for (var c = 0; c < data.objects[i].standings.length; c++) {
						//console.log(parsedObject.objects[i].standings[c].team.name);

						FRISBEEAPP.ranking.rank[i].teams[c] = {
						 	team: data.objects[i].standings[c].team.name,
						 	win: data.objects[i].standings[c].wins,
						 	lost: data.objects[i].standings[c].losses,
						 	gs: data.objects[i].standings[c].points_scored,
						 	ga: data.objects[i].standings[c].points_allowed,
						 	balance: data.objects[i].standings[c].plus_minus,
						};
					}	
				}
				FRISBEEAPP.router.init();
			});
		},

		getObjectsForSchedule: function (url) {
			// Zie functie hierboven voor zelfde verandering (data)
			promise.get(url).then(function(error, text, xhr) {
				if (error) {
       				alert('Error ' + xhr.status);
        			return;
    			}	

				var parsedObject = JSON.parse(text);

				for (var i = 0; i < parsedObject.objects.length; i++) {
					FRISBEEAPP.schedule.schedule[i] = {
						poolID: parsedObject.objects[i].pool.name,
						date: parsedObject.objects[i].start_time,
						team1: parsedObject.objects[i].team_1.name,
						team1Score: parsedObject.objects[i].team_1_score,
						team2: parsedObject.objects[i].team_2.name,
						team2Score: parsedObject.objects[i].team_2_score,
						gameID: parsedObject.objects[i].id
					};
				}
				console.log(FRISBEEAPP.schedule.schedule);
				FRISBEEAPP.router.init();
			});
		}
	}


	// If DOM == ready, fire function:
	domready(function () {
		// Initialize FRISBEEAPP
		FRISBEEAPP.controller.init();
	});
	
})();
