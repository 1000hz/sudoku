define(function (require) {
  var $            = require('jquery')
  var enumerate    = require('lib/enumerate')
  var SquareRegion = require('square_region')


  var Puzzle = function (options) {
    this.options = options || {}
    this.$el     = this.getElement()

    this.spec = this.options.spec
    this.data = this.options.data

    this.regions = this.generateRegions()

    this.render()
    this.$el.data('sudoku.puzzle', this)
  }

  Puzzle.prototype.getElement = function () {
    return this.$el
        || $('<article class="puzzle"/>')
  }

  Puzzle.prototype.generateRegions = function () {
    var puzzle = this
    return enumerate(9, function (i) {
      return new SquareRegion(i, puzzle)
    })
  }

  Puzzle.prototype.render = function () {
    var _this = this
    this.regions.forEach(function (region) {
      _this.$el.append(region.$el)
    })
  }

  return Puzzle
})
