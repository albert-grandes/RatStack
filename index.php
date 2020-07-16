<!DOCTYPE html>
<html lang="en">
<?php
    require "html/head.php";
?>
<body>
    <?php
        require "html/header.php";
    ?>
    <nav>
        <div class="action-menu">
            <div id="new-folder-btn" class="action-btn">New Folder</div>
            <form id="new-folder-form" class="modal-form">
                <input type="text" name="name" autocomplete="off" required>
                <input type="submit" id="create-folder-btn" value="Create">
            </form>
        </div>
        <div id="search-input">
            <input type="text" name="search" autocomplete="off" placeholder="Search...">
        </div>
        <div class="action-menu">
            <form id="upload-file-form" class="modal-form" action="php/uploadFile.php" method="post" enctype="multipart/form-data">
                <input type="file" name="file" required>
                <input type="submit" value="Upload">
                <input name="path">
            </form>
            <div id="upload-file-btn" class="action-btn">Upload File</div>
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
            <div id="showContent"></div>
        </div>
    </div>
    <!-- MODAL CONTENT >-->
    <?php
        require "html/footer.php";
    ?>
</body>
</html>