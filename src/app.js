/******************************************************************
Index:
    2. Automatic run
    4. nav treefolder
*******************************************************************/

/************************************************************************************/
// S> 2. Automatic run
$(document).ready(function(){
    //We have to import the data of tree folder!
    $.ajax("php/rootStruct.php")
    .done(function(data) {
        addFolders("folderTree", data); //Recursive function
        function addFolders(id, fobject) {
            for (key in fobject) {
                const pathDir = fobject[key]["path"];
                console.log(fobject[key]["path"]);
                const folder = $("<li>")
                .append(
                    $("<span>", {class: "folder", text: key})
                    .attr("data-path", fobject[key]["path"])
                    .click(function(){
                        //In this place we can make and ajax that change the content of folderScreen__files and folder                        
                        $.post("php/dirStruct.php", {
                            path: pathDir
                        })
                        .done(function(data) {
                            console.log(data)
                        })
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
    })
    .always(function() {
        /*alert( "complete" );*/
    });
    //We execute the tree folder function
    //treeFolder()
})
// E> 2. Automatic run
/************************************************************************************/

/************************************************************************************/
// S> 4. nav treefolder
function treeFolder() {
    console.log("treeFolder function is active! ")
    $(".folder").click(function(){
        console.log("We are working!");
        console.log($(this).next().html());
        $(this).next(".nested").toggleClass("active");
        $(this).toggleClass("folder-down");
    })
}
//E> 4. nav treefolder
/************************************************************************************/