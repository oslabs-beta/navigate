(function (App) {
    'use strict';

    App = App && Object.prototype.hasOwnProperty.call(App, 'default') ? App['default'] : App;

    const app = new App({
        target: document.getElementById('svelte')
    });

    return app;

}(App));
