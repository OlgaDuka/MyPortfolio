<?php

if(isset($_POST['message'])){

	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
    
	
	$to      = 'olgaduk@mail.ru';
	$subject = 'Форма для контакта';

	$headers = 'От: '. $email . "\r\n" .
    'Копия: '. $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

	$status = mail($to, $subject, $message, $headers);

	if($status == TRUE){	
		$res['sendstatus'] = 'done';
	
		//Edit your message here
		$res['message'] = 'Письмо успешно отправлено';
    }
	else{
		$res['message'] = 'Ошибка отправки. Пожалуйста напишите мне на адрес: olgaduk@mail.ru';
	}
	
	
	echo json_encode($res);
}

?>