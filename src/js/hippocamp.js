/**
 * hippocamp.js
 *
 * An educational game system
 *
 */

{ /* Utilities */

}


{ /* Globals */
  var foo   = null; // test object
  
  var content = null;//
}

{ /* Classes */


}

{ /* Modes */

  { // CVC
  
    var makeButton = function(params)
    {
      var newButton = document.createElement('button');
      newButton.classList.add('btnCVC');
      newButton.textContent = 'undefined';
      return newButton;
    };
    
    var placeButtons = function(params)
    {
      content.appendChild(makeButton());
    }
    
  }

}

{ /* Main */

  function main()
  {
    console.log('foo');
    init();
    placeButtons();
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
