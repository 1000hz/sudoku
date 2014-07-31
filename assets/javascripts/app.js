define(function (require) {
  var $           = require('jquery')
  var Puzzle      = require('puzzle')
  var Persistence = require('lib/persistence')
                    require('sidebar')


  var App = function () {}

  App.prototype.start = function (options) {
    if (!options.el) throw new Error("App started without `options.el`")
    this.options = options || {}
    this.$el = $(this.options.el)

    this.puzzle      = new Puzzle(this.newPuzzle())
    this.persistence = new Persistence(this.puzzle.spec, options.store)

    this.$el.append(this.puzzle.$el)

    this.load()
    this.bindActions()
  }

  App.prototype.bindActions = function () {
    $(document)
      .on('click.sudoku', '[data-action="reset"]', $.proxy(this.reset, this))
      .on('click.sudoku', '[data-action="cheat"]', $.proxy(this.cheat, this))
  }

  App.prototype.newPuzzle = function () {
    return require('lib/sample_puzzle')
  }

  App.prototype.load = function () {
    var data = this.persistence.load()
    this.listenForChanges(false)
    this.puzzle.squares.forEach(function (square) {
      var value = +data[square.id]
      value || (value = '')
      square.setValue(value)
      square.updateInputValue()
    })
    this.listenForChanges(true)
  }

  App.prototype.reset = function () {
    this.persistence.reset()
    this.load()
  }

  App.prototype.cheat = function () {
    this.persistence.store['puzzleData'] = "534672198678195342912348567859426713761853924423791856961287345537419286284635179"
    this.load()
  }

  App.prototype.listenForChanges = function (active) {
    this.$el[active ? 'on' : 'off']('change:value.sudoku', $.proxy(this.persistence.save, this.persistence))
  }

  return new App
})
