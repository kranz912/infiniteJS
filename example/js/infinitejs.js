'use strict'
var rootScope ={}; 
var infinite = (function(){
    return{
        controller:controller
    };
    function init(controller,vmmodels){
        rootScope[controller] = {};
        vmmodels.forEach(vmmodel => {
            var propToBind = vmmodel.getAttribute('data-i-bind');
            addScopeProp(propToBind);
            vmmodel.addEventListener('change',function(){
                rootScope[controller][propToBind] = vmmodel.value;
            });
            vmmodel.addEventListener('keyup',function(){
                rootScope[controller][propToBind] = vmmodel.value;
            });
    
        });

        function addScopeProp(prop){
            if(!rootScope[controller].hasOwnProperty(prop)){
                var value;
                Object.defineProperty
                (
                    rootScope[controller],
                    prop, 
                    {
                    set: function(newValue){
                        value = newValue;
                        vmmodels.forEach(function(element){
                            if(element.getAttribute('data-i-bind')=== prop){
                                element.value= newValue;
                                element.innerHTML = newValue;
                   
                            }
                        });
                    },
                    get: function(){
                        return value;
                    },
                    enumerable: true
                });
            }
        }
   
    }
    function controller(controllername, controllerfunction){
        document.addEventListener('DOMContentLoaded',function(){
            var controllerElement = document.querySelectorAll('[data-i-controller="'+controllername+'"]');
            controllerElement.forEach(function(element){
               var vmmodels= element.querySelectorAll('[data-i-bind]');
               init(controllername,vmmodels);
               repeaterhandler(element,controllername);
            });
           controllerfunction(rootScope[controllername]);

        });
    }
    function repeaterhandler(controllerElement, controllername){
        var repeaters = controllerElement.querySelectorAll('[data-i-repeat]');
        if(typeof(rootScope)!=='undefined'){
          if(typeof(rootScope[controllername]!=='undefined')){
            var scope = rootScope[controllername];
         
            repeaters.forEach(repeater => {
              var repeaterattrb = repeater.getAttribute('data-i-repeat');
              console.log(repeaterattrb)
              if(/^[a-z-A-Z]* in [a-z-A-Z]*$/.test(repeaterattrb)){
                var metadata = repeaterattrb.split(' ');
                console.log(scope['y']);
                if(Array.isArray()){
                    console.log('test');
                }
              }  
            });
          }
        }

    }
})();

