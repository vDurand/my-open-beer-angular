(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=function() {
	return {
		restrict: 'A',
		link: function(scope, elm, attrs) {
			var options = scope.$eval(attrs.drag);
			elm.draggable(options);//! Nécessite JQuery UI
		}
	};
};
},{}],2:[function(require,module,exports){
module.exports=function($q) {
	return {
		restrict:'E',
		scope : {title: "@",buttons: "=",did: "@",show: "=",onExit: "&"},
		templateUrl: 'js/addons/templates/modal.html',
		transclude: true,
		replace:true,
		controller:function($scope){
			$scope.isDismiss=function(button){
				result="";
				if(button.dismiss=="true" || button.dismiss===true)
					result='modal';
				return result;
			}
		},
		link:{
			post: function postLink($scope, tElem, tAttrs) {
				
				if($("#"+$scope.did).length)
					$("#"+$scope.did).modal();
				
				$scope.$watch('show', function(newValue, oldValue) {
					if(newValue===true){
						$("#"+$scope.did).modal('show');
						$scope.deferred = $q.defer();
						$scope.deferred.promise.then(function(value){
							$scope.show=false;
							$scope.onExit({button:value});
						});
					}
					else{
						$("#"+$scope.did).modal('hide');
						//if(angular.isDefined($scope.deferred))
						///	$scope.deferred.reject();
					}
				});
				$scope.iClick=function(button){
					$scope.deferred.resolve(button.caption);
					alert(button.caption);
				};
//				angular.forEach($scope.buttons, function(button, index) {
//					if($("#"+$scope.did+"-"+index).length){
//						$("#"+$scope.did+"-"+index).click(function(){
//							$scope.deferred.resolve(button.caption);
//							alert(button.caption);
//							}
//						);
//					}
//				});
			}
		}
	};
};
},{}],3:[function(require,module,exports){
module.exports=function($q,$compile,$rootScope,$sce){
	
    this.showModal=function(title,content,then){
    	if(angular.isUndefined(this.scope)){
	    	this.scope=$rootScope.$new(true);
    	//}
    	this.scope.buttons=[{caption:"Enregistrer et continuer",dismiss:"true"},{caption:"Continuer",dismiss:"true"},{caption:"Annuler",dismiss:"true"}];
    	this.scope.then=then;
    	this.scope.title=title;
    	this.scope.content=$sce.trustAsHtml(content);
    	var elm=angular.element('<bs-modal did="id-dialog" on-exit="then(button)" buttons="buttons" show="showDialog" title="{{title}}"><div data-ng-bind-html="content"></div></bs-modal>');
    	$compile(elm)(this.scope);
    	//scope.$apply();
    	if(!$("#id-dialog").length)
    		angular.element($("body")).append(elm);
//			$("#id-dialog").on('hide.bs.modal', function() {
//				this.scope.showDialog=false;
//			});
    	}
    	this.scope.showDialog=true;
    }
};
},{}],4:[function(require,module,exports){
module.exports= function() {
	return function( items) {
        var filtered = [];
        angular.forEach(items, function(item) {
            if(!item.deleted) {
                filtered.push(item);
            }
        });
        return filtered;
    };
};
},{}],5:[function(require,module,exports){
module.exports=function(){
	return {
		restrict: "A",
		scope: {field:"@",ref:"="},
		templateUrl: 'js/addons/templates/sortBy.html',
		transclude: true,
		replace:false,
		controller: function ($scope) {
			$scope.sortByField=undefined;
			$scope.asc=true;
			if($scope.immediatly){
				$scope.sortBy();
			}
			$scope.isAlt=function(){
				var result="";
				if($scope.isSortByMe){
					if(!$scope.ref.asc){
						result="-alt";
					}
				}
				return result;
			};
			$scope.sortBy=function(){
				if(angular.isUndefined($scope.sortByField)){
					$scope.asc=true;
				}else{
					$scope.asc=!$scope.asc;
				}
				$scope.sortByField=$scope.field;
				$scope.ref.field=$scope.field;
				$scope.ref.asc=$scope.asc;
			};
			$scope.isSortByMe=function(){
				return $scope.ref.field===$scope.field;
			};
		}
	};
};
},{}],6:[function(require,module,exports){
angular.module("mainApp",["ngRoute","ngResource","ngAnimate",require("./breweries/breweriesModule"),require("./beers/beersModule"),require("./config/configModule")]).
controller("MainController", ["$scope","$location","save","$window",require("./mainController")]).
controller("SaveController", ["$scope","$location","save",require("./save/saveController")]).
service("rest", ["$http","$resource","$location","config","$sce",require("./services/rest")]).
service("save", ["rest","config","$route",require("./services/save")]).
config(["$routeProvider","$locationProvider","$httpProvider",require("./config")]).
filter("NotDeletedFilter",require("./addons/notDeletedFilter")).
directive("sortBy", [require("./addons/sortBy")]).
directive("Drag",require("./addons/drag")).
directive("bsModal",["$q",require("./addons/modal")]).
service("modalService",["$q","$compile","$rootScope","$sce",require("./addons/modalService")]).
run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
	$rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
		var paths=$location.path().split("/");
		var result=new Array();
		var href="";
		for(var i in paths){
			var p={};
			if(paths[i]){
				p.caption=paths[i];
				if(i<paths.length-1){
					p.href=href+paths[i]+"/";
					href+=paths[i];
				}else{
					p.href="";
				}
				result.push(p);
			}
		}
		$rootScope.paths=result;
	});
}]
).factory("config", require("./config/configFactory"));

},{"./addons/drag":1,"./addons/modal":2,"./addons/modalService":3,"./addons/notDeletedFilter":4,"./addons/sortBy":5,"./beers/beersModule":10,"./breweries/breweriesModule":12,"./config":15,"./config/configFactory":17,"./config/configModule":18,"./mainController":19,"./save/saveController":20,"./services/rest":21,"./services/save":22}],7:[function(require,module,exports){
module.exports=function($scope,config,$location,rest,save,$document,modalService) {

    $scope.data={};
    $scope.data["beers"]=config.beers.all;
    var self=this;
    var selfScope=$scope;
    $scope.setFormScope=function(form){
        $scope.frmBeer=form;
    };
    var onRouteChangeOff=$scope.$on('$locationChangeStart', function routeChange(event, newUrl, oldUrl) {
        if (!$scope.frmBeer || !$scope.frmBeer.$dirty || $scope.exit) return;

        var alert = modalService.showModal("Sortie","<b>Attention</b>, si vous continuez, vous perdez les modifications en cours.<br>Enregistrer avant sortie ?",function(value){
                selfScope.exit=true;
                if(value=="Enregistrer et continuer"){
                    onRouteChangeOff();
                    if(selfScope._update()==true){
                        $location.path(newUrl.substring($location.absUrl().length - $location.url().length));
                    }
                }else if(value=="Continuer"){
                    console.log(value);
                    onRouteChangeOff();
                    $location.path(newUrl.substring($location.absUrl().length - $location.url().length));
                }
            }
        );
        event.preventDefault();
        return;
    });

    $scope.update=function(beer,force,callback){
        if($scope._update(beer,force,callback)==true){
            $location.path("beers");
        }
    };
    $scope._update=function(beer,force,callback){
        var result=false;
        if(angular.isUndefined(beer)){
            beer=$scope.activeBeer;
        }
        $scope.data.posted={
            "name" : beer.name,
            "description"  : beer.description
        };
        $scope.data.beers.push(beer);
        beer.created_at=new Date();
        if(config.beers.update==="immediate" || force){
            rest.post($scope.data,"beers",beer.name,callback);
        }else{
            save.addOperation("New",$scope.update,beer);
            result=true;
        }
        return result;
    }
};
},{}],8:[function(require,module,exports){
module.exports=function($scope,config,$location,rest,save,$document,modalService, $controller){
    $controller('BeerAddController', {$scope: $scope});

    if(angular.isUndefined(config.activeBeer)){
        $location.path("beers/");
    }
    $scope.activeBeer=config.activeBeer;

    $scope._update=function(beer,force,callback){
        var result=false;
        if(force || $scope.frmBeer.$dirty){
            if(angular.isUndefined(beer)){
                beer=$scope.activeBeer;
            }else{
                config.activeBeer=angular.copy(beer);
                config.activeBeer.reference=beer;
            }
            $scope.data.posted={
                "name" : beer.name,
                "description"  : beer.description
            };

            config.activeBeer.reference.name=$scope.activeBeer.name;
            config.activeBeer.reference.description=$scope.activeBeer.description;
            config.activeBeer.reference.updated_at=new Date();

            if(config.beers.update==="immediate" || force)
                rest.put(config.activeBeer.id,$scope.data,"beers",config.activeBeer.name,callback);
            else{
                config.activeBeer.reference.flag="Updated";
                save.addOperation("Updated",$scope.update,config.activeBeer.reference);
                result=true;
            }
        }else{
            result=true;
        }
        return result;
    }
};
},{}],9:[function(require,module,exports){
module.exports=function($scope,rest,$timeout,$location,config,$route,save) {
    $scope.data={load:false};

    $scope.sortBy={field:"name",asc:false};

    $scope.messages=rest.messages;

    if(config.beers.refresh==="all" || !config.beers.loaded){
        $scope.data.load=true;
        rest.getAll($scope.data,"beers");
        config.beers.loaded=true;
    }else{
        $scope.data["beers"]=config.beers.all;
    }
    $scope.allSelected=false;

    $scope.selectAll=function(){
        angular.forEach($scope.data.beers, function(value, key) {
            value.selected=$scope.allSelected;
        });
    };

    $scope.refresh=function(){
        save.executeAll();
    }

    $scope.showUpdate=function(){
        return angular.isDefined($scope.activeBeer);
    };

    $scope.refreshOnAsk=function(){
        return config.beers.refresh == 'ask';
    };

    $scope.defferedUpdate=function(){
        return config.beers.update == 'deffered';
    };

    $scope.setActive=function(beer){
        if(beer!==$scope.activeBeer)
            $scope.activeBeer=beer;
        else
            $scope.activeBeer=undefined;
    };

    $scope.isActive=function(beer){
        return beer==$scope.activeBeer;
    };

    $scope.hasMessage=function(){
        return rest.messages.length>0;
    };

    $scope.readMessage=function(message){
        $timeout(function(){
            message.deleted=true;
        },5000);
        return true;
    }

    $scope.countSelected=function(){
        var result=0;
        angular.forEach($scope.data.beers, function(value, key) {
            if(value.selected && !value.deleted)
                result++;
        });
        return result;
    };

    $scope.hideDeleted=function(){
        $scope.mustHideDeleted=!$scope.mustHideDeleted;
        angular.forEach($scope.data.beers, function(value, key) {
            if($scope.mustHideDeleted){
                if(value.flag==='Deleted')
                    value.deleted=true;
            }else{
                value.deleted=false;
            }
        });
    };

    $scope.edit=function(beer){
        if(angular.isDefined(beer))
            $scope.activeBeer=beer;
        config.activeBeer=angular.copy($scope.activeBeer);
        config.activeBeer.reference=$scope.activeBeer;
        $location.path("beers/update");
    }

    $scope.update=function(beer,force,callback){
        if(angular.isUndefined(beer)){
            beer=$scope.activeBeer;
        }
        $scope.data.posted={ "beer" : {
            "name" : beer.name,
            "description"  : beer.description
        }
        };
        $scope.data.beers.push(beer);
        beer.created_at=new Date();
        if(config.beers.update==="immediate" || force){
            rest.post($scope.data,"beers",beer.name,callback);
        }else{
            save.addOperation("New",$scope.update,beer);
            $location.path("beers");
        }
    }

    $scope.remove=function(){
        angular.forEach($scope.data.beers, function(value, key) {
            if(value.selected){
                $scope.removeOne(value);
            }
        });
        return true;
    };
    $scope.removeOne=function(beer,force,callback){
        if(config.beers.update==="immediate" || force){
            beer.deleted=true;
            rest.remove(beer,"beers",callback);
        }else{
            save.addOperation("Deleted",$scope.removeOne,beer);
            beer.deleted=$scope.hideDeleted;
        }
    }
};
},{}],10:[function(require,module,exports){
var appBreweries=angular.module("BeersApp", []).
    controller("BeersController", ["$scope","rest","$timeout","$location","config","$route","save",require("./beersController")]).
    controller("BeerAddController",["$scope","config","$location","rest","save","$document","modalService",require("./beerAddController")]).
    controller("BeerUpdateController",["$scope","config","$location","rest","save","$document","modalService","$controller",require("./beerUpdateController")]);
module.exports=angular.module("BeersApp").name;
},{"./beerAddController":7,"./beerUpdateController":8,"./beersController":9}],11:[function(require,module,exports){
module.exports=function($scope,rest,$timeout,$location,config,$route,save) {
	$scope.data={load:false};

	$scope.sortBy={field:"name",asc:false};
	
	$scope.messages=rest.messages;
	
	if(config.breweries.refresh==="all" || !config.breweries.loaded){
		$scope.data.load=true;
		rest.getAll($scope.data,"breweries");
		config.breweries.loaded=true;
	}else{
		$scope.data["breweries"]=config.breweries.all;
	}
	$scope.allSelected=false;
	
	$scope.selectAll=function(){
		angular.forEach($scope.data.breweries, function(value, key) {
			value.selected=$scope.allSelected;
		});
	};
	
	$scope.refresh=function(){
		save.executeAll();
	}
	
	$scope.showUpdate=function(){
		return angular.isDefined($scope.activeBrewery);
	};
	
	$scope.refreshOnAsk=function(){
		return config.breweries.refresh == 'ask';
	};
	
	$scope.defferedUpdate=function(){
		return config.breweries.update == 'deffered';
	};
	
	$scope.setActive=function(brewery){
		if(brewery!==$scope.activeBrewery)
			$scope.activeBrewery=brewery;
		else
			$scope.activeBrewery=undefined;
	};
	
	$scope.isActive=function(brewery){
		return brewery==$scope.activeBrewery;
	};
	
	$scope.hasMessage=function(){
		return rest.messages.length>0;
	};
	
	$scope.readMessage=function(message){
		$timeout(function(){
			message.deleted=true;
		},5000);
		return true;
	}
	
	$scope.countSelected=function(){
		var result=0;
		angular.forEach($scope.data.breweries, function(value, key) {
			if(value.selected && !value.deleted)
				result++;
		});
		return result;
	};
	
	$scope.hideDeleted=function(){
		$scope.mustHideDeleted=!$scope.mustHideDeleted;
		angular.forEach($scope.data.breweries, function(value, key) {
			if($scope.mustHideDeleted){
				if(value.flag==='Deleted')
					value.deleted=true;
			}else{
				value.deleted=false;
			}
		});
	};
	
	$scope.edit=function(brewery){
		if(angular.isDefined(brewery))
			$scope.activeBrewery=brewery;
		config.activeBrewery=angular.copy($scope.activeBrewery);
		config.activeBrewery.reference=$scope.activeBrewery;
		$location.path("breweries/update");
	}
	
	$scope.update=function(brewery,force,callback){
		if(angular.isUndefined(brewery)){
			brewery=$scope.activeBrewery;
		}
		$scope.data.posted={ "brewery" : {
		    "name" : brewery.name,
		    "url"  : brewery.url
		  }
		};
		$scope.data.breweries.push(brewery);
		brewery.created_at=new Date();
			if(config.breweries.update==="immediate" || force){
				rest.post($scope.data,"breweries",brewery.name,callback);
			}else{
				save.addOperation("New",$scope.update,brewery);
				$location.path("breweries");
			}
	}
	
	$scope.remove=function(){
		angular.forEach($scope.data.breweries, function(value, key) {
			if(value.selected){
				$scope.removeOne(value);
			}
		});
		return true;
	};
	$scope.removeOne=function(brewery,force,callback){
		if(config.breweries.update==="immediate" || force){
			brewery.deleted=true;
			rest.remove(brewery,"breweries",callback);
		}else{
			save.addOperation("Deleted",$scope.removeOne,brewery);
			brewery.deleted=$scope.hideDeleted;
		}
	}
};
},{}],12:[function(require,module,exports){
var appBreweries=angular.module("BreweriesApp", []).
controller("BreweriesController", ["$scope","rest","$timeout","$location","config","$route","save",require("./breweriesController")]).
controller("BreweryAddController",["$scope","config","$location","rest","save","$document","modalService",require("./breweryAddController")]).
controller("BreweryUpdateController",["$scope","config","$location","rest","save","$document","modalService","$controller",require("./breweryUpdateController")]);
module.exports=angular.module("BreweriesApp").name;
},{"./breweriesController":11,"./breweryAddController":13,"./breweryUpdateController":14}],13:[function(require,module,exports){
module.exports=function($scope,config,$location,rest,save,$document,modalService) {
	
	$scope.data={};
	$scope.data["breweries"]=config.breweries.all;
	var self=this;
	var selfScope=$scope;
	$scope.setFormScope=function(form){
		$scope.frmBrewery=form;
	};
	var onRouteChangeOff=$scope.$on('$locationChangeStart', function routeChange(event, newUrl, oldUrl) {
		if (!$scope.frmBrewery || !$scope.frmBrewery.$dirty || $scope.exit) return;

		var alert = modalService.showModal("Sortie","<b>Attention</b>, si vous continuez, vous perdez les modifications en cours.<br>Enregistrer avant sortie ?",function(value){
				selfScope.exit=true;
				if(value=="Enregistrer et continuer"){
					onRouteChangeOff();
					if(selfScope._update()==true){
						$location.path(newUrl.substring($location.absUrl().length - $location.url().length));
					}
				}else if(value=="Continuer"){
					console.log(value);
					onRouteChangeOff();
					$location.path(newUrl.substring($location.absUrl().length - $location.url().length));
				}
			}
		);
		event.preventDefault();
		return;
	});
	
	$scope.update=function(brewery,force,callback){
		if($scope._update(brewery,force,callback)==true){
			$location.path("breweries");
		}
	};
	$scope._update=function(brewery,force,callback){
		var result=false;
		if(angular.isUndefined(brewery)){
			brewery=$scope.activeBrewery;
		}
		$scope.data.posted={
			"name" : brewery.name,
			"url"  : brewery.url
		};
		$scope.data.breweries.push(brewery);
		brewery.created_at=new Date();
		if(config.breweries.update==="immediate" || force){
			rest.post($scope.data,"breweries",brewery.name,callback);
		}else{
			save.addOperation("New",$scope.update,brewery);
			result=true;
		}
		return result;
	}
};
},{}],14:[function(require,module,exports){
module.exports=function($scope,config,$location,rest,save,$document,modalService, $controller){
	$controller('BreweryAddController', {$scope: $scope});

	if(angular.isUndefined(config.activeBrewery)){
		$location.path("breweries/");
	}
	$scope.activeBrewery=config.activeBrewery;
	
	$scope._update=function(brewery,force,callback){
		var result=false;
		if(force || $scope.frmBrewery.$dirty){
			if(angular.isUndefined(brewery)){
				brewery=$scope.activeBrewery;
			}else{
				config.activeBrewery=angular.copy(brewery);
				config.activeBrewery.reference=brewery;
			}
			$scope.data.posted={
			    "name" : brewery.name,
			    "url"  : brewery.url
			};
			
			config.activeBrewery.reference.name=$scope.activeBrewery.name;
			config.activeBrewery.reference.url=$scope.activeBrewery.url;
			config.activeBrewery.reference.updated_at=new Date();
			
			if(config.breweries.update==="immediate" || force)
				rest.put(config.activeBrewery.id,$scope.data,"breweries",config.activeBrewery.name,callback);
			else{
				config.activeBrewery.reference.flag="Updated";
				save.addOperation("Updated",$scope.update,config.activeBrewery.reference);
				result=true;
			}
		}else{
			result=true;
		}
		return result;
	}
};
},{}],15:[function(require,module,exports){
module.exports=function($routeProvider,$locationProvider,$httpProvider) {
	//$httpProvider.defaults.useXDomain = true;
	//$httpProvider.defaults.withCredentials = true;
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$routeProvider.
	when('/', {
		templateUrl: 'templates/main.html',
		controller: 'MainController'
	}).when('/breweries', {
		templateUrl: 'templates/breweries/main.html',
		controller: 'BreweriesController'
	}).when('/breweries/refresh', {
		templateUrl: 'templates/breweries/main.html',
		controller: 'BreweriesController'
	}).when('/breweries/new', {
		templateUrl: 'templates/breweries/breweryForm.html',
		controller: 'BreweryAddController'
	}).when('/breweries/update', {
		templateUrl: 'templates/breweries/breweryForm.html',
		controller: 'BreweryUpdateController'
	}).when('/saves', {
		templateUrl: 'templates/saveMain.html',
		controller: 'SaveController'
	}).when('/config', {
		templateUrl: 'templates/config.html',
		controller: 'ConfigController'
	}).when('/beers', {
            templateUrl: 'templates/beers/main.html',
            controller: 'BeersController'
    }).when('/beers/refresh', {
            templateUrl: 'templates/beers/main.html',
            controller: 'BeersController'
    }).when('/beers/new', {
            templateUrl: 'templates/beers/beerForm.html',
            controller: 'BeerAddController'
    }).when('/beers/update', {
            templateUrl: 'templates/beers/beerForm.html',
            controller: 'BeerUpdateController'
    }).otherwise({
		redirectTo: '/'
	});
	if(window.history && window.history.pushState){
		$locationProvider.html5Mode(true);
	}
};
},{}],16:[function(require,module,exports){
module.exports=function($scope,config,$location){

	$scope.config=angular.copy(config);
	
	$scope.setFormScope=function(form){
		$scope.frmConfig=form;
	};
	
	$scope.update=function(){
		if($scope.frmConfig.$dirty){
			config.server=$scope.config.server;
			config.breweries=$scope.config.breweries;
            config.beers=$scope.config.beers;
		}
		$location.path("/");
	};
	$scope.cancel=function(){
		$location.path("/");
	};
};
},{}],17:[function(require,module,exports){
module.exports=function() {
	var factory={breweries:{},beers:{},server:{}};
	factory.activeBrewery=undefined;
	factory.breweries.loaded=false;
	factory.breweries.refresh="all";//all|ask
	factory.breweries.update="immediate";//deffered|immediate
    factory.activeBeers=undefined;
    factory.beers.loaded=false;
    factory.beers.refresh="all";//all|ask
    factory.beers.update="immediate";//deffered|immediate
	factory.server.privateToken="";
	factory.server.restServerUrl="http://localhost/rest-open-beer/";
	factory.server.force=false;
	return factory;
};
},{}],18:[function(require,module,exports){
var configApp=angular.module("ConfigApp", []).
controller("ConfigController", ["$scope","config","$location",require("./configController")]);
module.exports=configApp.name;
},{"./configController":16}],19:[function(require,module,exports){
module.exports=function($scope,$location,save,$window) {
	
	$scope.hasOperations=function(){
		return save.operations.length>0;
	};
	
	$scope.opCount=function(){
		return save.operations.length;
	};
	$scope.buttons=[{caption:"Okay"},{caption:"Annuler",dismiss:"true"}];
	
	var beforeUnload=function(e) {
		if($scope.hasOperations())
			return "Attention, vous allez perdre les modifications("+$scope.opCount()+") non enregistrées si vous continuez...";
	};
	angular.element($window).on('beforeunload',beforeUnload);
	
	$scope.$on("$destroy", function () {
		$window.removeEventListener('beforeunload', beforeUnload);
	});
	
};
},{}],20:[function(require,module,exports){
module.exports=function($scope,$location,save){
	$scope.data=save;
	$scope.allSelected=false;
	$scope.sortBy={field:"type",asc:false};
	
	$scope.selectAll=function(){
		angular.forEach($scope.data.operations, function(value, key) {
			value.selected=$scope.allSelected;
		});
	};
	
	$scope.saveAll=function(){
		save.executeAll();
	};
	
	$scope.setActive=function(operation){
		if(operation!==$scope.activeOperation)
			$scope.activeOperation=operation;
		else
			$scope.activeOperation=undefined;
	};
	$scope.isActive=function(operation){
		return operation==$scope.activeOperation;
	};
	
	$scope.countSelected=function(){
		var result=0;
		angular.forEach($scope.data.operations, function(value, key) {
			if(value.selected)
				result++;
		});
		return result;
	};
	
	$scope.remove=function(){
		save.operations=save.operations.filter(function(op){return !op.selected});
		return true;
	};
};
},{}],21:[function(require,module,exports){
module.exports=function($http,$resource,$location,restConfig,$sce) {
	var self=this;
	if(angular.isUndefined(this.messages))
		this.messages=new Array();
	
	this.getParams=function(){
		return '?token='+restConfig.server.privateToken+'&force='+restConfig.server.force;
	}
	this.headers={ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
	    	'Accept': 'application/json'
	    	};
	this.getAll=function(response,what){
		var request = $http({
		    method: "GET",
		    url: restConfig.server.restServerUrl+what+this.getParams(),
		    headers: {'Accept': 'application/json'},
		    callback: 'JSON_CALLBACK'
		});
		request.success(function(data, status, headers, config) {
			response[what]=data;
			restConfig[what].all=data;
			response.load=false;
		}).
		error(function(data, status, headers, config) {
			self.addMessage({type: "danger", content: "Erreur de connexion au serveur, statut de la réponse : "+status});
			console.log("Erreur de connexion au serveur, statut de la réponse : "+status);
		});
	};
	this.addMessage=function(message){
		content=$sce.trustAsHtml(message.content);
		self.messages.push({"type":message.type,"content":content});
	};
	
	this.post=function(response,what,name,callback){
		if(angular.isUndefined(callback))
			this.clearMessages();
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$http.defaults.headers.post["Accept"] = "application/json";

		var request = $http({
		    method: "POST",
		    url: restConfig.server.restServerUrl+what+this.getParams(),
		    data: response.posted,
		    headers: self.headers
		});
		request.success(function(data, status, headers, config) {
			self.addMessage(data.message);
			if(angular.isUndefined(callback)){
				$location.path("/"+what);
			}else{
				callback();
			}
		}).error(function(data, status, headers, config){
			self.addMessage({type: "warning", content:"Erreur de connexion au serveur, statut de la réponse : "+status+"<br>"+data.message});
		});
	};
	
	this.put=function(id,response,what,name,callback){
		if(angular.isUndefined(callback))
			this.clearMessages();
		$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
		$http.defaults.headers.post["Accept"] = "text/plain";
		var request = $http({
		    method: "PUT",
		    url: restConfig.server.restServerUrl+what+'/'+id+this.getParams(),
		    data: response.posted,
		    headers: self.headers
		});
		request.success(function(data, status, headers, config) {
			self.addMessage(data.message);
			if(angular.isUndefined(callback)){
				$location.path("/"+what);
			}else{
				callback();
			}
		}).error(function(data, status, headers, config){
			self.addMessage({type: "warning", content: "Erreur de connexion au serveur, statut de la réponse : "+status+"<br>"+data.message});
		});
	};
	
	this.remove=function(object,what,callback){
		if(angular.isUndefined(callback))
			this.clearMessages();
		var request = $http({
		    method: "DELETE",
		    url: restConfig.server.restServerUrl+what+'/'+object.id+this.getParams(),
		    headers: self.headers
		});
		request.success(function(data, status, headers, config) {
			self.addMessage(data.message);
			if(angular.isDefined(callback)){
				callback();
			}
		}).error(function(data, status, headers, config){
			self.addMessage({type: "warning", content: "Erreur de connexion au serveur, statut de la réponse : "+status+"<br>"+data.message});
		});
	};
	
	this.clearMessages=function(){
		self.messages.length=0;
	};
};
},{}],22:[function(require,module,exports){
module.exports=function(rest,config,$route){
	var self=this;
	this.dataScope={};
	this.operations=[];
	
	this.init=function(data){
		self.dataScope=data;
	};
	
	this.addOperation=function(type,operation,object){
		object.flag=type;
		self.operations.push({'type': type,'op': operation,'object': object});
	};
	
	this.execute=function(index){
		var callback;
		if(index+1<self.operations.length){
			callback=function(){
				self.operations.splice(index,1);
				self.execute(index);
			};
		}else{
			callback=function(){
				self.operations.length=0;
				config.breweries.loaded=false;
                config.beers.loaded=false;
				$route.reload();
			};
		}
		var operation=self.operations[index];
		operation.op(operation.object,true,callback);
	};
	
	this.executeAll=function(){
		rest.clearMessages();
		if(self.operations.length>0){
			self.execute(0);
		}else{
			config.breweries.loaded=false;
            config.beers.loaded=false;
			$route.reload();
		}
	}
};
},{}]},{},[6]);
