<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Method not allowed.']);
    exit;
}

function clean($value) {
    return trim(preg_replace('/[\r\n]+/', ' ', (string)$value));
}

$name = clean($_POST['name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$interest = clean($_POST['interest'] ?? '');
$message = trim($_POST['message'] ?? '');
$consent = ($_POST['consent'] ?? '') === 'yes';

if ($name === '' || !$email || $interest === '' || strlen($message) < 10 || !$consent) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please complete all required fields and consent to be contacted.']);
    exit;
}

if (strlen($name) > 120 || strlen($interest) > 180 || strlen($message) > 5000) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'One or more fields are too long.']);
    exit;
}

$to = 'heart2heartacad@gmail.com';
$subject = 'H2H Website Enquiry: ' . $interest;
$body = "Name: {$name}\nEmail: {$email}\nInterest: {$interest}\n\nMessage:\n{$message}\n";
$host = $_SERVER['HTTP_HOST'] ?? 'heart2heartenterprise.com';
$host = preg_replace('/[^a-zA-Z0-9.-]/', '', $host);
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "From: website@{$host}\r\n";
$headers .= "Reply-To: {$email}\r\n";

$sent = mail($to, $subject, $body, $headers);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Your enquiry could not be sent right now. Please email heart2heartacad@gmail.com directly.']);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Thank you. Your enquiry has been sent.']);
