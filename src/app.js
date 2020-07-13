/******************************************************************
Index:
    2. Automatic run
    4. nav
*******************************************************************/

/************************************************************************************/
// S> 2. Automatic run
$(document).ready(function(){
    //We have to import the data of tree folder!
    var requestFolderTree = $.ajax("php/rootStruct.php")
    .done(function(data) {
        addFolders("folderTree", data); //Recursive function
        function addFolders(id, object) {
            for (key in object) {
                console.log(key);
                let folder = $("<li>")
                .append(
                    $("<span>", {class: "folder", text: key}))
                .append(
                    $("<ul>", {class: "nested", id: `id${key}`})
                )
                console.log()
                $(`#${id}`).append(folder)
                addFolders(`id${key}`, object[key]["content"])
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
// S> 4. nav
function treeFolder() {
    console.log("treeFolder function is active! ")
    $(".folder").click(function(){
        console.log("We are working!");
        console.log($(this).next().html());
        $(this).next(".nested").toggleClass("active");
        $(this).toggleClass("folder-down");
    })
}
//E> 4. nav
/************************************************************************************/