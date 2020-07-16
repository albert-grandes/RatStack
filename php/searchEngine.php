<?php
$json = new stdClass();

for($i = 0; $i < 2; $i++) {
    if($i == 0) $skip = "file";
    else $skip = "folder";

    pushJSON(dir("../root"), $json, $skip);
}

function pushJSON($dir, &$obj, $skip) {
    $pathRaw = $dir->path;

    while(($n = $dir->read()) !== false) {
        $fullPath = $pathRaw."/".$n;

        if($n == "." || $n == "..") continue;
        if(filetype($fullPath) == $skip) continue;
        if(is_dir($fullPath)) pushJSON(dir($fullPath), $obj, $skip);
        if(strpos(strtolower($n), strtolower($_POST["search"])) === 0) {
            $f = new stdClass();
            $f->type = filetype($fullPath);
            $f->path = $fullPath;
        
            $obj->$n = $f;
        }
    }
}

header("Content-Type: application/json");
echo json_encode($json);