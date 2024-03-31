// ==UserScript==
// @name         Video Controller
// @include *
// @match        https://www.youtube.com/watch?v=U4dSWJFIQ0A
// ==/UserScript==
(function() {
    'use strict';

    let playspeed = 1
    let showDisplay = 0
    let controlDown = 0

    window.onload = function(){
        const vidEle = selectVideo()
        if(vidEle != undefined){
            vidEle.playbackRate = playspeed
        }
    }
    window.addEventListener('keyup',e=>{
        if(e.code === 'ControlLeft' || e.code === 'ControlRight'){
            console.log("UP")
            controlDown = 0
        }
    })
    window.addEventListener('keydown',e=>{
        if(selectVideo()!= undefined){
            if(e.code === 'ControlLeft' || e.code === 'ControlRight'){
                controlDown = 1
            }
            switch(e.code){
                case 'NumpadSubtract':
                    increaseSpeed()
                    setPlaybackrateAndChangeSpeed()
                    break;
                case 'NumpadMultiply':
                    decreaseSpeed()
                    setPlaybackrateAndChangeSpeed()
                    break;
                case 'NumpadAdd':
                    resetSpeed()
                    setPlaybackrateAndChangeSpeed()
                    break;
                case 'NumLock':
                    toggleDisplay()
                    setPlaybackrateAndChangeSpeed()
                    break;
                case 'NumpadDecimal':
                    goBack()
                    setPlaybackrateAndChangeSpeed()
                    break;
                case 'NumpadEnter':
                    goForwards()
                    setPlaybackrateAndChangeSpeed()
                    break;
            }
        }
    })
    function setPlaybackrateAndChangeSpeed(){
      selectVideo().playbackRate = playspeed
      if (window.location.origin.indexOf("reddit") === -1) changeSpeed()
    }
    // SPEED FUNCTIONS
    function goBack(){
        const vid = selectVideo()
        if(controlDown){
            // if shift is down
            vid.currentTime -= 2
        }else{
            vid.currentTime -= 5
        }
    }
    function goForwards(){
        const vid = selectVideo()
        if(controlDown){
            // if shift is down
            vid.currentTime += 2
        }else{
            vid.currentTime += 5
        }
    }
    function increaseSpeed(){
        playspeed += 0.1;
        if(playspeed>16){
            playspeed -= 0.1
        }
    }
    function decreaseSpeed(){
        playspeed -= 0.1;
        if(playspeed<0.01){
            playspeed += 0.1
        }
    }
    function resetSpeed(){
        playspeed = 1;
    }
    function changeSpeed(){
        const ele = document.getElementById('qweasdzxc')
        if(ele != undefined){
           // if display already exists
            ele.innerText = Math.round(playspeed*100)/100
        }else{
           // if display doesn't exist
            const qweasdzxc = document.createElement('span')
            qweasdzxc.innerText = playspeed
            qweasdzxc.setAttribute("id", "qweasdzxc");
            changeStyle(qweasdzxc)
           selectVideo().parentElement.append(qweasdzxc)
        }
    }
    function toggleDisplay(){
        showDisplay+=1
        if(showDisplay>1){
            showDisplay=0
        }
        const ele = document.getElementById('qweasdzxc')
        if(ele != undefined){
            // element exists
            changeStyle(ele)
        }
    }
    function changeStyle(ele){
        if(showDisplay === 0 ){
            //showDisplay === 0
            ele.style = 'position:absolute;top:16px;left:1rem;opacity:0;fontFamily:"Sans-serif";background-color:#000000A0;color:white;';
        }else{
            //showDisplay === 1
            ele.style = 'position:absolute;top:16px;left:1rem;opacity:1;fontFamily:"Sans-serif";background-color:#000000A0;color:white;';
        }
    }
    function findAllVideoElements(node) {
      const videoElements = [];

      // Check if the node is a video element
      if (node.nodeName.toLowerCase() === 'video') {
        videoElements.push(node);
      }

      // Check if the node has a shadow root
      if (node.shadowRoot) {
        videoElements.push(...findAllVideoElements(node.shadowRoot));
      }

      // Recursively check the node's children for video elements and shadow roots
      if (node.children) {
        for (const child of node.children) {
          videoElements.push(...findAllVideoElements(child));
        }
      }
      return videoElements;
    }

    function getAllVideos(){
      return findAllVideoElements(document.body)
    }
    // selecting active video
    function selectVideo(){
        const videoList = getAllVideos()
        if(videoList.length === 1){
            // if there's only a SINGLE video
           return videoList[0]
        }else if(videoList.length > 1){
            // if there are MULTIPLE videos

            const visibleList = []
            // if visible add to visibleList
            for(let i=0;i<videoList.length;i++){
                if(checkVisible(videoList[i])){
                    visibleList.push(videoList[i])
                }
            }
            // if any video in visibleList are NOT paused, then return that video
            for(let i=0;i<visibleList.length;i++){
                if(visibleList[i].paused === false){
                    // video is being played
                   return visibleList[i]
                }
            }
            // else return first visible video
            return visibleList[0]

            // couldn't find any videos IN SCREEN
            return null
        }else{
            // couldn't find any videos
            return null
        }
    }
    //
    //
    //
    // extra functions
    function checkVisible(elm) {
        var rect = elm.getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
})();
