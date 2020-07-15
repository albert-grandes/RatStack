<?php
move_uploaded_file($_FILES["file"]["tmp_name"], $_POST["path"]."/".basename($_FILES["file"]["name"]));

header("Location: ../index.php");