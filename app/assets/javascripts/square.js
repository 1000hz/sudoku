define(function (require) {
  var $ = require('jquery')


  var Square = function (id, options) {
    this.id = id
    this.options = options || {}
    this.$el = this.getElement()

    this.options.prefill && this.$el.attr({readonly: true, tabindex: -1})
    this.setValue(this.options.prefill || this.options.value || '')
    this.updateInputValue()

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

    acceptedInputs.test(input) && this.setValue(input)
    this.updateInputValue()
  }

  Square.prototype.setValue = function (value) {
    var previous = this.value
    if (previous === value) return
    this.value = value;
    this.$el.trigger('change:value.sudoku', [this, previous, value])
  }

  Square.prototype.updateInputValue = function () {
    this.$el.val(this.value)
  }


  return Square
})
