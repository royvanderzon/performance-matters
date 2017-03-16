// .font-load
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

if(readCookie('fontLoaded') === null){
	// fontLoaded = true
    var font = new FontFaceObserver('source_sans_pro');
    font.load('中国').then(function() {
        console.log('Font is available');
        //add class loaded
        document.querySelector('body').classList.add('font-load')
        document.cookie = "fontLoaded=true"
    }, function() {
        console.log('Font is not available');
    });
}