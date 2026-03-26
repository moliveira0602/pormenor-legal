<?php
header('Content-Type: application/json');

// Permitir pedidos da mesma origem (ajustar se necessário)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
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

// Obter dados do corpo da requisição (JSON)
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    // Tentar obter via $_POST tradicional se JSON falhar
    $input = $_POST;
}

// Destinatário definido pelo utilizador
$to = 'marketing.pormenor@gmail.com';

// Assunto
$subject = isset($input['subject']) ? 'Novo Contacto Site: ' . $input['subject'] : 'Novo Contacto via Website';

// Campos comuns
$name = $input['name'] ?? 'N/A';
$email = $input['email'] ?? 'N/A';
$phone = $input['phone'] ?? 'N/A';
$message = $input['message'] ?? 'N/A';

// Campos específicos do COC ou outros formulários
$vin = $input['vin'] ?? '';
$plate = $input['plate'] ?? '';
$brand = $input['brand'] ?? '';

// Construir corpo do email
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

// Headers
$headers = "From: no-reply@pormenor.etos.pt\r\n"; // Usar um email do domínio para evitar spam
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Enviar email
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Email enviado com sucesso.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Falha ao enviar email.']);
}
?>
