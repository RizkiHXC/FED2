var FRISBEEAPP = FRISBEEAPP || {};

(function () {

	'use strict';
	
	// Schedule data object
	FRISBEEAPP.schedule = {
		schedule: [
		]
	};

	FRISBEEAPP.game = {
		game: [
		]
	};

	// //Ranking data object
	FRISBEEAPP.ranking = {
		rank: [
		]
	};

	FRISBEEAPP.utilities = {
		spinner: {
			spinnerObject: document.getElementById("spinner"), 
			show: function () {
				this.spinnerObject.className = "spin";
			},
			hide: function () {
				this.spinnerObject.className ="stopspin";
			}
		}
	};
	
	// Controller Init
	FRISBEEAPP.controller = {
		init: function () {
			// Initialize router
			FRISBEEAPP.router.init();
		}
	};

	// Router
	FRISBEEAPP.router = {
		init: function () {
	  		routie({
			    '/schedule': function() {
			    	FRISBEEAPP.ajax.getObjectsForSchedule();
				},
			    '/game/:gameID': function(gameID) {
			    	FRISBEEAPP.ajax.getObjectsForGame(gameID);
<<<<<<< HEAD
=======
			    	FRISBEEAPP.page.render('game');
>>>>>>> 30a405413e037961b305a077fa6da240268b1524
			    },

			    '/ranking': function() {
			    	FRISBEEAPP.ajax.getObjectsForRanking();
			    },
			    '*': function() {
			    	FRISBEEAPP.ajax.getObjectsForSchedule();
			    	FRISBEEAPP.page.render('schedule');
			    }
			});
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
			var data = FRISBEEAPP[route];

			var directives = {
				schedule: {
					link: {
						href: function(params) {
							return "#/game/" + this.gameID;
						}
					}
<<<<<<< HEAD
				},

				game: {
					team1Score: {
						value: function (params) {
							return this.team1Score;
						}
					},
					team2Score: {
						value: function (params) {
							return this.team2Score;
						}
					}
				}
			}
=======
				}
			}

>>>>>>> 30a405413e037961b305a077fa6da240268b1524
			Transparency.render(qwery('[data-route='+route+']')[0], data, directives);
			FRISBEEAPP.router.change();
			
		}
	}

	FRISBEEAPP.ajax = {
		getObjectsForRanking: function () {
			var feed = "https://api.leaguevine.com/v1/pools/?tournament_id=19389&order_by=%5Bname%5D";

			FRISBEEAPP.utilities.spinner.show();
			// data is duidelijker als text
			promise.get(feed).then(function(error, data, xhr){
				if (error) {
       				alert('Error ' + xhr.status);
        			return;
    			}	
				
				data = JSON.parse(data)
				// Zo hoef je geen nieuwe var aan te maken en blijft de var duidelijk =)

				// For elke pool in de api
				for (var i = 0; i < data.objects.length; i++) {
					var poolName = data.objects[i].name;

					FRISBEEAPP.ranking.rank[i] = {
						poolID: "Pool " + poolName
					};

					FRISBEEAPP.ranking.rank[i].teams = [];

					// For elke team binnen een pool
					for (var c = 0; c < data.objects[i].standings.length; c++) {
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
				FRISBEEAPP.utilities.spinner.hide();
				FRISBEEAPP.page.render('ranking');
			});
		},

		getObjectsForSchedule: function () {
			var feed = "https://api.leaguevine.com/v1/games/?tournament_id=19389&limit=100&access_token=6c8247a098";

			FRISBEEAPP.utilities.spinner.show();
			document.querySelector('article > section:nth-of-type(1) > section').setAttribute("style", "display:none");
			// Zie functie hierboven voor zelfde verandering (data)
			promise.get(feed).then(function(error, data, xhr) {
				if (error) {
       				alert('Error ' + xhr.status);
        			return;
    			}	

				data = JSON.parse(data);

				for (var i = 0; i < data.objects.length; i++) {
					FRISBEEAPP.schedule.schedule[i] = {
						poolID: "Pool " + data.objects[i].pool.name,
						date: data.objects[i].start_time,
						team1: data.objects[i].team_1.name,
						team1Score: data.objects[i].team_1_score,
						team2: data.objects[i].team_2.name,
						team2Score: data.objects[i].team_2_score,
						gameID: data.objects[i].id
					};

					if (i < data.objects.length - 1) {

						if (data.objects[i].pool.name  == data.objects[i + 1].pool.name) {
							FRISBEEAPP.schedule.schedule[i].poolID = "";
						}
					}
				}
				FRISBEEAPP.utilities.spinner.hide();
				document.querySelector('article > section:nth-of-type(1) > section').setAttribute("style", "display:block");
				FRISBEEAPP.schedule.schedule.reverse();
				FRISBEEAPP.page.render('schedule');
			});
		},

		getObjectsForGame: function (gameID) {
<<<<<<< HEAD
			FRISBEEAPP.utilities.spinner.show();
=======
>>>>>>> 30a405413e037961b305a077fa6da240268b1524
			var feed = "https://api.leaguevine.com/v1/games/" + gameID + "/";

			promise.get(feed).then(function(error, data, xhr) {
				if (error) {
       				alert('Error ' + xhr.status);
        			return;
    			}

    			data = JSON.parse(data);	

    			FRISBEEAPP.game.game = {
    				team1Score: data.team_1_score,
    				team2Score: data.team_2_score
    			}
<<<<<<< HEAD
    			FRISBEEAPP.page.render('game');
    			FRISBEEAPP.utilities.spinner.hide();
=======
    			console.log(FRISBEEAPP.game.game);
>>>>>>> 30a405413e037961b305a077fa6da240268b1524
    		});
		}
	}


	// If DOM == ready, fire function:
	domready(function () {
		// Initialize FRISBEEAPP
		FRISBEEAPP.controller.init();
	});
	
})();
