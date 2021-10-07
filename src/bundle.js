
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function (App) {
    'use strict';

    App = App && Object.prototype.hasOwnProperty.call(App, 'default') ? App['default'] : App;

    const app = new App({
        target: document.getElementById('svelte')
    });

    return app;

}(App));
//# sourceMappingURL=bundle.js.map
