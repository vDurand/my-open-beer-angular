module.exports=function($scope,rest,$timeout,$location,config,$route,save) {
    $scope.data={load:false};
    $scope.data.associated = false;
    $scope.sortBy={field:"name",asc:false};
    $scope.messages=rest.messages;

    if(config.breweries.refresh==="all" || !config.breweries.loaded){
        $scope.data.load=true;
        rest.getAll($scope.data,"breweries");
        config.breweries.loaded=true;
    }else{
        $scope.data["breweries"]=config.breweries.all;
    }
    if(config.beers.refresh==="all" || !config.beers.loaded){
        $scope.data.load=true;
        rest.getAll($scope.data,"beers");
        config.beers.loaded=true;
    }else{
        $scope.data["beers"]=config.beers.all;
    }
    $scope.getEachBeer = function(){
        if($scope.data.breweries != undefined && $scope.data.beers != undefined && !$scope.data.associated){
             for (var i = 0; i < $scope.data.breweries.length; i++){
                 $scope.data.breweries[i].hasBeer = false;
                 $scope.data.breweries[i].beers = [];
                 for(var j = 0; j< $scope.data.beers.length; j++){
                     if($scope.data.beers[j].idBrewery == $scope.data.breweries[i].id){
                         $scope.data.breweries[i].hasBeer = true;
                         $scope.data.breweries[i].beers.push($scope.data.beers[j]);
                     }
                 }
             }
             $scope.data.associated = true;
        }
    };

    $scope.allSelected=false;

    $scope.selectAll=function(){
        /*angular.forEach($scope.data.beers, function(value, key) {
            value.selected=$scope.allSelected;
        });*/
    };

    $scope.refresh=function(){
        save.executeAll();
    }

    $scope.showUpdate=function(){
        return angular.isDefined($scope.activeBeer);
    };

    $scope.showDetail=function(){
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
        /*angular.forEach($scope.data.beers, function(value, key) {
            if(value.selected && !value.deleted)
                result++;
        });*/
        return result;
    };

    $scope.hideDeleted=function(){
        $scope.mustHideDeleted=!$scope.mustHideDeleted;
        /*angular.forEach($scope.data.beers, function(value, key) {
            if($scope.mustHideDeleted){
                if(value.flag==='Deleted')
                    value.deleted=true;
            }else{
                value.deleted=false;
            }
        });*/
    };

    $scope.edit=function(beer){
        if(angular.isDefined(beer))
            $scope.activeBeer=beer;
        config.activeBeer=angular.copy($scope.activeBeer);
        config.activeBeer.reference=$scope.activeBeer;
        $location.path("beers/update");
    }

    $scope.display=function(beer){
        if(angular.isDefined(beer))
            $scope.activeBeer=beer;
        config.activeBeer=angular.copy($scope.activeBeer);
        config.activeBeer.reference=$scope.activeBeer;
        $location.path("beers/detail");
    }

    $scope.update=function(beer,force,callback){
        if(angular.isUndefined(beer)){
            beer=$scope.activeBeer;
        }
        $scope.data.posted={ "beer" : {
            "name" : beer.name,
            "description"  : beer.description,
            "abv" : beer.abv,
            "idBrewery" : beer.idBrewery
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
        /*angular.forEach($scope.data.beers, function(value, key) {
            if(value.selected){
                $scope.removeOne(value);
            }
        });*/
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
    $scope.fullBeerList = function(){
        $location.path("beers");
    }
};