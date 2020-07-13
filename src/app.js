/******************************************************************
Index:
    2. Automatic run
    4. nav
*******************************************************************/

/************************************************************************************/
// S> 2. Automatic run
$(document).ready(function(){
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
}/*
var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
      
      //this.parentElement.querySelector(".nested").classList.toggle("active");
     
  });*/
//E> 4. nav
/************************************************************************************/