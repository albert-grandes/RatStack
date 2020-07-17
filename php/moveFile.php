<?php
if(isset($_POST["pathOrigin"]) and isset($_POST["pathFinal"])){
    if($_POST["typeFinal"]=="folder"){
        $fileBar = strrpos($_POST["pathOrigin"], '/', -1);
        $strPos= $fileBar +1;
        $fileName = substr($_POST["pathOrigin"], $strPos);
        echo copy($_POST["pathOrigin"], $_POST["pathFinal"]."/" . $fileName);
        unlink ($_POST["pathOrigin"]);
    } else {
        echo "problem";
    }
} else {
    echo "false";
}