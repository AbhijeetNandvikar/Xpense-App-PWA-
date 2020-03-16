if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then((reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ');
    }).catch((error) => {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }