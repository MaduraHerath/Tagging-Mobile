angular.module('taggingApp')
.controller('ProductCtrl', function($rootScope, $scope, $ionicPopup, RetailService){
	$scope.product = {};
	$scope.uid = "";

	$rootScope.$on('TAG-DETECTED', function(event, data){
		console.log("Tag detected: " + data.uid);
		$scope.$apply(function(){
			$scope.uid = data.uid;
		})
	});

	$scope.search = function(){
		console.log("Searching...");

		if(isFinite($scope.query) && parseInt($scope.query) > -1){
			console.log("Search by id");
			RetailService.getProductById($scope.query).then(function(product){
				$scope.product = product;
				console.log($scope.product);
			}, function(error){
				console.log(error);
			});
		}
		else if($scope.query != ""){
			console.log("Search by name");
			RetailService.getProductByName($scope.query).then(function(product){
				$scope.product = product;
				console.log($scope.product);
			}, function(error){
				console.log(error);
			});
		}
	}

	$scope.tagProduct = function(){
		RetailService.tagProduct($scope.product.id, $scope.uid).then(function(result){
			console.log(JSON.stringify(result));
		}, function(err){
			console.log(JSON.stringify(err));
		});
	}
});