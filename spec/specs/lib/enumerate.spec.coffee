define (require) ->
  enumerate = require('lib/enumerate')

  describe "enumerate", ->
    it "generates and collects n values into an array", ->
      expect(enumerate(5, () -> {}).length).toBe 5

    it "passes the index into the factory function", ->
      i = 0
      enumerate(5, (j) -> expect(i++).toBe j)