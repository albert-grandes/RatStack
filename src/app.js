/******************************************************************
Index:
    2. Automatic run
    4. nav treefolder
*******************************************************************/

/************************************************************************************/
// S> 2. Automatic run
$(document).ready(function(){
    //We have to import the data of tree folder! 
    loadTreeFolder()
    //We execute the tree folder function
    //treeFolder()
})
// E> 2. Automatic run
/************************************************************************************/

/************************************************************************************/
// S> 3. Info page loader
function loadTreeFolder() {
    $.ajax("php/rootStruct.php")
    .done(function(data) {
        addFolders("folderTree", data); //Recursive function
        function addFolders(id, fobject) {
            for (key in fobject) {
                const pathDir = fobject[key]["path"];
                const folder = $("<li>")
                .append(
                    $("<span>", {class: "folder", text: key})
                    .attr("data-path", fobject[key]["path"])
                    .click(function(){
                        //In this place we can make and ajax that change the content of folderScreen__files and folder                        
                        showFolder(pathDir);
                    }))
                .append(
                    $("<ul>", {class: "nested", id: `id${key}`})
                )
                $(`#${id}`).append(folder)
                addFolders(`id${key}`, fobject[key]["content"])
            }
        }
        treeFolder()
    })
    .fail(function() {
        alert( "error" );
    });
}

function showFolder(pathDir) {
    /*
    <div id="folderStruct">
                <div id="fs-header">
                    <span></span>
                    <span>Name</span>
                    <span>Size</span>
                    <span>Creation</span>
                    <span>Last Mod.</span>
                </div>
                <div class="fs-card">
                    <span><img src="folder.png"></span>
                    <span>Potato<span class="card-name-extension"></span></span>
                    <span>45B</span>
                    <span>24/12/2000</span>
                    <span>05/01/2001</span>
                </div>
            </div>
    */
    $.post("php/dirStruct.php", {
        path: pathDir
    })
    .done(function(data) {
        console.log(data);
        //First we load the header of the table! :)
        $("#fs-content").empty()
        for (file in data) {
            if(data[file]["type"]=="dir") {
                var classFile = "fs-card-dir";
            } else {
                var classFile = "fs-card-file";
            }
            $.post("php/fileInfo.php", {
                path: pathDir + "/" + file
            })
            .always(fileData => {
                $("#fs-content")
                .append(
                $("<div>", {class:"fs-card " + classFile})
                .append(
                    $("<span>")
                    .append(
                        /*<img src="folder.png"></img>*/
                        $("<img>",{src: "images/" + fileData.type.toLowerCase() + ".png"})
                    )
                )
                .append(
                    $("<span>", {text: fileData.name }).append(
                        $("<span>", {class: "fsc-ext", text: fileData.type.toLowerCase() })
                    )
                )
                .append(
                    $("<span>", {text: fileData.size})
                )
                .append(
                    $("<span>", {text: fileData.lastMod})
                ))
            })
        }
        /*
        addFile("folderStruct", data); //Recursive function
        function addFile(id, fobject) {
            for (key in fobject) {
                const pathDir = fobject[key]["path"];
                const folder = $("<li>")
                .append(
                    $("<span>", {class: "folder", text: key})
                    .attr("data-path", fobject[key]["path"])
                    .click(function(){
                        //In this place we can make and ajax that change the content of folderScreen__files and folder                        
                        showFolder(pathDir);
                    }))
                .append(
                    $("<ul>", {class: "nested", id: `id${key}`})
                )
                $(`#${id}`).append(folder)
                addFolders(`id${key}`, fobject[key]["content"])
            }
        }*/
    })
}

// E> 3. Info page loader
/************************************************************************************/

/************************************************************************************/
// S> 4. nav treefolder
function treeFolder() {
    console.log("treeFolder function is active! ")
    $(".folder").click(function(){
        $(this).next(".nested").toggleClass("active");
        $(this).toggleClass("folder-down");
    })
}
//E> 4. nav treefolder
/************************************************************************************/