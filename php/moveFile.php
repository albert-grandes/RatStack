<?php
if(isset($_POST["pathOrigin"]) and isset($_POST["pathFinal"])){
    if($_POST["typeFinal"]=="folder"){
        echo rcopy($_POST["pathOrigin"], $_POST["pathFinal"]);
    } else {
        echo "problem";
    }
} else {
    echo "false";
}

function rcopy($src, $dst) {
    if (file_exists ( $dst ))
        rrmdir ( $dst );
    if (is_dir ( $src )) {
        mkdir ( $dst );
        $files = scandir ( $src );
        foreach ( $files as $file )
            if ($file != "." && $file != "..")
                rcopy ( "$src/$file", "$dst/$file" );
    } else if (file_exists ( $src ))
        copy ( $src, $dst );
}