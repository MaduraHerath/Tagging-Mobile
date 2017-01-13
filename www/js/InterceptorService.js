angular.module('taggingApp')
.factory('InterceptorService', function($rootScope){
	return{
		request: function(config){
			var token = $rootScope.token;

			if(!token || token == ""){
				return config;
			}

			config.headers['token'] = token;
			return config;
		}
	}
})