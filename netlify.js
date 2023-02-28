netlifyIdentity.on('init', () => {
    initUser = netlifyIdentity.currentUser();
});

netlifyIdentity.on('login', () => {
    debugger;
    if (initUser == null) {
        window.location.replace('home')
    }
    netlifyIdentity.close();
});

netlifyIdentity.on('logout', () => {
    netlifyIdentity.close();
    window.location.replace('/');
});