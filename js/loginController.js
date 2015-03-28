module.exports = function ($scope, $location, rest, config) {

    $scope.submit = function(){
        var data = {};
        data.posted={"mail":$scope.email,"password":$scope.password};
        rest.connect(data,function(d){
            console.log("Connexion réussie, token : "+d.token);
            config.server.privateToken=d.token;
        });
    }


}