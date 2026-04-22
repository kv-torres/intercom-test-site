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
      var w=window;var ic=w.Intercom;
      var d=document;var i=function(){i.c(arguments)};i.q=[];
      i.c=function(args){i.q.push(args)};
      w.Intercom=i;
      var l=function(){
        var s=d.createElement('script');
        s.type='text/javascript';s.async=true;
        s.src='https://widget.intercom.io/widget/ex23qz7s';
        var x=d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s,x);
      };
      if(document.readyState==='complete'){l();}
      else if(w.attachEvent){w.attachEvent('onload',l);}
      else{w.addEventListener('load',l,false);}
    })();
  }
}

function loadVisitor() {
  bootIntercom({
    app_id: "ex23qz7s",
    api_base: "https://api-iam.intercom.io"
  });
}

function loadUser() {
  bootIntercom({
    app_id: "ex23qz7s",
    api_base: "https://api-iam.intercom.io",
    user_id: "user_001",
    name: "Karla Test User",
    email: "karla+test@intercom.com",
    created_at: Math.floor(Date.now() / 1000)
  });
}

function shutdown() {
  if (window.Intercom) {
    Intercom('shutdown');
    alert("Intercom shut down.");
  }
}

function triggerEvent() {
  if (window.Intercom) {
    Intercom('trackEvent', 'button-clicked', {
      source: 'HLYBWH Site'
    });
    alert("Sample event sent to Intercom!");
  }
}

function openMessenger() {
  if (window.Intercom) {
    Intercom('show');
  }
}

// Product Tours
function startProductTour() {
  if (window.Intercom) {
    Intercom('startTour', 1);
    Intercom('trackEvent', 'product-tour-started', { tour: 'default' });
  } else {
    alert("Intercom is not loaded yet.");
  }
}

function startCustomTour() {
  var tourId = document.getElementById('tour_id').value;
  if (!tourId) {
    alert("Enter a Tour ID first.");
    return;
  }
  if (window.Intercom) {
    Intercom('startTour', parseInt(tourId, 10));
    Intercom('trackEvent', 'product-tour-started', { tour_id: tourId });
  } else {
    alert("Intercom is not loaded yet.");
  }
}

// Theme Picker
function setTheme(color) {
  document.documentElement.style.setProperty('--accent', color);
  var glow = color + '66';
  document.documentElement.style.setProperty('--accent-glow', glow);

  document.querySelectorAll('.theme-dot').forEach(function(dot) {
    dot.classList.remove('active');
    if (dot.style.background === color || dot.style.backgroundColor === color) {
      dot.classList.add('active');
    }
  });
}

// Test Panel Toggle
function togglePanel() {
  document.getElementById('testPanel').classList.toggle('open');
}

// Boot/Update from form
function bootFromForm() {
  var app_id = document.getElementById("form_app_id").value;
  var user_id = document.getElementById("form_user_id").value;
  var email = document.getElementById("form_email").value;

  var settings = {
    app_id: app_id,
    api_base: "https://api-iam.intercom.io"
  };

  if (user_id) settings.user_id = user_id;
  if (email) settings.email = email;

  bootIntercom(settings);

  setTimeout(function() {
    if (window.Intercom) {
      Intercom('show');
    }
  }, 500);
}

function updateFromForm() {
  var user_id = document.getElementById("form_user_id").value;
  var email = document.getElementById("form_email").value;

  if (window.Intercom) {
    Intercom('update', {
      user_id: user_id,
      email: email
    });
    Intercom('show');
    alert("User updated via Intercom!");
  } else {
    alert("Intercom is not loaded yet. Try booting first.");
  }
}

// Load Visitor by default
window.addEventListener("load", loadVisitor);
