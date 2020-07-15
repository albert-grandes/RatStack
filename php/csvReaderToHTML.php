<?php
if(isset($_GET["path"])){
    
    $file = fopen($_GET["path"],"r");
    echo "<table class='csv'>";
    while(! feof($file)) {
        echo "<tr>";
        $array = fgetcsv($file, 0, ";");
        if(!is_array($array)){
            continue;
        }
        foreach($array as $value) {
            echo "<td>$value</td>";
        }
        echo "</tr>";
    }
    echo "</table>";

    fclose($file);
} else {
    echo "<p>File not founded </p>";
}

