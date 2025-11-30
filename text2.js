
// Simplified login + Google sign-in handler
const USERS_JSON = 'user.json';

const showMsg = (msg) => {
  const el = document.getElementById('user-info');
  if (el) el.textContent = msg;
};

const fetchUsers = async () => {
  const r = await fetch(USERS_JSON);
  return await r.json();
};

const loginUser = (name) => {
  localStorage.setItem('partnerLoggedIn', 'true');
  localStorage.setItem('currentUser', name.toUpperCase());
  window.location.href = 'dash.html';
};

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim().toUpperCase();
  const password = document.getElementById('password').value;
  try {
    const users = await fetchUsers();
    const user = users.find(u => (u.Name || '').toUpperCase() === username);
    if (user && password === '1234') loginUser(username);
    else alert('Invalid username or password!');
  } catch (err) {
    console.error(err);
    alert('Failed to load user data.');
  }
});

// Handle Google credential response
async function handleCredentialResponse(resp) {
  try {
    const data = (typeof jwt_decode === 'function') ? jwt_decode(resp.credential) : parseJwt(resp.credential);
    const name = (data.name || '').toUpperCase();
    const email = (data.email || '').toLowerCase();
    showMsg(`Hello, ${data.name || 'User'}`);

    const users = await fetchUsers();
    const matched = users.find(u => (u.Name || '').toUpperCase() === name || (u.email || '').toLowerCase() === email);
    if (matched) return loginUser(matched.Name);

    // not found — offer to register locally
    if (confirm(`${data.name} not found. Register and continue?`)) {
      localStorage.setItem('currentUser', name || data.email || 'guest');
      localStorage.setItem('partnerLoggedIn', 'true');
      localStorage.setItem('currentUserEmail', email || '');
      window.location.href = 'dash.html';
    }
  } catch (err) {
    console.error('Google signin error', err);
    alert('Login failed.');
  }
}

function parseJwt(token = '') {
  try {
    const b = token.split('.')[1];
    return JSON.parse(decodeURIComponent(atob(b).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
  } catch { return {}; }
}

// Init Google Identity if available
document.addEventListener('DOMContentLoaded', () => {
  const CLIENT_ID = document.getElementById('g_id_onload')?.dataset.client_id
    || '699248146280-cp3dp3ncapj2id0jtd01de7tbdc3afgv.apps.googleusercontent.com';
  if (window.google?.accounts?.id) {
    google.accounts.id.initialize({ client_id: CLIENT_ID, callback: handleCredentialResponse });
    const target = document.querySelector('.g_id_signin');
    if (target) google.accounts.id.renderButton(target, { theme: 'outline', size: 'large' });
    google.accounts.id.prompt();
  }
});
