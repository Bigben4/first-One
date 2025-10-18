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
    // call mock backend
    fetch('/api/login', {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email, password: pw})
    }).then(r => r.json()).then(res => {
      if(res && res.ok){
        showMessage('Logged in — welcome back!', 'success');
      } else {
        showMessage(res && res.error ? res.error : 'Login failed', 'error');
      }
    }).catch(()=> showMessage('Network error during login', 'error'));
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
    fetch('/api/signup', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({name, email, password: pw})
    }).then(r => r.json()).then(res => {
      if(res && res.ok){
        showMessage('Account created. You can now log in.', 'success');
        setTimeout(() => switchTo('login'), 900);
      } else {
        showMessage(res && res.error ? res.error : 'Signup failed', 'error');
      }
    }).catch(()=> showMessage('Network error during signup', 'error'));
  });

  // initial state
  switchTo('login');

  // Eye-button: reveal password for 2 seconds when tapped
  document.querySelectorAll('.eye-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if(!input) return;
      const prevType = input.type;
      input.type = 'text';
      // optionally add a small pulse animation
      btn.classList.add('active');
      setTimeout(() => {
        input.type = prevType;
        btn.classList.remove('active');
      }, 2000);
    });
  });
})();
