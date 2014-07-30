define (require) ->
  Square = require('square')

  beforeEach ->
    @square = new Square(1)

  describe "Square", ->
    it "has an id", ->
      expect(@square.id).toBe 1

    it "has an $el", ->
      expect(@square.$el).toBeDefined()
      expect(@square.$el.constructor.prototype).toBe $.fn

    describe "a prefilled square", ->
      it "is readonly", ->
        @square = new Square(1, initial: 5)
        expect(@square.$el.val()).toBe "5"
        expect(@square.$el.attr('readonly')).toBe "readonly"

    describe "on an input event", ->
      xit "calls constrainInput", ->
        spyOn @square, "constrainInput"
        @square.$el.trigger("input")
        expect(@square.constrainInput).toHaveBeenCalled()

    describe ".constrainInput()", ->
      beforeEach ->
        @event = {target: {selectionStart: 1}}

      it "accepts numbers 1-9", ->
        @square.$el.val(4)
        @square.constrainInput(@event)
        expect(@square.$el.val()).toBe "4"

      it "accepts an empty value", ->
        @square.constrainInput(@event)
        expect(@square.$el.val()).toBe ""

      it "rejects all other input and reverts to previous value", ->
        @square.$el.val("e")
        @square.constrainInput(@event)
        expect(@square.$el.val()).toBe ""