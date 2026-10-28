<?php
// XAMPP defaults: user "root", empty password
$pdo = null;
try {
    $pdo = new PDO('mysql:host=localhost;dbname=dci_srms;charset=utf8mb4', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Database connection failed. Is MySQL running and dci_srms imported?']);
    exit;
}