<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RatStack</title>
    <!--NPM Packages -->
    <script src="node_modules/jquery/dist/jquery.js"></script>
    <!--PHP-Forms links-->
    <link href="src/style.css" rel="stylesheet"/>
    <script src="src/app.js"></script>
</head>
<body>
    <?php
        require "html/header.php";
    ?>
    <!--<form action="php/uploadFile.php" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="send">
    </form>-->
    <nav>
        <div id="new-folder">
            <div id="new-folder-btn" class="action-btn">New Folder</div>
            <form id="new-folder-form" class="modal-form" action="php/newFolder.php" method="post">
                <input type="text" name="name" required>
                <input type="submit" value="Create">
                <input name="path">
            </form>
        </div>
        <div>

        </div>
    </nav>
    <main>
        <div id="m-structure">
            <h4>Folders</h4>
            <ul id="folderTree">

            </ul>
        </div>
        <div id="m-folder">
            <div id="folderStruct">
                <div id="fs-header">
                    <span></span>
                    <span>Name</span>
                    <span>Size</span>
                    <span>Last Mod.</span>
                </div>
                <div id="fs-content">
                    
                </div>
            </div>
        </div>
        <div id="m-details">
            <h4>Details</h4>
        </div>
    </main>
    <!--< MODAL CONTENT -->
    <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
    </div>

    </div>
    <!-- MODAL CONTENT >-->
    <?php
        require "html/footer.php";
    ?>
    <!--
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
     -->
</body>
</html>