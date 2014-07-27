# just to make sure I set grunt up correctly

define (require) ->
  jaribKweri = require('jquery')

  describe "a required file", ->
    it "is defined when required", ->
      expect(jaribKweri).toBeDefined()
