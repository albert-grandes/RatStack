<?php
//$_POST["path"] = "../root/Documents/Working";

if(is_dir($_POST["path"])) {
    $dir = dir($_POST["path"]);

    while(($n = $dir->read()) !== false) {
        if($n == "." || $n == "..") continue;
        unlink($dir->path."/".$n);
    }
    
    rmdir($_POST["path"]);
} else unlink($_POST["path"]);

