angular.module('taggingApp')
.controller('ProductCtrl', function($rootScope, $scope, $state, $ionicPopup, $ionicModal, RetailService, LoginService, ionicToast){
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
			RetailService.getProductByName($scope.query).then(function(products){
				if(products.length == 1){
					$scope.product = products[0];
					console.log($scope.product);
				}
				else{
					$scope.products = products;
					$scope.productModal.show();
				}
			}, function(error){
				console.log(error);
			});
		}
	}

	$scope.select = function(prodIndex){
		$scope.product = $scope.products[prodIndex];
		$scope.productModal.hide();
	}

	$scope.tagProduct = function(){
		if($scope.product.name == undefined){
			ionicToast.show('Select a product first', 'bottom', false, 2500);
			return;
		}
		else if($scope.uid == ""){
			ionicToast.show('Scan a tag before tagging', 'bottom', false, 2500);
			return;
		}

		RetailService.tagProduct($scope.product.id, $scope.uid).then(function(result){
			ionicToast.show('Product tagged...', 'bottom', false, 2500);
			console.log(result);
		}, function(err){
			ionicToast.show('Taggin failed...', 'bottom', false, 2500);
			console.log(err);
		});
	}

	$scope.logout = function(){
		LoginService.logOut();
		$state.go('login');
	}

	$scope.productModal = $ionicModal.fromTemplateUrl('templates/products.html',{
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal){
		$scope.productModal = modal;
	});

	$scope.$on('$destroy', function() {
    	$scope.productModal.remove();
  	});
});