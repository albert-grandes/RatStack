<?php
$json = new stdClass();

$dir = dir($_POST["path"]);

while(($n = $dir->read()) !== false) {
    if($n == "." || $n == "..") continue;
    $f = new stdClass();
    $f->type = filetype($dir->path."/".$n);
    $f->path = $dir->path."/".$n;

    $json->$n = $f;
}

echo json_encode($json);