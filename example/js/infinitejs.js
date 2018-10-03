'use strict'
var rootScope ={}; 
var infinite = (function(){
    return{
        controller:controller
    };
    function init(controller){
        rootScope[controller] = {};
        var controllerElement = document.querySelector('[data-i-controller="'+controller+'"]');
        
            var vmmodels= controllerElement.querySelectorAll('[data-i-bind]');
            vmmodels.forEach(vmmodel => {
                var propToBind = vmmodel.getAttribute('data-i-bind');
                addScopeProp(propToBind,vmmodels);
                vmmodel.addEventListener('change',function(){
                    rootScope[controller][propToBind] = vmmodel.value;
                });
                vmmodel.addEventListener('keyup',function(){
                    rootScope[controller][propToBind] = vmmodel.value;
                });
        
            });
          //  
        function addScopeProp(prop,vmmodels){
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
                        repeaterhandler(controllerElement);
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
            init(controllername);
           controllerfunction(rootScope[controllername]);

        });
    }
    function repeaterhandler(controllerElement){
        var repeaters = controllerElement.querySelectorAll('[data-i-repeat]');
        var controllername  = controllerElement.getAttribute('data-i-controller');
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
                   console.log
                }
              }  
            });
          }
        }

    }
})();

