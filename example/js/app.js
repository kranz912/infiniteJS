infinite.controller('main',function(){
    console.log('main controller');
});
infinite.controller('sub',function(scope){
    scope.name='test';
    scope.y=[];
    console.log(scope);

    console.log('sub controller');
});