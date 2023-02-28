const netlify = angular.module('netlifySite',["ngRoute"]);

netlify.config (function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',

    })
});



netlify.controller('netlifyControl', function($scope){


netlifyIdentity.on('init', () => {
    initUser = netlifyIdentity.currentUser();
});

netlifyIdentity.on('login', () => {

    if (initUser == null) {
        window.location.replace('home')
    }
    netlifyIdentity.close();
});

netlifyIdentity.on('logout', () => {
    netlifyIdentity.close();
    window.location.replace('/');
});

});