<?php

//Настройки
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

file_put_contents(__DIR__."/addregion.json", '');

// // ВСЕ НИЖЕ ДЛЯ ТЕСТА
// echo getJson('https://7384.ru/geo.json');
// // Функция запроса данных
// function getJson($url){
//     $obj = json_decode(file_get_contents("$url"),true);
//     foreach($obj as $key => $value) {
//         $new_key = '111';
//         $new_title = '222';
//         echo "<b>".$key."</b><br> ";
//         $obj[$new_key] = $value;
//         unset($obj[$key]);
//         $obj[$new_key][$new_title] = '333';
//         $new_json = json_encode($obj);
//         file_put_contents('updated_data.json', $new_json);
//         // writeLogFile(addRegion($key));
//       };
// };
// // ТЕСТ ЗАКОНЧЕН


// getJson('https://7384.ru/geo.json');
// getJson('https://7384.ru/geo-area.json');

// Функция запроса данных
function getJson($url){
    $obj = json_decode(file_get_contents("$url"),true);
    foreach($obj as $key => $value) {
        $new_dump = json_decode(addRegion($key), true);
        $new_key = $new_dump['id'];
        $obj[$new_key] = $value;
        unset($obj[$key]);
        $new_title = $new_dump['title'];
        $obj[$new_key]['title'] = $new_title;
        $new_json = json_encode($obj);
        file_put_contents('updated_data.json', $new_json);
      };
};

//Функция добавления региона
function addRegion($region) {
    $ch = curl_init("https://api.lk-test.allstreets.ru/district");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
            'cityId' => 1,
            'title' => "{$region}v4444",
            'color' => '#ddd',
        ), JSON_UNESCAPED_UNICODE));
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    $resultQuery = curl_exec($ch);
        curl_close($ch);
        return $resultQuery;
};

//Функция логирования всех добавленных значений
function writeLogFile($string){
    $log_file_name = __DIR__."/addregion.json";
        file_put_contents($log_file_name, print_r($string, true)."\r\n", FILE_APPEND);
}

echo 'Hi';
?>