define(function (require) {
  var $         = require('jquery')
  var Square    = require('square')
  var enumerate = require('lib/enumerate')


  var SquareRegion = function (id) {
    this.id      = id
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
    var id = this.id
    var squares = enumerate(9, function (i) {
      return new Square(id * 9 + i)
    })

    return squares
  }

  SquareRegion.prototype.renderSquares = function () {
    var _this = this
    this.squares.forEach(function (square) {
      _this.$el.append(square.$el)
    })
  }

  return SquareRegion
})
