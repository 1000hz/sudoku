define(function (require) {
  var $ = require('jquery')

  $.support.transitionEnd = (function () {
    var events = [
      'webkitTransitionEnd',
      'transitionend',
      'oTransitionEnd',
      'otransitionend'
    ]

    var el = document.createElement('transitionEndTest')

    events.forEach(function (event) {
      if (el.style[event] !== undefined) {
        return event
      }
    })

    return false
  })()
})
