define(function (require) {
  var $ = require('jquery')


  var Square = function (id, options) {
    this.id = id
    this.options = options || {}
    this.$el = this.getElement()

    if (this.options.prefill) {
      this.$el.attr({readonly: true, tabindex: -1}).val(this.options.prefill)
    }

    this.$el.on('input.sudoku', $.proxy(this.constrainInput, this))

    this.$el.data('sudoku.square', this)
  }

  Square.prototype.getElement = function () {
    return this.$el
        || $('<input type="tel" class="puzzle-square">')
  }

  Square.prototype.constrainInput = function (e) {
    var caretPos = e.target.selectionStart - 1
    var input = this.$el.val().slice(caretPos, caretPos + 1)
    var acceptedInputs = /(^[1-9]?$)/

    acceptedInputs.test(input) && (this.value = input)
    this.updateInputValue()
  }

  Square.prototype.updateInputValue = function () {
    this.$el.val(this.value)
  }


  return Square
})
