define(function (require) {
  var $         = require('jquery')
  var Square    = require('square')
  var enumerate = require('lib/enumerate')


  var SquareRegion = function (id, puzzle) {
    this.id      = id
    this.puzzle  = puzzle
    this.$el     = this.getElement()
    this.squares = this.generateSquares()

    this.renderSquares()
    this.$el.data('sudoku.squareRegion', this)
  }

  SquareRegion.prototype.getElement = function () {
    return this.$el
        || $('<section class="puzzle-region"/>')
  }

  SquareRegion.prototype.generateSquares = function () {
    var puzzle   = this.puzzle
    var regionId = this.id

    var squares = enumerate(9, function (i) {
      var id = regionId * 9 + i
      return new Square(id, {initial: +puzzle.spec[id]})
    })

    return squares
  }

  SquareRegion.prototype.renderSquares = function () {
    this.squares.forEach(function (square) {
      this.$el.append(square.$el)
    }, this)
  }

  return SquareRegion
})
