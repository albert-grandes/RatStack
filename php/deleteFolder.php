<?php
$_POST["path"] = "../root/Documents/Working";

$dir = dir($_POST["path"]);

while(($n = $dir->read()) !== false) {
    if($n == "." || $n == "..") continue;
    unlink($dir->path."/".$n);
}

rmdir($_POST["path"]);
