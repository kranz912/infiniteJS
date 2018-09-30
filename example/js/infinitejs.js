

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
                console.log('test1');
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
                        console.log('test');
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
    
    
    //not yet implemented
    function controller(controllername, controllerfunction){
        document.addEventListener('DOMContentLoaded',function(){
            var controllerElement = document.querySelectorAll('[data-i-controller="'+controllername+'"]');
            console.log(controllerElement);
            controllerElement.forEach(function(element){
                
               var vmmodels= element.querySelectorAll('[data-i-bind]');

               init(controllername,vmmodels);
               console.log(element);
            });
           controllerfunction();
        });

    }
})();

