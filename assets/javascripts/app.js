define(function (require) {
  var $           = require('jquery')
  var Puzzle      = require('puzzle')
  var Persistence = require('lib/persistence')


  var App = function () {}

  App.prototype.start = function (options) {
    if (!options.el) throw new Error("App started without `options.el`")
    this.options = options || {}
    this.$el = $(this.options.el)

    this.puzzle      = new Puzzle(this.newPuzzle())
    this.persistence = new Persistence(this.puzzle.spec, options.store)

    this.$el.append(this.puzzle.$el)

    this.load()
    this.listenForChanges()
  }

  App.prototype.newPuzzle = function () {
    return require('lib/sample_puzzle')
  }

  App.prototype.load = function () {
    var data = this.persistence.load()
    this.puzzle.squares.forEach(function (square) {
      var value = +data[square.id]
      if (value) {
        square.setValue(value)
        square.updateInputValue()
      }
    })
  }

  App.prototype.listenForChanges = function () {
    this.$el.on('change:value.sudoku', $.proxy(this.persistence.save, this.persistence))
  }

  return new App
})
