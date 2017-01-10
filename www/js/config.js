angular.module('taggingApp')
.provider('config', function(){
	this.locals = {};

	this.$get = function(){
		return this;
	}
})