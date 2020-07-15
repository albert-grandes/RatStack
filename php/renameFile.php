<?php
$tmpPA = explode("/", $_POST["path"]);
array_splice($tmpPA, count($tmpPA)-1);

$parentDir = implode("/", $tmpPA);

if(!is_dir($_POST["path"])) 
    rename($_POST["path"], $parentDir."/".$_POST["name"].".".$_POST["ext"]);
else 
    rename($_POST["path"], $parentDir."/".$_POST["name"]);

//We have to understand that is posible that this rename delete and existing file without alert
