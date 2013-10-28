var FRISBEEAPP = FRISBEEAPP || {};

(function () {

	'use strict';

	// Verwijder deze objecten =) 
	
	// Schedule data object
	FRISBEEAPP.schedule = {
		schedule: [

		]
	};

	// //Ranking data object
	FRISBEEAPP.ranking = {
		rank: [
		]
	};
	
	// Controller Init
	FRISBEEAPP.controller = {
		init: function () {
			// Initialize router
			FRISBEEAPP.ajax.init();
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
				FRISBEEAPP.router.init();
			});
		},

		getObjectsForSchedule: function (url) {
			// Zie functie hierboven voor zelfde verandering (data)
			promise.get(url).then(function(error, data, xhr) {
				if (error) {
       				alert('Error ' + xhr.status);
        			return;
    			}	

				data = JSON.parse(data);

				for (var i = 0; i < data.objects.length; i++) {
					FRISBEEAPP.schedule.schedule[i] = {
						poolID: data.objects[i].pool.name,
						date: data.objects[i].start_time,
						team1: data.objects[i].team_1.name,
						team1Score: data.objects[i].team_1_score,
						team2: data.objects[i].team_2.name,
						team2Score: data.objects[i].team_2_score,
						gameID: data.objects[i].id
					};
				}

				FRISBEEAPP.schedule.schedule.sort(function(a,b) {
  					return parseInt(a.poolID,10) - parseInt(b.poolID,10);
				});
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
