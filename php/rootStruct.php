<?php
$json = new stdClass();

pushJSON(dir("../root"), $json);

function pushJSON($f, &$obj) {
    $pathRaw = $f->path;
    $pathArr = explode("/", $f->path);
    $pathStr = (string)$pathArr[count($pathArr)-1];
    
    $obj->$pathStr = new stdClass();
    $obj->$pathStr->path = $pathRaw;
    $obj->$pathStr->content = new stdClass();

    while(($n = $f->read()) !== false) {
        if($n == "." || $n == "..") continue;
        if(is_dir($pathRaw."/".$n)) pushJSON(dir($pathRaw."/".$n), $obj->$pathStr->content);
    }
}
<<<<<<< HEAD
header('Content-Type: application/json');
=======

header("Content-Type: application/json");
>>>>>>> 08f3ce541bdf937b1f1c944a34148e2c344b8bb8
echo json_encode($json);
