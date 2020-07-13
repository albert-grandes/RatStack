<?php
$_POST["path"] = "../root/Documents";
$_POST["name"] = "patata";

mkdir($_POST["path"]."/".$_POST["name"]);

