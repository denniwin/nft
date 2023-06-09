<?php
    //Настройки
    ini_set('error_reporting', E_ALL);
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);

    //Проверяем файл, если ошибка - информируем.
    if (isset($_FILES['file'])) {
        $target_file = __DIR__ . basename($_FILES['file']['name']);
        if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
        //   echo "The file " . basename($_FILES['file']['name']) . " has been uploaded.";
        } else {
          echo "Sorry, there was an error uploading your file.";
        }
      }
      //Открываем файл и удаляем первую строку
    $fh = fopen($target_file, "r");
    fgetcsv($fh);

    //Перебираем таблицу
    while (($row = fgetcsv($fh, 0, ';')) !== false) {
    list($firstName, $phone) = $row;
    
    //Формируем запрос
    $dataName = [
        'username' => $phone,
        'password' => 'User1234',
        'firstName' => $firstName,
        'groups' => ['RETAIL']
    ];
    
    //Получаем id
    $idContact = json_decode(addName($dataName), true)['id'];

    //Добавляем id в массив
    $retails[] = $idContact;

    //Обновляем в карточке телефон
    updatePhone($idContact, $phone);
    }
    
    //Отправляем массив id
    echo addDistrib($retails);


//Функция добавления региона
function addName($name) {
    $ch = curl_init("https://api.lk-test.allstreets.ru/person");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($name));
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    $resultQuery = curl_exec($ch);
        curl_close($ch);
        return $resultQuery;
};

//Функция добавления телефона
function updatePhone($id, $phone) {
    $ch = curl_init("https://api.lk-test.allstreets.ru/person/{$id}/contacts");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
                "phone"=> $phone,
        )));
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    $resultQuery = curl_exec($ch);
        curl_close($ch);
        return $resultQuery;
};

//Функция отправки
function addDistrib($distr) {
    $ch = curl_init("https://api.lk-test.allstreets.ru/distribution");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
            'name' => date("Y-m-dH:i:s"),
            'retails' => $distr
        )));
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    $resultQuery = curl_exec($ch);
        curl_close($ch);
        return $resultQuery;
};

// //Функция отправки
// function addDistribTest() {
//     $test = [22571,22572,22573];
//     $ch = curl_init("https://api.lk-test.allstreets.ru/distribution");
//         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//         curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array(
//             'name' => date("Y-m-dH:i:s"),
//             'retails' => $test
//         )));
//         curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
//         curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
//         curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
//     $resultQuery = curl_exec($ch);
//         curl_close($ch);
//         return $resultQuery;
// };

// echo addDistribTest();

// echo 'Тест отправки номера';
// echo updatePhoneTest();
// function getContactId($contact) {
//     $ch = curl_init("https://api.lk-test.allstreets.ru/person/{$contact}");
//         curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//         // curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($phone));
//         curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
//         curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
//         curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
//     $resultQuery = curl_exec($ch);
//         curl_close($ch);
//         return json_decode($resultQuery, true)['id'];
// };

    //Функция для форматирования текста
function vardump($str) {
    echo "<pre>";
    var_dump($str);
    echo "</pre>";
}

?>