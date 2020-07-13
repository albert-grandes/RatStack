<?php
$obj = new stdClass();
$_POST["path"] = "../root/Documents/Work/TODO.txt";

if(is_dir($_POST["path"])) {

} else {
    $fullname = explode(".", basename($_POST["path"]));

    $obj->name = $fullname[0];
    $obj->type = end(array_keys(($fullname)));
    $obj->path = $_POST["path"];
    $obj->size = byteToMeasure(filesize($_POST["path"]));
    $obj->lastMod = date("F d Y H:i:s.", filemtime($_POST["path"]));
}

function byteToMeasure($b) : string {
    $measure = ["B", "KB", "MB", "GB", "TB"];
    $m = $b;
    $i = 0;

    while($m > 1000) { 
        $m /= 1000;
        $i++;
    }

    return $m." ".$measure[$i];
}

header("Content-Type: application/json");
echo json_encode($obj);

