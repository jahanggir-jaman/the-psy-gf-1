<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);
/*
Tested working with PHP5.4 and above (including PHP 7 )

 */
require_once './vendor/autoload.php';

use FormGuide\Handlx\FormHandler;
$femail = $_POST['email'];

$pp = new FormHandler(); 

/*
$validator = $pp->getValidator();
$validator->fields(['name','email'])->areRequired()->maxLength(50);
$validator->field('email')->isEmail();
$validator->field('message')->maxLength(6000);
*/

$mailer = $pp->getMailer();
$mailer->setFrom('jasondonegan@thepsychicgodfather.com ','Jason Donegan');
$mailer->Subject = 'Contact Form Submitted by '.$femail;

$pp->requireReCaptcha();
$pp->getReCaptcha()->initSecretKey('6LfvjXgUAAAAAETWOfD1p9kcQkRoPrsxnjQ_SheB');

$pp->sendEmailTo(['jasondonegan@thepsychicgodfather.com',$femail]); 

// ← Your email here

echo $pp->process($_POST);
