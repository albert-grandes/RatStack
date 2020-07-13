<?php
$json = new stdClass();

pushJSON(dir("../root"), $json);

function pushJSON($f, &$obj) {
    $pathRaw = $f->path;
    $pathArr = explode("/", $f->path);
    $pathStr = (string)$pathArr[count($pathArr)-1];
    
    $obj->$pathStr = new stdClass();

    while(($n = $f->read()) !== false) {
        if($n == "." || $n == "..") continue;
        if(is_dir($pathRaw."/".$n)) pushJSON(dir($pathRaw."/".$n), $obj->$pathStr);
    }
}

echo json_encode($json);
