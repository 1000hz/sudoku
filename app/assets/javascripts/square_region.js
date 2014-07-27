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
      var options = {}

           if (+puzzle.spec[id]) options.prefill = puzzle.spec[id]
      else if (+puzzle.data[id]) options.value   = puzzle.spec[id]

      return new Square(id, options)
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
