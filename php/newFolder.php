<?php
mkdir($_POST["path"]."/".$_POST["name"]);

header("Location: ../index.php");