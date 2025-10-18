// Toggle between login and signup forms and handle basic client-side messages
(function(){
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const message = document.getElementById('message');

  function showMessage(text, type){
    message.textContent = text || '';
    message.className = 'message';
    if(type === 'success') message.classList.add('success');
    if(type === 'error') message.classList.add('error');
  }

  function switchTo(target){
    if(target === 'signup'){
      signupForm.classList.add('active');
      signupForm.setAttribute('aria-hidden','false');
      loginForm.classList.remove('active');
      loginForm.setAttribute('aria-hidden','true');
      showMessage('', '');
    } else {
      loginForm.classList.add('active');
      loginForm.setAttribute('aria-hidden','false');
      signupForm.classList.remove('active');
      signupForm.setAttribute('aria-hidden','true');
      showMessage('', '');
    }
  }

  // wire up switch links
  document.querySelectorAll('[data-switch]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const t = a.getAttribute('data-switch');
      switchTo(t);
    });
  });

  // simple validation + fake submit handlers
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pw = document.getElementById('loginPassword').value;
    if(!email || !pw){
      showMessage('Please enter email and password.', 'error');
      return;
    }
    // fake success
    showMessage('Logged in — welcome back!', 'success');
    // In real app: send fetch to server here
  });

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const pw = document.getElementById('signupPassword').value;
    if(!name || !email || !pw){
      showMessage('Please complete all fields to sign up.', 'error');
      return;
    }
    // fake success
    showMessage('Account created. You can now log in.', 'success');
    // switch to login after a short delay
    setTimeout(() => switchTo('login'), 900);
  });

  // initial state
  switchTo('login');
})();
