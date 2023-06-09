<?php

/* https://api.telegram.org/bot5546941826:AAF-xuOpCeHepRsfCEnn6ExCuqoos8XUgrM/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$feedback__name = $_POST['feedback__name'];
$feedback__tel = $_POST['feedback__tel'];
$feed__back_nft_price = $_POST['feed__back_nft_price'];
$feedback__crypto = $_POST['feedback__crypto'];
$token = "1";
$chat_id = "1";
$arr = array(
  'Name: ' => $feedback__name,
  'Tel: ' => $feedback__tel,
  'Crypto: ' => $feedback__crypto,
);

foreach($arr as $key => $value) {
  $txt = $txt."<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  echo "ok";
} else {
  echo "Error";
}
?>
