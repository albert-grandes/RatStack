<?php
$_POST["path"] = "../root/Documents/Work";
$_POST["name"] = "Working";

$tmpPA = explode("/", $_POST["path"]);
array_splice($tmpPA, count($tmpPA)-1);

$parentDir = implode("/", $tmpPA);

rename($_POST["path"], $parentDir."/".$_POST["name"]);
