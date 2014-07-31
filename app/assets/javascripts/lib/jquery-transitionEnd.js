define(function (require) {
  var $ = require('jquery')


  var events = [
    'webkitTransitionEnd',
    'transitionend',
    'oTransitionEnd',
    'otransitionend'
  ]

  $.support.transitionEnd = events.join(' ')
})
