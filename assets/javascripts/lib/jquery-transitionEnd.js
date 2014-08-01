define(function (require) {
  var $ = require('jquery')

  $.support.transitionEnd = (function () {
    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    var el = document.createElement('transitionEndTest')

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return transEndEventNames[name]
      }
    }

    return false
  })()
})
