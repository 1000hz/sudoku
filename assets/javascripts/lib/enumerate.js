define(function (require) {
  function enumerate(n, factory, context) {
    return new Array(n + 1).join(' ').split('')
      .map(function (x, index) { return factory.call(context, index) })
  }

  return enumerate
})
