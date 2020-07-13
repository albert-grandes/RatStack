<?php
$json = new stdClass();
$path = dir("../".$_POST["path"]);

while(($n = $path->read()) !== false) {
    if($n == "." || $n == "..") continue;
    $f = new stdClass();
    $f->type = filetype($path->path."/".$n);

    $json->$n = $f;
}

echo json_encode($json);