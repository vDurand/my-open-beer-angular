module.exports=function($scope,config,$location,rest,save,$document,modalService) {

    $scope.brewery = config.activeBrewery;

    if (angular.isUndefined(config.activeBrewery)) {
        $location.path("breweries/");
    }
    else{
        if($scope.brewery.photo == null || $scope.brewery.photo == ""){
            $scope.brewery.photo = "img/breweries/default.jpg"
        }
    }
};