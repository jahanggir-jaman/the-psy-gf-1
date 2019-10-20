<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/*
Tested working with PHP5.4 and above (including PHP 7 )

 */
require_once './vendor/autoload.php';

use FormGuide\Handlx\FormHandler;


$pp = new FormHandler(); 

/*
$validator = $pp->getValidator();
$validator->fields(['name','email'])->areRequired()->maxLength(50);
$validator->field('email')->isEmail();
$validator->field('message')->maxLength(6000);
*/

$pp->requireReCaptcha();
$pp->getReCaptcha()->initSecretKey('6LfvjXgUAAAAAETWOfD1p9kcQkRoPrsxnjQ_SheB');


$pp->sendEmailTo(['jasondonegan@thepsychicgodfather.com','tusarscc+thepsychic@gmail.com','mpb910+thepsychicgodfather@gmail.com']); 
// ← Your email here

echo $pp->process($_POST);