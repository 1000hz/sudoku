define(function (require) {
  var $      = require('jquery')
  var Puzzle = require('puzzle')


  var App = function () {}

  App.prototype.start = function (options) {
    this.options = options || {}
    if (!this.options.el) throw new Error("App started without `options.el`")
    this.$el = $(this.options.el)
    // TODO: load/generate puzzle, load state
    this.puzzle = new Puzzle()

    this.$el.append(this.puzzle.$el)
  }

  return new App
})
