<?php
$_POST["path"] = "../root/Documents/Work/TODO.txt";
$type = end(array_keys(explode(".", basename($_POST["path"]))));

header("Content-Type: application/json");
echo json_encode($obj);

