
window.apiUrl = 'https://dev.thepanelau.com/api';
window.storageUrl = 'https://admin.thepanelau.com/storage';

if (window.location.hostname === 'dev-fe.thepanelau.com' && window.location.pathname === '/payment') {
    window.location.href = 'https://dev-app.thepanelau.com/payment';
}