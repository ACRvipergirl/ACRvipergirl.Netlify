const netlify = angular.module('netlifySite',["ngRoute"]);

netlify.config (function($routeProvider) {
    $routeProvider
    .when('/index', {
        templateUrl: 'index.html',
        controller: 'FirstController'
    })
    .when('/home', {
        templateUrl: 'home.html',
        controller: 'SecondController'
    })
});



netlify.controller('netlifyControl', function($scope){


$scope.netlifyIdentity.on('init', () => {
    initUser = netlifyIdentity.currentUser();
});

$scope.netlifyIdentity.on('login', () => {

    if (initUser == null) {
        window.location.replace('home')
    }
    netlifyIdentity.close();
});

$scope.netlifyIdentity.on('logout', () => {
    netlifyIdentity.close();
    window.location.replace('/');
});

});