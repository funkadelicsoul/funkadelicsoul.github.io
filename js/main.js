/ http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links/
// find a scrollable elment
var $scrollable = (function() {
    var els = ['body','html'],
        i = 0,
        l = els.length,
        $elm = null, isScrollable = false;  

    // for each elm in array
    for ( ; i<l; i++ ) {
        // as jQ object
        $elm = $(els[i]);

        // if scrolled already
        if ( $elm.scrollTop() > 0 ) {
            return $elm;
        } else {
            // test if it can be scrolled
            $elm.scrollTop(1);
            isScrollable = $elm.scrollTop() > 0;
            $elm.scrollTop(0);
            // return of scrollable
            if ( isScrollable ) {
                return $elm;
            }
        }
    }
    // return false
    return false;
}());

var filterPath = function(str) {    
    return str
        // 1. Strip backslash off front
        .replace(/^\//,'')
        // 2. Remove index / default .ext
        .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
        // 3. Strip backslash off end
        .replace(/\/$/,'');
},
// relative path
locationPath = filterPath(location.pathname);

// for each anchor link
$('a[href*=#]').each(function() {
    // relative path
    var self = this,
        thisPath = filterPath(self.pathname) || locationPath;

    // 1. filtered relative path same for window and link
    // 2. Host domain same for window and link or there is no domain
    // 3. Hash value exists
    if ( locationPath == thisPath && (location.hostname == self.hostname || !self.hostname) && self.hash.replace(/#/,'') ) {
        var target = self.hash,
            $target = $(target),
            hasTarget = !!$target.length;

            // on click
        $(self).on('click', function(e) {
            e.preventDefault();

            // animate to target position
            $scrollable.animate({
                scrollTop: (hasTarget ? $target.offset().top : 0)
            }, 800, function() {
                // make sure URL is updated and usable
                location.hash = (hasTarget ? target : '');
            });
        });
    }
});