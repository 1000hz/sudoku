define(function (require) {
  var $            = require('jquery')
  var enumerate    = require('lib/enumerate')
  var SquareRegion = require('square_region')
  var Validator    = require('lib/validator')


  var Puzzle = function (spec) {
    this.$el       = this.getElement()
    this.validator = new Validator(this)

    this.spec    = spec
    this.squares = []
    this.regions = this.generateRegions()

    this.rowSquares    = this.getSlices("row")
    this.columnSquares = this.getSlices("column")
    this.regionSquares = this.getSlices("region")

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
      var region = new SquareRegion(i, puzzle)
      region.squares.forEach(function (square) {
        puzzle.squares.push(square)
      })
      return region
    })
  }

  Puzzle.prototype.getSlices = function (property) {
    var slices = enumerate(9, function () { return [] })
    this.squares.forEach(function (square) {
      slices[square[property]].push(square)
    })

    return slices
  }

  Puzzle.prototype.render = function () {
    this.regions.forEach(function (region) {
      this.$el.append(region.$el)
    }, this)
  }

  return Puzzle
})
