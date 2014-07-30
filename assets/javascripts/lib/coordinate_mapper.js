define(function (require) {
  return {
    rowFor: function (id) {
      return Math.floor(this.positionFor(id) / 3) + 3 * Math.floor(this.regionFor(id) / 3)
    },
    columnFor: function (id) {
      return Math.floor(this.positionFor(id) % 3) + 3 * Math.floor(this.regionFor(id) % 3)
    },
    regionFor: function (id) {
      return Math.floor(id / 9)
    },
    positionFor: function (id) {
      return id % 9
    }
  }
})
