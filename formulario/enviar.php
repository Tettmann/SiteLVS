<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $telefone = $_POST['telefone'];
    $email = $_POST['email'];
    $cep = $_POST['cep'];
    $veiculo = $_POST['veiculo'];
    $modelo_veiculo = $_POST['modelo_veiculo'];
    $ano_veiculo = $_POST['ano_veiculo'];
    $mensagem = $_POST['mensagem'];
    $curriculo = $_FILES['curriculo'];

    $mail = new PHPMailer(true);

    try {

        $mail->CharSet = 'UTF-8'; // <-- Adicione isso aqui


        $mail->setFrom('expansaoexpress@expansaoexpress.com.br', 'Expansão Express');
        $mail->addReplyTo($email, $nome);
        $mail->addAddress('recrutamentoeselecao@contactaspecialist.com.br', 'Expansão Express');
        if (!empty($curriculo['tmp_name']) && is_uploaded_file($curriculo['tmp_name'])) {
        $mail->addAttachment($curriculo['tmp_name'], $curriculo['name']);
        }

        $mail->isHTML(true);
        $mail->Subject = 'Novo currículo recebido';
        $mail->Body = "
            <strong>Nome:</strong> $nome<br>
            <strong>Telefone:</strong> $telefone<br>
            <strong>E-mail:</strong> $email<br>
            <strong>CEP:</strong> $cep<br>
            <strong>Veículo:</strong> $veiculo<br>
            <strong>Modelo do veículo:</strong> $modelo_veiculo<br>
            <strong>Ano do veículo:</strong> $ano_veiculo<br>
            <strong>Mensagem:</strong> $mensagem
        ";

        $mail->send();

        header("Location: /form1/obrigado");
        exit;
    } catch (Exception $e) {
        echo "Erro ao enviar: {$mail->ErrorInfo}";
    }
}

