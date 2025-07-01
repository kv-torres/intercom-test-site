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
      source: 'Pit Mode UI'
    });
    alert("Sample event sent to Intercom!");
  }
}

// Load Visitor by default
window.addEventListener("load", loadVisitor);

function bootFromForm() {
  const app_id = document.getElementById("form_app_id").value;
  const user_id = document.getElementById("form_user_id").value;
  const email = document.getElementById("form_email").value;

  const settings = {
    app_id,
    api_base: "https://api-iam.intercom.io"
  };

  if (user_id) settings.user_id = user_id;
  if (email) settings.email = email;

  bootIntercom(settings);

  // Force show Messenger after boot
  setTimeout(() => {
    if (window.Intercom) {
      Intercom('show');
    }
  }, 500);
}

function updateFromForm() {
  const user_id = document.getElementById("form_user_id").value;
  const email = document.getElementById("form_email").value;

  if (window.Intercom) {
    Intercom('update', {
      user_id,
      email
    });
    Intercom('show'); // Ensure it's visible
    alert("User updated via Intercom!");
  } else {
    alert("Intercom is not loaded yet. Try booting first.");
  }
}
