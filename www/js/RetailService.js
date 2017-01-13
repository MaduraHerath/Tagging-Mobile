angular.module('taggingApp')
.service('RetailService', function($http, $q, config){
	var o = {};
	var baseUrl = config.locals.baseUrl;
	var prodId = "";

	o.getProductById = function(id){
		var deferred = $q.defer();
		var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJPSyIsInVuYW1lIjoiY29kb25AYmFieSIsInN0YWZmX2lkIjoyLCJmbmFtZSI6Ik1pY2hhZWwiLCJsbmFtZSI6IkNvcm9sZW9uZSIsInR5cGUiOiJtZ3IiLCJpYXQiOjE0Nzc3NzE1MTUsImlzcyI6InQzNS1hcGkifQ.zWwwDIG7vHAAradjykRAns3L1_6Ky3uXI1vDNX6d9qY";

		$http.get(baseUrl + 'api/product/find/id/' + id, { headers: { token: token }}).then(function(response){
			console.log(response);
			prodId = response.data.id;
			response.data[0].image = baseUrl + response.data[0].image;
			deferred.resolve(response.data[0]);
		}, function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	o.getProductByName = function(name){
		var deferred = $q.defer();

		$http.get(baseUrl + 'api/product/find/name/' + name).then(function(response){
			console.log(response);
			response.data.map(function(product){
				product.image = baseUrl + product.image;
			});
			console.log(response.data);
			deferred.resolve(response.data);
		}, function(err){
			deferred.reject({ status: 'ERROR', error: err });
		});

		return deferred.promise;
	}

	o.tagProduct = function(prodId, uid){
		var deferred = $q.defer();

		$http.post(baseUrl + 'api/product/insert/tag',{ prodId: prodId, uid: uid }).then(function(response){
			console.log(response);
			deferred.resolve({ status: 'SUCCES' });
		}, function(err){
			deferred.reject({ status: 'ERROR', error: err });
		});

		return deferred.promise;
	}

	return o;
});