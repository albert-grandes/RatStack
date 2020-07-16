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

//

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