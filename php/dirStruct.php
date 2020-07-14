<?php
$json = new stdClass();

for($i = 0; $i < 2; $i++) {
    if($i == 0) $skip = "file";
    else $skip = "folder";

    $dir = dir($_POST["path"]);
    while(($n = $dir->read()) !== false) {
        if($n == "." || $n == ".." || filetype($dir->path."/".$n) == $skip) continue;
        $f = new stdClass();
        $f->type = filetype($dir->path."/".$n);
        $f->path = $dir->path."/".$n;
    
        $json->$n = $f;
    }
}

header("Content-Type: application/json");
echo json_encode($json);