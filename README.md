Readme for a webapplication I made for a Leaguevine tournament; Autumn 2013 Amsterdam Ultimate Frisbee.
Copyright © Rizki Calame

This webapp has a few functionalities you'd ought to know:
- Pull in data from an API owned by Leaguevine. The data is in a JSON-format that is parsed and organized in Javascript.
- The data from the API has three important subjects, namely; A tournament schedule, information about the scores of a certain game and a ranking for every pool within the tournament.
- The webapplication also has the ability to post new game scores during a game, so you can update the 'crowd' about the progress of a certain game.

<!-- Microlibraries -->
- routie.min.js; A library capable of seeing what 'page' you're on by looking at the document url.
- ready.min.js; A library that can see whether your DOM is loaded or not.
- qwery.min.js; Qwery makes it possible to look for a specific element that contains a certain attribute.
- transparancy.min.js; A templating engine that can 'data-bind' certain elements to data. The data I'm binding the elements to originate from an API and pulled into data-objects.
- promise.min.js; Promise serves as a way to get the JSON-feeds I need. It enables me to pull data and then parse the data in native Javascript.
- fader.min.js; Fader is a library I can use to fade in and out elements.
- Quo.js; Quo is a gesture recognizer. I can fire certain functions when a gesture has been recognized.

<!-- Controllers -->
In this project I'm able to use just one controller, namely FRISBEEAPP.controller.init();. which will be executed the second ready.min.js detects the DOM has been loaded. My controller will initialize two other functions, which are the FRISBEEAPP.router.init(); and FRISBEEAPP.gestures.init();

<!-- Application Breakdown -->
A breakdown of the objects and functions used in my application:

- FRISBEEAPP {}; //My namespace which main functionality is to prevent name collisions and make your application easier to understand
  - schedule {};
    - schedule []
    
  - game {};
    -game []
    
  - ranking {};
    - rank []
    
  - utilities {};
    - spinner {};
      - spinnerObject,
      - show ();
      - hide ();
    - error {};
      - alert ();
    - fader {};
      - fadeIn ();
      - fadeOut ();
    
    - controller {};
      - init ();
      
    - router {};
      - init ();
      - change ();
      
    - page {};
      - render ();
      
    - ajax {};
      - getObjectsForRanking ();
      - getObjectsForSchedule ();
      - getObjectsForGame ();
      - saveNewScore ();
      - updateNewScore ();
      
    - gestures {};
      - init();
      
    - domready();
    
      
