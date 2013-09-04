/* **Opdracht 3.1: Local Scope**  
Maak met behulp van een function een local scope aan en definieer in deze local scope de variables ‘iterator’, ‘max’ en ‘min’ aan

**Opdracht 3.2: Global Scope**  
Maak dezelfde variables nu ook aan in de global scope

**Opdracht 3.3: Closure**  
Leg uit wat een closure is en maak een code voorbeeld

*/

var iterator;
var max;
var min;

(function () {
	var iterator;
	var max;
	var min;



})();


/*
Closure is when a function within a function is available outside of the containing function. Example given here:
*/


function Debugger () {
	this.debug = function () {
		console.log("Debugging!");
	}
}

var debugObject = new Debugger;

debugObject.debug();