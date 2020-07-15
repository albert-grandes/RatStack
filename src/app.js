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
    //We execute the tree folder function
    //treeFolder()
    //We check for empty boxes
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
                            clicks = 0;
                            clearTimeout(timer);
                            $(".folder_active").removeClass("folder_active")
                            clickThis.addClass("folder_active");
                            showFolder(pathDir);                           
                        }
                    })
                    .dblclick(function(e){
                        e.preventDefault();
                        //In this place we can make and ajax that change the content of folderScreen__files and folder                        
                        
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