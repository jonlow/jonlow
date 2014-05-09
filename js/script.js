/*jslint browser: true*/
/*global $, $, Modernizr, FastClick, enquire */

var msnry;
//var bMasonryLoaded = false;

WebFontConfig = {
  google: { families: [ 'Lato:100,300,400,900:latin' ] }
};

(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

var Jon = (function(){

  "use strict";

  function init () {


  }
  return {
    init: init
  };

}());
