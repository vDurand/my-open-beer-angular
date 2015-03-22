var appBreweries=angular.module("BeersApp", []).
    controller("BeersController", ["$scope","rest","$timeout","$location","config","$route","save",require("./beersController")]).
    controller("BeerAddController",["$scope","config","$location","rest","save","$document","modalService",require("./beerAddController")]).
    controller("BeerDisplayController",["$scope","config","$location","rest","save","$document","modalService",require("./beerDisplayController")]).
    controller("BeerUpdateController",["$scope","config","$location","rest","save","$document","modalService","$controller",require("./beerUpdateController")]);
module.exports=angular.module("BeersApp").name;