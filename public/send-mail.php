<?php
// Ensure we output JSON even on fatal errors
register_shutdown_function(function() {
    $error = error_get_last();
    if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode([
            'success' => false,
            'error' => 'Fatal PHP error',
            'details' => $error['message'] ?? 'Unknown fatal error'
        ]);
    }
});

header('Content-Type: application/json');

ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/mail-errors.log');
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    $input = $_POST;
}

$to = 'marketing.pormenor@gmail.com';
$subject = isset($input['subject']) ? 'Novo Contacto Site: ' . $input['subject'] : 'Novo Contacto via Website';

$name = $input['name'] ?? 'N/A';
$email = $input['email'] ?? 'N/A';
$phone = $input['phone'] ?? 'N/A';
$message = $input['message'] ?? 'N/A';

$vin = $input['vin'] ?? '';
$plate = $input['plate'] ?? '';
$brand = $input['brand'] ?? '';

$body = "Recebeu um novo pedido de contacto através do site.\n\n";
$body .= "--- Detalhes do Contacto ---\n";
$body .= "Nome: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Telefone: " . $phone . "\n";
$body .= "Assunto: " . ($input['subject'] ?? 'Geral') . "\n";

if (!empty($vin)) {
    $body .= "VIN: " . $vin . "\n";
}
if (!empty($plate)) {
    $body .= "Matrícula: " . $plate . "\n";
}
if (!empty($brand)) {
    $body .= "Marca: " . $brand . "\n";
}

$body .= "\n--- Mensagem ---\n";
$body .= $message . "\n";
$body .= "\n--------------------------\n";
$body .= "Enviado em: " . date('Y-m-d H:i:s') . "\n";

$errors = [];

try {
    // Try PHPMailer first (if available)
    if (file_exists(__DIR__ . '/phpmailer/PHPMailer.php')) {
        require_once __DIR__ . '/phpmailer/PHPMailer.php';
        require_once __DIR__ . '/phpmailer/SMTP.php';
        require_once __DIR__ . '/phpmailer/Exception.php';
        
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        
        // Try SMTP settings from config file or environment
        $smtpConfig = null;
        if (file_exists(__DIR__ . '/mail-config.php')) {
            $smtpConfig = require __DIR__ . '/mail-config.php';
        }
        
        $smtpHost = $smtpConfig['host'] ?? getenv('SMTP_HOST') ?: getenv('MAIL_HOST');
        $smtpUser = $smtpConfig['username'] ?? getenv('SMTP_USER') ?: getenv('MAIL_USER');
        $smtpPass = $smtpConfig['password'] ?? getenv('SMTP_PASS') ?: getenv('MAIL_PASS');
        $smtpPort = $smtpConfig['port'] ?? getenv('SMTP_PORT') ?: 587;
        
        if ($smtpHost && $smtpUser && $smtpPass) {
            $mail->isSMTP();
            $mail->Host = $smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $smtpUser;
            $mail->Password = $smtpPass;
            $mail->SMTPSecure = $smtpConfig['encryption'] ?? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = (int)$smtpPort;
        }
        
        $mail->setFrom('info@pormenor.pt', 'Pormenor Website Contact');
        $mail->Sender = 'info@pormenor.pt';
        $mail->addAddress($to);
        $mail->addReplyTo($email, $name);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AltBody = $body;
        
        if (!empty($input['attachments']) && is_array($input['attachments'])) {
            foreach ($input['attachments'] as $attachment) {
                if (isset($attachment['data']) && isset($attachment['name'])) {
                    $data = $attachment['data'];
                    if (strpos($data, ';base64,') !== false) {
                        list(, $data) = explode(';base64,', $data);
                    }
                    $decodedData = base64_decode($data);
                    if ($decodedData !== false) {
                        $mail->addStringAttachment($decodedData, $attachment['name'], PHPMailer\PHPMailer\PHPMailer::ENCODING_BASE64, $attachment['type'] ?? '');
                    }
                }
            }
        }
        
        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Email enviado com sucesso.']);
        exit;
    }
} catch (Exception $e) {
    $errors[] = 'PHPMailer error: ' . $e->getMessage();
} catch (Error $e) {
    $errors[] = 'PHPMailer error: ' . $e->getMessage();
}

// Fallback to mail() function
$sent = false;

try {
    $headers = "From: info@pormenor.pt\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    $mailResult = @mail($to, $subject, $body, $headers, "-finfo@pormenor.pt");
    if ($mailResult) {
        $sent = true;
    } else {
        $errors[] = "mail() returned false";
    }
    
    // Fallback to sendmail directly
    if (!$sent) {
        $sendmailPath = ini_get('sendmail_path');
        $sendmailBinary = !empty($sendmailPath) ? trim(explode(' ', $sendmailPath)[0]) : '/usr/sbin/sendmail';
        
        if (!file_exists($sendmailBinary)) {
            $errors[] = "sendmail binary not found";
        } else {
            $sendmailInput = "To: {$to}\r\nSubject: {$subject}\r\n{$headers}\r\n\r\n{$body}";
            $proc = @popen($sendmailBinary . ' -t -i', 'w');
            if ($proc) {
                fwrite($proc, $sendmailInput);
                $exitCode = pclose($proc);
                if ($exitCode === 0) {
                    $sent = true;
                } else {
                    $errors[] = "sendmail exit code: " . $exitCode;
                }
            } else {
                $errors[] = "Failed to open sendmail pipe";
            }
        }
    }
} catch (Exception $e) {
    $errors[] = "Exception: " . $e->getMessage();
}

// Write to queue log if all methods fail
if (!$sent) {
    $logEntry = date('Y-m-d H:i:s') . " - Queue entry (all methods failed)\n";
    $logEntry .= "To: {$to}\nSubject: {$subject}\nName: {$name}\nEmail: {$email}\n";
    $logEntry .= "Errors: " . implode('; ', $errors) . "\n";
    $logEntry .= "---\n\n";
    file_put_contents(__DIR__ . '/mail-queue.log', $logEntry, FILE_APPEND | LOCK_EX);
}

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Email enviado com sucesso.']);
} else {
    http_response_code(500);
    error_log("Mail send failed: " . implode('; ', $errors));
    echo json_encode([
        'success' => false, 
        'error' => 'Falha ao enviar email. Tente usar os contactos diretos.',
        'details' => $errors
    ]);
}
?>