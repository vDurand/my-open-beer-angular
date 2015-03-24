module.exports=function($scope,config,$location,rest,save,$document,modalService) {

    $scope.localData = {};
    $scope.beerOn = false;

    if (angular.isUndefined(config.activeBrewery)) {
        $location.path("breweries/");
    }
    else{
        $scope.brewery = config.activeBrewery;
        var id = $scope.brewery.id;
        console.log(id);

        if($scope.brewery.photo == null || $scope.brewery.photo == ""){
            $scope.brewery.photo = "img/breweries/default.jpg"
        }
        rest.getAll($scope.localData, "beers/brewery/" + id);
    }

    $scope.getBeerCount = function(){
        if(typeof $scope.localData["beers/brewery/" + id] !== 'undefined' && $scope.localData["beers/brewery/" + id].length > 0){
            return $scope.localData["beers/brewery/" + id].length;
        }
        else{
            return 0;
        }
    };

    $scope.showBeers = function(){
        if($scope.beerOn == false && $scope.getBeerCount() > 0){
            $scope.beerOn = true;
            $scope.beers = $scope.localData["beers/brewery/" + id];
        }
        else{
            $scope.beerOn = false;
        }
    };

    $scope.showBeer = function(beer){
        config.activeBeer=angular.copy(beer);
        config.activeBeer.reference=beer;

        $location.path("beers/detail");
    }
};