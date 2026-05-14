<?php
// SMTP Configuration - Copy this file to mail-config.php and fill in your credentials
// This file should NOT be committed to version control

return [
    'host' => 'smtp.gmail.com',           // SMTP server (Gmail, Outlook, etc.)
    'username' => 'your-email@gmail.com',  // Your email address
    'password' => 'your-app-password',     // App password (not regular password)
    'port' => 587,                         // 587 for TLS, 465 for SSL
    'encryption' => 'tls',                 // 'tls' or 'ssl'
];