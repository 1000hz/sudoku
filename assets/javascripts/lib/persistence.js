define(function (require) {
  var Persistence = function (spec, store) {
    this.store = store || localStorage
    if (this.store['spec'] !== spec) {
      this.store['spec'] = this.store['puzzleData'] = spec
    }
  }

  Persistence.prototype.save = function (e, square, previous, value) {
    var data = this.store['puzzleData'].split('')
    data[square.id] = value || 0
    data = data.join('')
    this.store['puzzleData'] = data
  }

  Persistence.prototype.load = function () {
    return this.store['puzzleData']
  }

  Persistence.prototype.reset = function () {
    this.store['puzzleData'] = this.store['spec']
  }

  Persistence.prototype.clear = function () {
    this.store.clear('spec')
    this.store.clear('puzzleData')
  }

  return Persistence
})
