var ICHG = ICHG || {};

(function () {
	var SANDBOX = "SANDBOX";
	var LINEAIR = "LINEAIR";
	var GPS_AVAILABLE = 'GPS_AVAILABLE';
	var GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
	var POSITION_UPDATED = 'POSITION_UPDATED';
	var REFRESH_RATE = 1000;g
	var currentPosition = currentPositionMarker = customDebugging = debugId = map = interval =intervalCounter = updateMap = false;
	var locatieRij = markerRij = [];


//// GPS OBJECT
	var gps = {
		var self = this;

		init: function () {
			debug.debugMessage("Controleer of GPS beschikbaar is...");

    		ET.addListener(GPS_AVAILABLE, this.startInterval);
    		ET.addListener(GPS_UNAVAILABLE, function(){debug.debugMessage('GPS is niet beschikbaar.')});

    		(geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);
		}

		startInterval: function (event) {
			debug.debugMessage("GPS is beschikbaar, vraag positie.");
		    self.updatePosition();
		    interval = self.setInterval(self.updatePosition, REFRESH_RATE);
		    ET.addListener(POSITION_UPDATED, self.checkLocations);
		}

		updatePosition: function () {
			intervalCounter++;
    		geo_position_js.getCurrentPosition(self.setPosition, _geo_error_handler, {enableHighAccuracy:true});

		}

		setPosition: function (position) {
			currentPosition = position;
    		ET.fire("POSITION_UPDATED");
    		debug.debugMessage(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);
		}

		checkLocations: function (event) {
			for (var i = 0; i < locaties.length; i++) {
	        var locatie = {ccoords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

	        if(self.calculateDistance(locatie, currentPosition)<locaties[i][2]){

	            // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
	            if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
	                // Probeer local storage, als die bestaat incrementeer de locatie
	                try {
	                    (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
	                } catch(error) {
	                    debug.debugMessage("Localstorage kan niet aangesproken worden: "+error);
	                }

					// TODO: Animeer de betreffende marker

	                window.location = locaties[i][1];
	                debug.debugMessage("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
	            }
	        }
	    }

	    calculateDistance: function (p1, p1) {
		    var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
		    var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
		    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);	    	
	    }
	}


//// MAP OBJECT
	var map = {
		generateMap: function (myOptions, canvasId) {
		// TODO: Kan ik hier asynchroon nog de google maps api aanroepen? dit scheelt calls
		    debug.debugMessage("Genereer een Google Maps kaart en toon deze in #"+canvasId)
		    map = new google.maps.Map(document.getElementById(canvasId), myOptions);

		    var routeList = [];
		    // Voeg de markers toe aan de map afhankelijk van het tourtype
		    debug.debugMessage("Locaties intekenen, tourtype is: "+tourType);
		    for (var i = 0; i < locaties.length; i++) {

		        // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
		        try {
		            (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;
		        } catch (error) {
		            debug.debugMessage("Localstorage kan niet aangesproken worden: "+error);
		        }

		        var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
		        routeList.push(markerLatLng);

		        markerRij[i] = {};
		        for (var attr in locatieMarker) {
		            markerRij[i][attr] = locatieMarker[attr];
		        }
		        markerRij[i].scale = locaties[i][2]/3;

		        var marker = new google.maps.Marker({
		            position: markerLatLng,
		            map: map,
		            icon: markerRij[i],
		            title: locaties[i][0]v
		        });
		    }
		// TODO: Kleur aanpassen op het huidige punt van de tour
		    if(tourType == LINEAIR){
		        // Trek lijnen tussen de punten
		        debug.debugMessage("Route intekenen");
		        var route = new google.maps.Polyline({
		            clickable: false,
		            map: map,
		            path: routeList,
		            strokeColor: 'Black',
		            strokeOpacity: .6,
		            strokeWeight: 3
		        });

		    }

		    // Voeg de locatie van de persoon door
		    currentPositionMarker = new google.maps.Marker({
		        position: kaartOpties.center,
		        map: map,
		        icon: positieMarker,
		        title: 'U bevindt zich hier'
		    });

		    // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
		    ET.addListener(POSITION_UPDATED, update_positie);
		}

		updatePositie: function (event) {
			// use currentPosition to center the map
		    var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
		    map.setCenter(newPos);
		    currentPositionMarker.setPosition(newPos);
		}
	}


	var debug = {
		var self = this;

		geoErrorHandler: function (code, message) {
			self.debugMessage('geo.js error '+code+': '+message);
		}

		debugMessage: function (message) {
			(customDebugging && debugId)?document.getElementById(debugId).innerHTML:console.log(message);
		}

		setCustomDebugging: function (debugId) {
			debugId = this.debugId;
    		customDebugging = true;
		}
	} 	

	var options = {
		isNumber: function (n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
	}


	gps.init();
})();