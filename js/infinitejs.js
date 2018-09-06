var scope ={};
var infinite = (function(){
    return{
        load:load
    };
    function init(){
        var elements = document.querySelectorAll('[data-i-bind]');
        elements.forEach(function(element){
            var propToBind = element.getAttribute('data-i-bind');
            addScopeProp(propToBind);
            element.addEventListener("change",function(){
               scope[propToBind] = element.value;
            });
            element.addEventListener("keyup",function(){
                scope[propToBind] = element.value;
            });
        });
        function addScopeProp(prop){
            if(!scope.hasOwnProperty(prop)){
                var value;
                Object.defineProperty
                (
                    scope,
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
                    },
                    get: function(){
                        return value;
                    },
                    enumerable: true
                });
            }
        }
    }
    function load(){
        document.addEventListener("DOMContentLoaded",function(){
            init();
            
        });
    }
    //not yet implemented
    function controller(controllername, controllerfunction){
       var elements = document.querySelectorAll('[data-i-controller="'+controllername+'"]');
    }
})();

