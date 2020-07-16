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
    //Allow modal options to view files
    allowModal();

    //Event Listeners
    $("#new-folder-btn").click(() => {
        const form = $("#new-folder-form");
        form.children().eq(2).val($("nav").attr("data-path"))
        form.children().eq(2).hide();
        form.toggle(200);
    })

    $("#upload-file-btn").click(() => {
        const form = $("#upload-file-form");
        form.children().eq(2).val($("nav").attr("data-path"))
        form.children().eq(2).hide();
        form.toggle(200);
    })

    $("#search-input input").on("input", e => {
        const input = $(e.target);
        if(input.val().length < 2) {
            showFolder("../root");
        } else {
            $.post("php/searchEngine.php", {
                search: input.val()
            }, data => {
                $("nav").attr("data-path", "../root");
                folderTable(data);
            })
        }
    })
})
// E> 2. Automatic run
/************************************************************************************/

/************************************************************************************/
// S> 3. Info page loader
function loadTreeFolder() {
    $("#folderTree").empty();
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
                            clicks = 0;
                            clearTimeout(timer);
                            timer = setTimeout(function() {
                                $.post("php/dirStruct.php", {
                                    path: pathDir
                                }).done(folder => {
                                    if(emptyFolderCheck(folder)) {
                                        clickThis.next(".nested").toggleClass("active");
                                        clickThis.toggleClass("folder-down");
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
        alert("error");
    });
}

function showFolder(pathDir) {
    $("nav").attr("data-path", pathDir);
    $.post("php/dirStruct.php", {
        path: pathDir
    })
    .done(function(data) {
        console.log(data);
        //First we load the header of the table! :)
        folderTable(data, pathDir);
    })
}

function folderTable(data, pathDir="../") {
    let ind = 0;
    console.log(data)
    console.log(pathDir)
    $("#fs-content").empty()
    if (pathDir=="../root") {
        //Don't watch the folder to go back
    } else {
        const bar = pathDir.lastIndexOf("/")
        const repath = pathDir.slice(0,bar)
        const folderback = pathDir.slice(bar+1)
        console.log(repath);
        $("#fs-content")
        .append(
            $("<div>", {class:"fs-card fs-card-mobile"})
            .click(function(){
                const clickThis = $(this);
                clicks++;
                if (clicks === 1){
                    //Only one click
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        showDetails(fileData.path);
                        clicks = 0;
                    }, 300)
                } else {
                    //double click
                    clicks = 0;
                    clearTimeout(timer);
                    showFolder(repath)
                }
            })
            .dblclick(function(e){
                e.preventDefault();
                //This is only for prevent dblclick action
            })
            .append(
                $("<span>").append(
                    $("<img>",{src: "images/folder.png"})
                )
            )
            .append(
                $("<span>", {text: "../" }).append(
                    $("<span>", {class: "fsc-ext", text: "folder" })
                )
            )
        )
    }
    for (const [key, file] of Object.entries(data)) {
        if(file.type=="dir") {
            var classFile = "fs-card-dir";
        } else {
            var classFile = "fs-card-file";
        }
        $.post("php/fileInfo.php", {
            path: file.path
        })
        .done(fileData => {
            ind++;
            $("#fs-content")
            .append(
                $("<div>", {class:"fs-card " + classFile})
                .click(function(){
                    const clickThis = $(this);
                    clicks++;
                    if (clicks === 1){
                        //Only one click
                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            showDetails(fileData.path);
                            clicks = 0;
                        }, 300)
                    } else {
                        //double click
                        clicks = 0;
                        clearTimeout(timer);
                        if(fileData.type!="folder") {
                            showModalContent(fileData)
                            $("#myModal")
                            .css("display", "flex")
                            .hide()
                            .fadeIn()
                        } else {
                            showFolder(fileData.path);
                            //TODO activeLink correction :(
                        }
                    }
                })
                .dblclick(function(e){
                    e.preventDefault();
                    //This is only for prevent dblclick action
                })
                .append(
                    $("<span>").append(
                        $("<img>",{src: "images/" + fileExtension(fileData.type.toLowerCase()) + ".png"})
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
                )
                .append(
                    $("<span>", {class: "fsc-edit", text: "✎"}).click(e => {
                        const target = $(e.target);
                        target.siblings("form").toggle(200);
                        target.siblings("form").children("input").eq(2).hide()
                    })
                )
                .append(
                    $("<span>", {class: "fsc-remove", text: "×"}).click(e => deleteFile(fileData.path))
                ).append(`
                    <form class="modal-form rename-form">
                        <input type="text" name="name" autocomplete="off" required>
                        <input type="submit" class="rename-form-btn" id="rfb-${ind}" value="Rename">
                        <input name="path" value="${fileData.path}">
                    </form>
                `)
            )
            $("#rfb-"+ind).on("click", e => {
                e.preventDefault()
                e.stopPropagation()
                editName(e, fileData.path)
            })
        })
    }
}

function showDetails(pathDir) {
    $.post("php/fileInfo.php", {
        path: pathDir
    })
    .done(function(file) {
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
                    $("<span>", {class: "d-label", html:"<b>Name</b>"})
                )
                .append(
                    $("<span>", {class: "d-value", text: file.name})
                )
            )
            .append(
                $("<p>")
                .append(
                    $("<span>", {class: "d-label", html:"<b>Type</b>"})
                )
                .append(
                    $("<span>", {class: "d-value", text: file.type})
                )
            )
            .append(
                $("<p>")
                .append(
                    $("<span>", {class: "d-label", html:"<b>Size</b>"})
                )
                .append(
                    $("<span>", {class: "d-value", text: file.size})
                )
            )
            .append(
                $("<p>")
                .append(
                    $("<span>", {class: "d-label", html:"<b>Path</b>"})
                )
                .append(
                    $("<span>", {class: "d-value", text: file.path.slice(2)})
                )
            )
        )
        if(file.type!="folder") {
            $("#d-content")
            .append(
                $("<p>")
                .append(
                    $("<span>", {class: "d-label", html:"<b>Last Access</b>"})
                )
                .append(
                    $("<span>", {class: "d-value", text: file.lastAccess})
                )
            )
            .append(
                $("<p>")
                .append(
                    $("<span>", {class: "d-label", html:"<b>Last Modification</b>"})
                )
                .append(
                    $("<span>", {class: "d-value", text: file.lastMod})
                )
            )
        }
    })
}

function showModalContent(fileObject, id="showContent") {
    $(`#${id}`)
    const images = ["png", "jpg", "jpeg", "gif"];
    const videos = ["mp4", "avi"];
    const music = ["mp3", "waw"];
    if(images.includes((fileObject.type).toLowerCase())) {
        $(`#${id}`).empty().append(
            $("<img>", {src: (fileObject.path).slice(3)})
        )
    } else if (videos.includes((fileObject.type).toLowerCase())) {
        $(`#${id}`).empty().append(
            $("<video>", {controls: true}).append(
                $("<source>", {src: (fileObject.path).slice(3)})
            )
        )
    } else if (music.includes((fileObject.type).toLowerCase())) {
        $(`#${id}`).empty().append(
            $("<audio>", {controls: true}).append(
                $("<source>", {src: (fileObject.path).slice(3)})
            )
        )
    } else if (fileObject.type=="csv") {
        $.get(`php/csvReaderToHTML.php?path=${fileObject.path}`)
        .done(function(data){
            $(`#${id}`).empty().html(data);
        })
    } else if (fileObject.type=="txt") {
        let text;
        $.get((fileObject.path).slice(3))
        .done(function (txt) {
            $(`#${id}`).empty().html(txt)
        })
    } else {
        $(`#${id}`).empty().append(
            $("<a>", {href: (fileObject.path).slice(3), text:`Download ${fileObject.type}`, target:"_blank", class:"m-download"})
        )
    }
}

function editName(el, path) {
    const form = $(el.target.parentElement);
    const parentPath = path.split("/").splice(0, path.split("/").length - 1).join("/");
    console.log(parentPath)
    $.post("php/renameFile.php", {
        path: form.children().eq(2).val(),
        name: form.children().eq(0).val(),
        ext: form.parent().children().eq(1).children("span").text()
    })
    .done(() => { 
        showFolder(parentPath)
        loadTreeFolder();
    })
}

function deleteFile(path) {
    const parentPath = path.split("/").splice(0, path.split("/").length - 1).join("/");

    $.post("php/deleteFile.php", {
        path: path,
    }).done(() => {
        showFolder(parentPath);
        loadTreeFolder();
    });
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

function fileExtension(ext) {
    const allowedExtension = ["csv", "doc", "exe", "folder", "jpg", "mp3", "mp4", "odt", "pdf", "png", "ppt", "rar", "txt", "zip"];
    if(allowedExtension.includes(ext)) return ext;
    else return "file";
}

// Get the modal
function allowModal() {
    let modal = $("#myModal").click(function(event){
        console.log(event.target.id +"<-> "+ "myModal")
        if (event.target.id == "myModal") {
            modal.fadeOut()
            $("#showContent").empty();
        }
    })
    let btn = $("#myBtn").click(function() {
        modal.fadeIn();
    })
    let span = $(".close").click(function(){
        modal.fadeOut();
        $("#showContent").empty();
    })
}