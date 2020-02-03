function timeAxis() {
    if(start) {
        dialog("log1", logNum);   
        start = false;
        logNum++;
    }

    if(dialogKey && dialogKey2 && dialogKey3) {
        if(logNum < dialogCtt["log" + log].length) {
            dialogKey2 = false;
            dialog("log" + log, logNum);
            // console.log(logNum);
            mmdAnimate[log] && mmdAnimate[log][logNum] && mmdAnimate[log][logNum]();
            logNum++;
        }else {
            if(log == 4) {
                mmdAnimate[log][9]()
            }
            logNum = 0;
            log ++;
            dialogDiv.style.display = "none";
            dialogKey3 = false;
            eve++;
            tipKey = true;
        }
    }
    // if(log == 7 && logNum == 2 && voiceKey) {
    //     voiceKey = false;
    //     console.log(11111);
    //     soundHS.play();
    // }

    if(event[eve]){
        event[eve]();
    }


    
}