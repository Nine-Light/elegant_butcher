function animate() {
    if(renderKey){
        requestAnimationFrame(animate);
 
    }
    // controls.update();
    for(var i in helper){
        if(i){
            helper[i].update(clock.getDelta() * mmdModelSpeed[i]);
        }
    }
    // mmdControl();
    ray();
    timeAxis();
    // event();
    //各种控制
    control();
    
    //相机边界
    if(camCons.xMin) {
        cameraCons();
    }

    //判断是否全屏
    fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

    renderer.renderLists.dispose();
    renderer.render(scene, camera);
}