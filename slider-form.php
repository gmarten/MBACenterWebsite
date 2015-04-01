<?php

    // retrieve variables from the form
    $Email= isset($_REQUEST['Email']) ? $_REQUEST['Email'] : '';
    $firstName = isset($_REQUEST['Firstname']) ? $_REQUEST['Firstname'] : '';
    $lastName = isset($_REQUEST['Lastname']) ? $_REQUEST['Lastname'] : '';
    $country = isset($_REQUEST['Country']) ? $_REQUEST['Country'] : '';
    $Phone = isset($_REQUEST['Phone']) ? $_REQUEST['Phone'] : '';
    $courses = isset($_REQUEST['courses']) ? $_REQUEST['courses'] : '';
	
    // compose the message
    //$to = "clement.hadjeres@gmail.com;hubert@mbacentereurope.eu;mehdi@mbacentereurope.eu"; /*Your Email*/
    $to = "gunther@mbacentereurope.eu"; /*Your Email*/
    $subject = "Messsage from the GMAT landing page"; /*Issue*/
    $date = date ("l, F jS, Y");
    $time = date ("h:i A");

    $msg="
        Name: $firstName $lastName
        Email: $Email
        Country: $country
        Courses: $courses
        Phone: $Phone

        Message sent on: $date, hour: $time.\n";

    // send the mail
    if (mail($to, $subject, $msg, "From: $Email")) {
        include('thanks.php');
    }else{
        include('not.php');
    }
?>