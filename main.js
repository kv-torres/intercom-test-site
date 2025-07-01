function bootIntercom(settings) {
  if (window.Intercom) {
    Intercom('shutdown');
    setTimeout(() => {
      window.intercomSettings = settings;
      Intercom('boot', settings);
    }, 100);
  } else {
    window.intercomSettings = settings;
    (function(){
      var w = window;
      var ic = w.Intercom;
      var d = document;
      var i = function() { i.c(arguments); };
      i.q = [];
      i.c = function(args) { i.q.push(args); };
      w.Intercom = i;
      var l = function() {
        var s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://widget.intercom.io/widget/' + settings.app_id; // ✅ dynamic app_id
        var x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      };
      if (document.readyState === 'complete') { l(); }
      else if (w.attachEvent) { w.attachEvent('onload', l); }
      else { w.addEventListener('load', l, false); }
    })();
  }
}
