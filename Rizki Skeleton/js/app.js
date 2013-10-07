var FRISBEEAPP = FRISBEEAPP || {};

(function () {

	'use strict';

	// Schedule data object
	FRISBEEAPP.schedule = {
		title:'Pool A - Schedule',
		description:'Hier vindt u het speelschema van pool A',
		schedule: [
			{ date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
			{ date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
			{ date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
			{ date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
			{ date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
			{ date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
			{ date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
			{ date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
			{ date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
			{ date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
			
		]
	};

	//Game data object
	FRISBEEAPP.game = {
		title:'Pool A - Score: Boomsquad vs. Burning Snow',
		description:'Boomsquad* 15 - 8 Burning Snow',
		game: [
			{ score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
			{ score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
			{ score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
			{ score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
			{ score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
			{ score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
			{ score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
			{ score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
			{ score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
			{ score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
			{ score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
			{ score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
			{ score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
			{ score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
			{ score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
			{ score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
			{ score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
			{ score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
			{ score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
			{ score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
			{ score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
			{ score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
			{ score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
		]
	};

	//Ranking data object
	FRISBEEAPP.ranking = {
		title:'Ranking',
		description:'Hier vindt u de ranking',
		rank: [
			{ team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39", Bl: 0},
		    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34", Bl: 0},
		    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23", Bl: 0},
		    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34", Bl: 0},
		    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37", Bl: 0}
		]
	};
	
	// Controller Init
	FRISBEEAPP.controller = {
		init: function () {
			// Initialize router
			FRISBEEAPP.calculator.init();
			FRISBEEAPP.router.init();
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
			var data = eval('FRISBEEAPP.'+route);

			Transparency.render(qwery('[data-route='+route+']')[0], data);
			FRISBEEAPP.router.change();
		}
	}

	// Calculate ± points

	FRISBEEAPP.calculator = {
		init: function() {
			//Create a loop that loops through every array and picks up/calculates the balance of scores:
			for(var i = 0; i < FRISBEEAPP.ranking.rank.length; i++) {
				var balance = this.calculateBalance(FRISBEEAPP.ranking.rank[i]["Pw"], FRISBEEAPP.ranking.rank[i]["Pl"]);
				
				FRISBEEAPP.ranking.rank[i]["Bl"] = balance;


				console.log(balance);
			}
		},

		calculateBalance: function (won, lost) {
			console.log("fixed");

			var pointsWon = parseInt(won);
			var pointsLost = parseInt(lost);

			var pointsBalance = pointsWon - pointsLost;

			return pointsBalance;
		}
	}

	FRISBEEAPP.ajax = {
		init: function () {
			this.getObjectsFromAPI("https://api.leaguevine.com/v1/pools/?tournament_id=19389");
		},

		getObjectsFromAPI: function (url) {
			promise.get(url).then(function(error, text, xhr){
				if (error) {
       				alert('Error ' + xhr.status);
        			return;
    			}	
				var parsedObject = JSON.parse(text);

				for(var i = 0; i = parsedObject.objects.length; i++) {
					console.log(parsedObject.objects[i]);
				}

				console.log(parsedObject);
			});
		}
	}


	// If DOM == ready, fire function:
	domready(function () {
		// Initialize FRISBEEAPP
		FRISBEEAPP.controller.init();
	});
	
})();