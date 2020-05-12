/**
 * hippocamp.js
 *
 * An educational game system
 *
 */

{ /* Utilities */

  // modified from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomInt(min, max)
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * ((max+1) - min)) + min; // min and max are now both inclusive
  };
  
  function chooseAtRandom(array)
  {
    return array[getRandomInt(0, array.length-1)];
  };
  
  // Fisher-Yates Shuffle as described ingeniously here: http://bost.ocks.org/mike/shuffle/
  shuffle = function(array)
  {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m)
    {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };
}


{ /* Globals */
  var foo   = null; // test object
  
  var content           = null; // page element
  var modes             = null;
  var currentMode       = null;
  var currentDataset    = null;
  var currentCategory   = null;
  var currentProblemset = null;
}

{ /* Modes */

  modes = {};

  modes.cvc = 
  {
    makeButton : function(params)
    {
      var newButton = document.createElement('button');
      newButton.classList.add('btnCVC');
      newButton.textContent = 'undefined';
      return newButton;
    },
    
    makeProblem : function(params)
    {
      var newProblem = document.createElement('div');
      newProblem.classList.add('problem');
      newProblem.textContent = 'undefined';
      return newProblem;
    },
    
    startProblemset : function(params)
    {
      var randomOptions = shuffle(Array.from(currentProblemset));
      
      for (var i in randomOptions)
      {
        var p = this.makeProblem();
        p.textContent = randomOptions[i].problem;
        content.appendChild(p);
        
        // wait for input
      }
    },
    
    startCategory : function(params)
    {
      currentCategory   = chooseAtRandom(currentDataset);
      currentProblemset = chooseAtRandom(currentCategory.problemsets);
      
      // I guess this goes in a loop?
      
      var randomOptions = shuffle(Array.from(currentProblemset));
      
      for (var i in randomOptions)
      {
        var b = this.makeButton();
        b.textContent = randomOptions[i].answer;
        content.appendChild(b);
      };
      
      this.startProblemset();
    },
    
    endCategory : function(params)
    {
      // get rid of content content
      content.innerHTML = null;
    },
  };
  
}

{ /* Main */

  function main()
  {
    console.log('foo');
    init();
    currentDataset = dataset.cvc; // NOTE: Dependency on dataset.cvc.js
    currentMode    = modes.cvc;
    currentMode.startCategory();
  }
  
  function init()
  {
    // init globals
    content = document.getElementById('content');
  };

  // Avoiding jQuery dependency, but I'm not sure how reliable this is.
  document.addEventListener("DOMContentLoaded", function(event)
  { 
    main();
  });
  
}
