<?php
//$_POST["path"] = "../root/Documents/Working";

if(is_dir($_POST["path"])) deleteFolder($_POST["path"]);
else unlink($_POST["path"]);

function deleteFolder($path) {
    $dir = dir($path);

    while(($n = $dir->read()) !== false) {
        if($n == "." || $n == "..") continue;
        
        $childPath = $dir->path."/".$n;
        if(is_dir($childPath)) deleteFolder($childPath);
        else unlink($childPath);
    }
    
    rmdir($path);
}