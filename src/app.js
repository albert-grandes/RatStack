/******************************************************************
Index:
    0. Variables
    2. Automatic run
    4. nav treefolder
*******************************************************************/

/************************************************************************************/
//S> Variables
let clicks = 0;
let timer;
//E> Variables
/************************************************************************************/

/************************************************************************************/
// S> 2. Automatic run
$(document).ready(function(){
    //We have to import the data of tree folder! 
    loadTreeFolder()
    //We put the root folder when start!
    showFolder("../root")
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
                        const clickThis = $(this);
                        clicks++;
                        if (clicks === 1){
                            //Only one click
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                $.post("php/dirStruct.php", {
                                    path: pathDir
                                }).done(folder => {
                                    if(emptyFolderCheck(folder)) {
                                        clickThis.next(".nested").toggleClass("active");
                                        clickThis.toggleClass("folder-down");
                                        clicks = 0;
                                    }
                                })   
                            }, 300)
                        } else {
                            //double click 
                            clicks = 0;
                            clearTimeout(timer);
                            $(".folder_active").removeClass("folder_active")
                            clickThis.addClass("folder_active");
                            showFolder(pathDir);
                        }
                    })
                    .dblclick(function(e){
                        e.preventDefault();
                        //This is only for prevent dblclick action
                    })
                )
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
    console.log(pathDir);
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
            .done(fileData => {
                $("#fs-content")
                .append(
                    $("<div>", {class:"fs-card " + classFile}).click(function(){
                        showDetails(fileData.path);
                    })
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
    })
}

function showDetails(pathDir) {
    $.post("php/fileInfo.php", {
        path: pathDir
    })
    .done(function(file) {
        console.log(file);
        //First we load the header of the table! :)
        $("#m-details").empty()
        .append(
            $("<h4>", {text:"Details"})
        )
        .append(
            $("<div>", {class:"d-content", id:"d-content"})
            .append(
                $("<p>")
                .append(
                    $("<span>", {class: "d-label", html:"<b>Name: </b>"})
                )
                .append(
                    $("<span>", {class: "d-value", text: file.name})
                )
            )
            .append(
                $("<p>")
                .append(
                    $("<span>", {class: "d-label", html:"<b>Type: </b>"})
                )
                .append(
                    $("<span>", {class: "d-value", text: file.type})
                )
            )
            .append(
                $("<p>")
                .append(
                    $("<span>", {class: "d-label", html:"<b>Size: </b>"})
                )
                .append(
                    $("<span>", {class: "d-value", text: file.size})
                )
                .append(
                    $("<p>")
                    .append(
                        $("<span>", {class: "d-label", html:"<b>Path: </b>"})
                    )
                    .append(
                        $("<span>", {class: "d-value", text: file.path})
                    )
                )
            )
        )
        if(file.type!="folder") {
            $("#d-content")
            .append(
                $("<p>")
                .append(
                    $("<span>", {class: "d-label", html:"<b>Last Access: </b>"})
                )
                .append(
                    $("<span>", {class: "d-value", text: file.lastAccess})
                )
                .append(
                    $("<p>")
                    .append(
                        $("<span>", {class: "d-label", html:"<b>Last Modification: </b>"})
                    )
                    .append(
                        $("<span>", {class: "d-value", text: file.lastMod})
                    )
                )
            )
        }
    })
}

// E> 3. Info page loader
/************************************************************************************/

/************************************************************************************/
// S> 4. nav treefolder
function treeFolder() {
    console.log("treeFolder function is active! ")
    $(".folder")
}
//E> 4. nav treefolder
/************************************************************************************/
// S> X. Helper functions
function emptyFolderCheck(folder) {
    for(const [key, value] of Object.entries(folder)) 
        if(value.type == "dir") return true;

    return false;
}