define(function (require) {
  function enumerate(n, factory) {
    return (new Array(n + 1))
      .join(' ').split('')
      .map(function (x, index) { return factory(index) })
  }

  return enumerate
})
