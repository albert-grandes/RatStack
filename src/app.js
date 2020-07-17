/******************************************************************
Index:
    0. Variables
    2. Automatic run
    4. nav treefolder
*******************************************************************/

/************************************************************************************/
//S> Variables
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

    $("#create-folder-btn").click(e => {
        e.preventDefault();

        const form = $("#new-folder-form");
        const path = $("nav").attr("data-path");

        $.post("php/newFolder.php", {
            path: path,
            name: form.children().eq(0).val()
        }, () => {
            showFolder(path);
            loadTreeFolder();
            form.children().eq(0).val("");
            form.toggle(200);
        })
    })

    $("#upload-file-btn").click(() => {
        const form = $("#upload-file-form");
        form.children().eq(2).val($("nav").attr("data-path"))
        form.children().eq(2).hide();
        form.toggle(200);
    })

    $("#search-input input").on("input", e => {
        const input = $(e.target);
        if(input.val().length < 1) {
            showFolder("../root");
        } else {
            $.post("php/searchEngine.php", {
                search: input.val()
            }, data => {
                $("nav").attr("data-path", "../root");
                UpdateTreeFolder();
                folderTable(data, "../root", true);
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
                        $.post("php/dirStruct.php", {
                            path: pathDir
                        }).done(folder => {
                            $(".folder_active").removeClass("folder_active")
                            clickThis.addClass("folder_active"); 
                            showFolder(pathDir);
                            if(emptyFolderCheck(folder)) {
                                clickThis.next(".nested").toggleClass("active");
                                clickThis.toggleClass("folder-down", 200);
                            }
                        })
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
                $.post("php/dirStruct.php", {
                    path: pathDir
                }).done(checkData => {
                    if(!emptyFolderCheck(checkData)) {
                        $("span[data-path='"+pathDir+"']").addClass("folder-no-arrow")
                    }
                })
            }
        }
        //Autosetup active dir in tree structure
        UpdateTreeFolder();
    })
    .fail(function() {
        alert("error");
    });
}

function UpdateTreeFolder() {
    //Clean tree space
    $(".folder_active").removeClass("folder_active");
    $(".active").removeClass("active");
    $(".folder-down").removeClass("folder-down");


    $("span[data-path='"+ $("nav").attr("data-path") +"']").addClass("folder_active");

    let activeDir = $(".folder_active");
    activeDir.toggleClass("folder-down");
    activeDir.next(".nested").toggleClass("active");

    let topFolder;
    
    for(let i = 0; i < 100; i++) {
        if(!activeDir.parent().parent().hasClass("nested")) break;

        topFolder = activeDir.parent().parent().prev();
        topFolder.toggleClass("folder-down");
        topFolder.next(".nested").toggleClass("active");

        activeDir = topFolder;
    }
}

function showFolder(pathDir) {
    $("nav").attr("data-path", pathDir);
    $.post("php/dirStruct.php", {
        path: pathDir
    })
    .done(function(data) {
        //First we load the header of the table! :)
        folderTable(data, pathDir);
    })
}

function folderTable(data, pathDir="../", search = false) {
    let ind = 0;

    $("#fs-content").empty()
    if (pathDir == "../root") {
        //Don't watch the folder to go back
    } else {
        const bar = pathDir.lastIndexOf("/")
        const repath = pathDir.slice(0,bar)
        const folderback = pathDir.slice(bar+1)
        if(!search) {
            $("#fs-content")
            .append(
                $("<div>", {class:"fs-card"})
                .click(function(e) {
                    if($(window).width()<850){
                        showFolder(repath);
                        UpdateTreeFolder();
                    }
                })
                .dblclick(function(e){
                    showFolder(repath);
                    UpdateTreeFolder();
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
                /*DRAG AND DROP ATTR*/
                .attr("data-path", fileData.path)
                .attr("data-type", fileData.type)
                .attr("ondrop", "drop(event)")
                .attr("ondragover", "allowDrop(event)")
                .attr("draggable", "true")
                .attr("ondragstart", "drag(event)")
                /*DRAG AND DROP ATTR*/
                .click(function(){
                    showDetails(fileData.path);
                    if($(window).width()<850){
                        if(fileData.type!="folder") {
                            showModalContent(fileData)
                            $("#myModal")
                            .css("display", "flex")
                            .hide()
                            .fadeIn()
                        } else {
                            showFolder(fileData.path);
                            UpdateTreeFolder();
                        }
                    }
                })
                .dblclick(function(e){
                    e.preventDefault();
                    //This is only for prevent dblclick action
                    if(fileData.type!="folder") {
                        showModalContent(fileData)
                        $("#myModal")
                        .css("display", "flex")
                        .hide()
                        .fadeIn()
                    } else {
                        showFolder(fileData.path);
                        UpdateTreeFolder();
                    }
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
                    $("<span>", {class: "fsc-edit", text: "🖉"}).click(e => {
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
    makeDraggable()
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
/************************************************************************************/
// S> DRAG AND DROP FUNCTIONS
function makeDraggable() {
    $("#fs-content")
    .attr("ondrop", "drop(event)")
    .attr("ondragover", "allowDrop(event)")
    .attr("draggable", "true")
    .attr("ondragstart", "drag(event)")
}
function allowDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target.getAttribute("data-path"))
    ev.dataTransfer.setData("path", ev.target.getAttribute("data-path"));
    ev.dataTransfer.setData("type", ev.target.getAttribute("data-type"));
    //console.log($(`#${ev.target.id}`).attr("data-path"))
}
var eventTargetPrueba;
var count = 0;
function drop(ev) {
    let eventTarget = originEvent(ev.target)
    ev.preventDefault();
    const path = ev.dataTransfer.getData("path");
    const data = ev.dataTransfer.getData("type");
    $.post("php/moveFile.php", {
        pathOrigin: path,
        typeOrigin: data,
        pathFinal: eventTargetPrueba.getAttribute("data-path"),
        typeFinal: eventTargetPrueba.getAttribute("data-type")
    })
    .done(function(data){
        if(data!="false") {
            const barPos = path.lastIndexOf("/");
            const actualPath = path.substring(0,barPos);
            //This empty is because sometimes the info send duplicate
            if(count==0) {
                count++;
                $("#fs-content").empty()
                showFolder(actualPath)
            } else {
                count=0;
            }
        }
    })

    //ev.target.appendChild(document.getElementById(data));
}

function originEvent (htmlObject) {
    if(htmlObject.getAttribute("ondrop")==null){
        originEvent(htmlObject.parentElement)
    } else {
        eventTargetPrueba = htmlObject;
        return htmlObject;
    }
}