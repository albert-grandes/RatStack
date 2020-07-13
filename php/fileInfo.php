<?php
$obj = new stdClass();
$_POST["path"] = "../root/Documents/Work/TODO.txt";

if(is_dir($_POST["path"])) {

} else {
    $obj->name = explode(".", basename($_POST["path"]))[0];
    $obj->type = explode(".", basename($_POST["path"]))[1];
    $obj->content = file_get_contents($_POST["path"]);
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

