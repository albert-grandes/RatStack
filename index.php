<!DOCTYPE html>
<html lang="en">
<?php
    require "html/head.php";
?>
<body>
    <?php
        require "html/header.php";
    ?>
    <main class="d-flex flex-wrap align-items-stretch">
        <nav class="p-5 agr__folderNav">
            <ul id="folderTree">
                <li><span class="folder">Private</span>
                    <ul class="nested">
                    <li>Water</li>
                    <li>Coffee</li>
                    <li><span class="folder">Photos</span>
                        <ul class="nested">
                        <li>Black Tea</li>
                        <li>White Tea</li>
                        <li><span class="caret">Green Tea</span>
                            <ul class="nested">
                            <li>Sencha</li>
                            <li>Gyokuro</li>
                            <li>Matcha</li>
                            <li>Pi Lo Chun</li>
                            </ul>
                        </li>
                        </ul>
                    </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <section>
            <div id="actualFolder"></div>
        </section>
        <aside>
        </aside>
    </main>
</body>
</html>