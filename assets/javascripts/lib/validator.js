define(function (require) {
  $ = require('jquery')


  var Validator = function (puzzle) {
    this.puzzle = puzzle
    this.puzzle.$el.on('change:value.sudoku', $.proxy(this.validate, this))
  }

  Validator.prototype.validate = function (e, square, previous, value) {
    var rowSquares    = this.puzzle.rowSquares[square.row]
    var columnSquares = this.puzzle.columnSquares[square.column]
    var regionSquares = this.puzzle.regionSquares[square.region]

    this.validateSlice(rowSquares, square, previous, value)
    this.validateSlice(columnSquares, square, previous, value)
    this.validateSlice(regionSquares, square, previous, value)

    this.puzzle.$el.toggleClass("puzzle-solved", this.isSolved())
  }

  Validator.prototype.validateSlice = function (slice, changedSquare, previous, value) {
    slice.forEach(function (square) {
      if (square === changedSquare) return

      if (value && square.value == value) {
        this.incrementErrors(square)
        this.incrementErrors(changedSquare)
      }

      if (previous && square.value == previous) {
        this.decrementErrors(square)
        this.decrementErrors(changedSquare)
      }
    }, this)
  }

  Validator.prototype.incrementErrors = function (square) {
    square.errors || (square.errors = 0)
    square.errors++
    square.errors && square.$el.addClass('error')
  }

  Validator.prototype.decrementErrors = function (square) {
    square.errors || (square.errors = 0)
    square.errors--
    square.errors || square.$el.removeClass('error')
  }

  Validator.prototype.isSolved = function () {
    return this.puzzle.squares.every(function (square) {
      return square.value && !square.errors
    })
  }

  return Validator
})
