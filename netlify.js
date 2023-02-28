netlifyIdentity.on('init', () => {
    initUser = netlifyIdentity.currentUser();
});
netlifyIdentity.on('login', () => {
    if (initUser == null) {
        window.location.replace('landing')
    }
    netlifyIdentity.close();
});
netlifyIdentity.on('logout', () => {
    netlifyIdentity.close();
    window.location.replace('/')
;
});