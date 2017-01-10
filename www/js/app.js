angular.module('taggingApp', ['ionic'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

      console.log("Standing by for NFC...");

      nfc.addTagDiscoveredListener(function(event){
        var tagUid = nfc.bytesToHexString(event.tag.id).toUpperCase();
        $rootScope.$broadcast('TAG-DETECTED', { uid: tagUid });

      }, function(success){
        console.log("Listening for tags...");
      });

      nfc.addNdefListener(function(event){
        var tagUid = nfc.bytesToHexString(event.tag.id).toUpperCase();
        $rootScope.$broadcast('TAG-DETECTED', { uid: tagUid });

      }, function(success){
        console.log("Listening for NDEF...");
      }, function(error){
        console.log("NDEF listener failure...");
        console.log(error);
      });

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, configProvider) {
  configProvider.locals.baseUrl = "http://ec2-54-186-114-41.us-west-2.compute.amazonaws.com:3000/";

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true
  })
  .state('search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'ProductCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/search');
});
