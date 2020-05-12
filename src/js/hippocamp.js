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
}


{ /* Globals */
  var foo   = null; // test object
  
  var content        = null; // page element
  var modes          = null;
  var currentMode    = null;
  var currentDataset = null;
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
    
    placeButtons : function(params)
    {
      content.appendChild(this.makeButton());
    },
    
    startCategory : function(params)
    {
      var category = chooseAtRandom(currentDataset);
      var problemset = chooseAtRandom(category.problemsets);
      
      for (var i in problemset)
      {
        var b = this.makeButton();
        b.textContent = problemset[i].answer;
        content.appendChild(b);
      }
    },
    
    endCategory : function(params)
    {
      // get rid of content content
      content.innerHTML = null;
    }
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
