(function() {
  var aside, aside_close, aside_media;

  aside = document.getElementsByClassName('work__aside');

  aside_media = document.getElementsByClassName('work__aside__media');

  aside_close = document.getElementsByClassName('work__disable-aside');

  if (aside_media.length > 0) {
    aside[0].onclick = function() {
      return document.getElementsByClassName('page')[0].className = 'page is-aside-activated';
    };
    aside_close[0].onclick = function() {
      return document.getElementsByClassName('page')[0].className = 'page';
    };
  }

}).call(this);
