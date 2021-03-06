/* **Opdracht 2.1: Constructor object**  
Maak met een object constructor een ‘Persoon’-object aan met de property ‘name’ en de method ‘speak’. En maak een nieuwe instantie aan van dit object waarbij je de naam ‘Bob’ meegeeft als parameter van het object 

**Opdracht 2.2: Prototype**  
Voeg de methods ‘walk’ en ‘eat’ toe aan het ‘Persoon’-object met de prototype function van het object

**Opdracht 2.3: Object Literal**  
Maak nu hetzelfde object, met dezelfde properties en methods aan met een object literal
*/

function Persoon () {
	this.name = this.name;

	this.speak = function (name) {
		console.log(name);
	}

	this.prototype.walk = function () {
		console.log("I'm walking!"); 
	}

	this.prototype.eat = function () {
		console.log("I'm eating!");
	}
}

var persoon = {
	name: "Duck Persoon";

	walk: function () {
		console.log("I'm walking!");
	}

	eat: function () {
		console.log("I'm eating");
	}
}