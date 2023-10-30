const verifiyBrowser = () => {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return true;
    } else if (navigator.userAgent.indexOf("Edg") != -1) {
        return true
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return true;
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return false;
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return true;
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) // für edgecases
    {
        return false;
    } else {
        return false;
    }
}

export {
    verifiyBrowser
}