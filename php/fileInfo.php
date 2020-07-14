<?php
$obj = new stdClass();

if(is_dir($_POST["path"])) {
    $obj->name = basename($_POST["path"]);
    $obj->type = "folder";
    $obj->path = $_POST["path"];
    $obj->size = byteToMeasure(filesize($_POST["path"]));
    $obj->lastMod = date("F d Y H:i:s.", filemtime($_POST["path"]));
} else {
    $fullname = explode(".", basename($_POST["path"]));

    $obj->name = $fullname[0];
    $obj->type = $fullname[1];
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

