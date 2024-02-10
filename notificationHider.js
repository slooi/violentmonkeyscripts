// ==UserScript==
// @name        notification hider
// @namespace   Violentmonkey Scripts
// @grant       none
// @version     1.0
// @author      -
// @description 1/6/2024, 9:08:34 PM
// @noframes
// ==/UserScript==



(function(){
  var exampleStr = "(9) you are on your listings page";
  console.log("Notification Hider STARTED!")


  if (originEndsWith(["youtube.com","discord.com","twitter.com","reddit.com"])){
    var regex = /\((\d+)\) /;

Object.defineProperty(document, 'title', {
    set: function (newValue) {
        if(newValue != ""){
            document.getElementsByTagName("title")[0].innerHTML = newValue.replace(regex, "");
        }
    },

    get: function () {
        return document.getElementsByTagName("title")[0].innerHTML;
    }
});


  }
})()


function originEndsWith(siteList){
  for(let i=0;i<siteList.length;i++){
    if (location.origin.endsWith(siteList[i])) return true
  }

  return false
}
