<!DOCTYPE html>
<html lang="en">
<?php
    require "html/head.php";
?>
<body>
    <?php
        require "html/header.php";
    ?>
    <form action="php/uploadFile.php" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="send">
    </form>
    <main class="d-flex flex-wrap align-items-stretch">
        <nav class="p-5 agr__folderNav">
            <ul id="folderTree">
                <!--
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
                -->
            </ul>
        </nav>
        <section>
            <div id="actualFolder" class="agr__folderScreen">
                <div class="folderScreen__options d-flex justify-content-end">
                    <div>+ New Folder</div>
                    <div>ICO File Upload</div>
                </div>
                <div class="folderScreen__folders"></div>
                <div class="folderScreen__files">
                    <div class="files__file" tabindex="-1">
                        <div>
                            <img src="https://pdkhatod.com/wp-content/uploads/2015/10/Folder.png">
                        </div>
                        <span>Folder</span>
                    </div>
                    <div class="files__file" tabindex="1">
                        <div>
                            <img src="https://es.seaicons.com/wp-content/uploads/2015/11/zip-icon4.png">
                        </div>
                        <span>file.zip</span>
                    </div>
                </div>
            </div>
        </section>
        <aside>
        </aside>
    </main>
</body>
</html>