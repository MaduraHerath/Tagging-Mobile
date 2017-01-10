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
		var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJPSyIsInVuYW1lIjoiam9obkBiYWJ5Iiwic3RhZmZfaWQiOjEwLCJmbmFtZSI6IkpvaG4iLCJsbmFtZSI6IlNwaXR6ZXIiLCJ0eXBlIjoiY3NoIiwiYnJhbmNoSWQiOjEsImJyYW5jaE5hbWUiOiJLT0hVV0FMQSIsImlhdCI6MTQ4NDAyMTU5MiwiaXNzIjoidDM1LWFwaSJ9.ghqSl9ky6x2BWXna33l3yDVnX8tYtXKmSKyt3l-D7fo";

		$http.get(baseUrl + 'api/product/find/name/' + name, { headers: { token: token }}).then(function(response){
			console.log(response);
			response.data[0].image = baseUrl + response.data[0].image;
			deferred.resolve(response.data[0]);
		}, function(err){
			deferred.reject({ status: 'ERROR', error: err });
		});

		return deferred.promise;
	}

	o.tagProduct = function(prodId, uid){
		var deferred = $q.defer();
		var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJPSyIsInVuYW1lIjoiam9obkBiYWJ5Iiwic3RhZmZfaWQiOjEwLCJmbmFtZSI6IkpvaG4iLCJsbmFtZSI6IlNwaXR6ZXIiLCJ0eXBlIjoiY3NoIiwiYnJhbmNoSWQiOjEsImJyYW5jaE5hbWUiOiJLT0hVV0FMQSIsImlhdCI6MTQ4NDAyMTU5MiwiaXNzIjoidDM1LWFwaSJ9.ghqSl9ky6x2BWXna33l3yDVnX8tYtXKmSKyt3l-D7fo";

		$http.post(baseUrl + 'api/product/insert/tag',{ prodId: prodId, uid: uid }, { headers: { token: token }}).then(function(response){
			console.log(JSON.stringify(response));
			deferred.resolve({ status: 'SUCCES' });
		}, function(err){
			deferred.reject({ status: 'ERROR', error: err });
		});

		return deferred.promise;
	}

	return o;
});