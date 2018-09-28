

var rootScope ={}; 
var infinite = (function(){
    return{
        load:load
    };
    function init(controller){
        rootScope[controller] = {};
        var elements = document.querySelectorAll('[data-i-bind]');
        elements.forEach(function(element){
            var propToBind = element.getAttribute('data-i-bind');
            addScopeProp(propToBind);
            element.addEventListener("change",function(){
                rootScope[controller][propToBind] = element.value;
            });
            element.addEventListener("keyup",function(){
                rootScope[controller][propToBind] = element.value;
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
                        elements.forEach(function(element){
                            if(element.getAttribute('data-i-bind')=== prop){
                                element.value= newValue;
                                element.innerHTML = newValue;
                            }
                        });
                        console.log('test');
                    },
                    get: function(){
                        return value;
                    },
                    enumerable: true
                });
            }
        }
   
    }
    
    

    function load(controller){
        document.addEventListener("DOMContentLoaded",function(){
            init(controller);
            
        });
    }
    //not yet implemented
    function controller(controllername, controllerfunction){
       var elements = document.querySelectorAll('[data-i-controller="'+controllername+'"]');
    }
})();

