module.exports=function($scope,config,$location,rest,save,$document,modalService) {

    $scope.brewery;
    $scope.localData = {};


    if (angular.isUndefined(config.activeBeer)) {
        $location.path("beers/");
    }
    else{
        $scope.beer = config.activeBeer;
        if($scope.beer.photo == null || $scope.beer.photo == ""){
            $scope.beer.photo = "img/beers/default.jpg"
        }
        rest.getAll($scope.localData, "breweries/" + $scope.beer.idBrewery);
    }

    $scope.getBrewery = function(){
        $scope.brewery = $scope.localData["breweries/" + $scope.beer.idBrewery];
        /*for(var i = 0; i < $scope.localData.breweries.length; i++){
            if($scope.localData.breweries[i].id == $scope.beer.idBrewery){
                $scope.brewery = $scope.localData.breweries[i];
            }
        }*/
        return $scope.brewery.name;
    };

    $scope.showBrewery = function(){
        if(angular.isDefined($scope.brewery)){
            config.activeBrewery=angular.copy($scope.brewery);
            config.activeBrewery.reference=$scope.brewery;
        }
        $location.path("breweries/detail");
    }
};