<?php 
$mail = $_POST['mail'];
$ua =  $_SERVER["HTTP_USER_AGENT"];

$success = mail($mail,'Subscribe NFT Check',
'Здравствуйте!'."\n".
'Вы указали почту для связи.: '.$mail."\n".
'Ваш браузер: '.$ua);

echo $success;
echo $ua;

if ($success) {
    echo "ok";
  } else {
    echo "Error";
  }
?>