var FRISBEEAPP = FRISBEEAPP || {};

(function () {

	'use strict';
	
	//Schedule data object
	FRISBEEAPP.schedule = {
		schedule: [
		]
	};
	//Game data object
	FRISBEEAPP.game = {
		game: [
		]
	};

	//Ranking data object
	FRISBEEAPP.ranking = {
		rank: [
		]
	};

	//Some utilities
	FRISBEEAPP.utilities = {
		spinner: {
			spinnerObject: document.getElementById("spinner"), 
			show: function () {
				this.spinnerObject.className = "spin";
			},
			hide: function () {
				this.spinnerObject.className ="stopspin";
			}
		},

		error: {
			alert: function (reason, message) {
				alert(reason + " " + message);
			}
		}
	};
	
	// Controller Init
	FRISBEEAPP.controller = {
		init: function () {
			// Initialize router
			FRISBEEAPP.router.init();
			FRISBEEAPP.gestures.init();
			FRISBEEAPP.scroller.init();
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
			    },

			    '/ranking': function() {
			    	FRISBEEAPP.ajax.getObjectsForRanking();
			    },
			    '*': function() {
			    	FRISBEEAPP.ajax.getObjectsForSchedule();
			    }
			});
		},

		change: function () {
			var sections = qwery('section[data-route]'),
            	route 	 = window.location.hash.slice(2);
        	
        	for(var i = 0; i < sections.length; i++) {
        		sections[i].classList.remove('active');
        	}
			
			//Check if slash is there or not for gameID
			if(route.search("/") != -1) {
				route = route.substring(0, route.search("/"));
			}
        	
        	var sectionToChange = qwery('[data-route=' + route + ']')[0];

        	sectionToChange.classList.add('active');

        	// If no route is found, default is schedule
        	if (!route) {
        		sections[0].classList.add('active');
        	}
		}

	};

	// Pages
	FRISBEEAPP.page = {
		render: function (route) {
			var data = FRISBEEAPP[route];

			//Add data to some attributes
			var directives = {
				// Array of data
				schedule: {
					//ID of the to be changed
					link: {
						href: function(params) {
							return "#/game/" + this.gameID;
						}
					}
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
			Transparency.render(qwery('[data-route='+route+']')[0], data, directives);
			FRISBEEAPP.router.change();
			
		}
	}

	FRISBEEAPP.ajax = {
		//Grabs the objects for the ranking page
		getObjectsForRanking: function () {
			//Feed URL for ranking
			var feed = "https://api.leaguevine.com/v1/pools/?tournament_id=19389&order_by=%5Bname%5D";

			// Fixes visual bug where DOM shows some objects
			document.querySelector('article > section:nth-of-type(3) > section').classList.remove("show");
			document.querySelector('article > section:nth-of-type(3) > section').classList.add("hide");

			FRISBEEAPP.utilities.spinner.show();

			promise.get(feed).then(function(error, data, xhr){
				if (error) {
       				FRISBEEAPP.utilities.error.alert("Request timed out. Error code: ");
        			return;
    			}	
				
				data = JSON.parse(data)

				// For every pool in the api get poolname
				for (var i = 0; i < data.objects.length; i++) {
					var poolName = data.objects[i].name;

					FRISBEEAPP.ranking.rank[i] = {
						poolID: "Pool " + poolName
					};

					FRISBEEAPP.ranking.rank[i].teams = [];

					// For every team in a pool grab data
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
				//Shows elements after array has been filled
				document.querySelector('article > section:nth-of-type(3) > section').classList.remove("hide");
				document.querySelector('article > section:nth-of-type(3) > section').classList.add("show");
				FRISBEEAPP.utilities.spinner.hide();
				FRISBEEAPP.page.render('ranking');
			});
		},

		getObjectsForSchedule: function () {
			var feed = "https://api.leaguevine.com/v1/games/?tournament_id=19389&limit=100&access_token=6c8247a098";
			document.querySelector('article > section:nth-of-type(1) > section').classList.remove("show");
			document.querySelector('article > section:nth-of-type(1) > section').classList.add("hide");
			FRISBEEAPP.utilities.spinner.show();
			
			promise.get(feed).then(function(error, data, xhr) {
				if (error) {
       				FRISBEEAPP.utilities.error.alert("Request timed out. Error: ");
        			return;
    			}	

				data = JSON.parse(data);

				for (var i = 0; i < data.objects.length; i++) {
					var year = data.objects[i].start_time.substr(0,4);
					var month = data.objects[i].start_time.substr(5,2);
					var day = data.objects[i].start_time.substr(8,2);
					var hour = data.objects[i].start_time.substr(11,2)
					var minutes = data.objects[i].start_time.substr(14,2)

					FRISBEEAPP.schedule.schedule[i] = {
						poolID: "Pool " + data.objects[i].pool.name,
						date: day + "-" + month + "-" + year + " " + hour + ":" + minutes,
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
				document.querySelector('article > section:nth-of-type(1) > section').classList.remove("hide");
				document.querySelector('article > section:nth-of-type(1) > section').classList.add("show");
				FRISBEEAPP.schedule.schedule.reverse();
				FRISBEEAPP.page.render('schedule');
			});
		},

		getObjectsForGame: function (gameID) {
			FRISBEEAPP.utilities.spinner.show();
			var feed = "https://api.leaguevine.com/v1/games/" + gameID + "/";

			promise.get(feed).then(function(error, data, xhr) {
				if (error) {
       				alert('Error ' + xhr.status);
        			return;
    			}

    			data = JSON.parse(data);	

    			FRISBEEAPP.game.game = {
    				team1Name: data.team_1.name,
    				team2Name: data.team_2.name,
    				team1Score: data.team_1_score,
    				team2Score: data.team_2_score
    			}
    			
    			FRISBEEAPP.page.render('game');
    			FRISBEEAPP.utilities.spinner.hide();
    		});
		},

		saveNewScore: function () {
			//Locate gameID from URL
			var gameID = window.location.hash.slice(2);
			if(gameID.search("/") != -1) {
				//FIX THE SUBSTRRRR
				gameID = gameID.substr(gameID.search("/") + 1 , 6);
			}	

			//Grab the value out of the input types
			var team1Score = document.getElementById('team1Score').value;
			var team2Score = document.getElementById('team2Score').value;

			//Grab value of radio button
			var radioChecked = document.querySelector('input[name="is_final"]:checked').value;

			var isFinal = false;

			if (radioChecked == "yes") {
				isFinal = true;

				if(confirm("Once you agree that the game has ended, you will not be able to update the score anymore, are you sure you want to proceed?")) {
					//Fire updatenewScore function
					FRISBEEAPP.ajax.updateNewScore(gameID, team1Score, team2Score, isFinal);
				} 
			}

			if (radioChecked == "no") {
				//Fire updatenewScore function
				FRISBEEAPP.ajax.updateNewScore(gameID, team1Score, team2Score, isFinal);
			}
		},

		updateNewScore: function (gameID, team1Score, team2Score, isFinal) {
			FRISBEEAPP.utilities.spinner.show();

			//Make new request object
	        var request = new XMLHttpRequest();

	        //The data to adjust
	        var dataToSend = {
	                "game_id": gameID,
	                "team_1_score": team1Score,
	                "team_2_score": team2Score,
	                "final": isFinal
	        };

	        //Set method, url and if async
	        request.open("POST","https://api.leaguevine.com/v1/game_scores/",true);

	        //Set request subject and content
	        request.setRequestHeader("Content-Type","application/json");
	        request.setRequestHeader("Accept","application/json");
	        request.setRequestHeader("Authorization","bearer 74884efad3");

	        //Stringify data
	        request.send(JSON.stringify(dataToSend));

	        //If reeadystate changes do stuff
	        request.onreadystatechange = function() {
                  if(request.readyState == 4) {
                  	FRISBEEAPP.utilities.spinner.hide();
                  	FRISBEEAPP.utilities.error.alert("Posted new score.", "Check the schedule page for the update!");
                  	console.log("Post success!");
                  } document.getElementById("gesture")
	         }
		}
	}

	FRISBEEAPP.gestures = {
		init: function () {
			$$(".gesture").swipe(function () {
				Fader.fadeOutWithId("changescore", 1);
				alert('swipe');
			});
		}
	}

	FRISBEEAPP.scroller = {
		// init: function () {
		// 	var myScroll = new iScroll('wrap');
			
		// 	var myScroll,
		// 	pullDownEl, pullDownOffset,
		// 	pullUpEl, pullUpOffset,
		// 	generatedCount = 0;

		// 	console.log('yolo');
		// 	function pullDownAction () {
		// 		setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		// 			console.log('swag');
					
		// 			myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
		// 		}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
		// 	}
		// }
	}

	// If DOM == ready, fire function:
	domready(function () {
		// Initialize FRISBEEAPP
		FRISBEEAPP.controller.init();
	});
	
})();
