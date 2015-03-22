module.exports=function($scope,config,$location,rest,save,$document,modalService) {

    $scope.beer = config.activeBeer;
    $scope.brewery;
    $scope.localData = {};
    rest.getAll($scope.localData, "breweries");

    if (angular.isUndefined(config.activeBeer)) {
        $location.path("beers/");
    }
    else{
        if($scope.beer.photo == null){
            console.log('lel');
            $scope.beer.photo = "img/beers/default.jpg"
        }
    }

    $scope.getBrewery = function(){
        for(var i = 0; i < $scope.localData.breweries.length; i++){
            if($scope.localData.breweries[i].id == $scope.beer.idBrewery){
                $scope.brewery = $scope.localData.breweries[i].name;
            }
        }
        return $scope.brewery;
    };
};