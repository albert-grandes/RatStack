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
        $("#folderTree")
        $("#actualFolder").html(data);
        alert( "success" );
    })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
        alert( "complete" );
    });
    //We execute the tree folder function
    treeFolder()
})
// E> 2. Automatic run
/************************************************************************************/

/************************************************************************************/
// S> 4. nav
function treeFolder() {
    console.log("treeFolder function is active! ")
    $(".folder").click(function(){
        console.log("We are working!");
        $(this).next(".nested").toggleClass("active");
        $(this).toggleClass("folder-down");
    })
}
//E> 4. nav
/************************************************************************************/