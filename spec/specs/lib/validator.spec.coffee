define (require) ->
  Validator = require('lib/validator')
  Puzzle    = require('puzzle')

  beforeEach ->
    @puzzle    = new Puzzle("0123")
    @validator = new Validator(@puzzle)

  describe "Validator", ->
    describe ".validate()", ->
      it "defers to validateSlice", ->
        spyOn @validator, "validateSlice"
        @validator.validate('', @puzzle.squares[0], '', '1')
        expect(@validator.validateSlice).toHaveBeenCalled()

      it "adds .puzzle-solved to the puzzle $el if the puzzle is complete", ->
        spyOn(@validator, "isSolved").and.returnValue true
        expect(@puzzle.$el.hasClass('puzzle-solved')).toBe false

        @validator.validate('', @puzzle.squares[0], '', '1')

        expect(@validator.isSolved).toHaveBeenCalled()
        expect(@validator.puzzle.$el.hasClass('puzzle-solved')).toBe true

    describe "validateSlice()", ->
      beforeEach ->
        @slice = @puzzle.squares.slice(0, 2)
        @slice[0].value = 0
        @slice[1].value = 1

      describe "when a duplicate value is input", ->
        it "increments errors on both squares", ->
          spyOn(@validator, "incrementErrors").and.callThrough()
          @validator.validateSlice(@slice, @slice[0], '', 1)
          expect(@validator.incrementErrors).toHaveBeenCalled()
          expect(@slice[0].errors).toBe 1
          expect(@slice[1].errors).toBe 1

      describe "when a duplicate value is deleted", ->
        it "decrements errors on both squares", ->
          spyOn(@validator, "decrementErrors").and.callThrough()
          @validator.validateSlice(@slice, @slice[0], 1, '')
          expect(@slice[0].errors).toBe -1
          expect(@slice[1].errors).toBe -1

      describe "when a duplicate value is replaced with a non-dupe", ->
        it "decrements errors on both squares", ->
          spyOn(@validator, "decrementErrors").and.callThrough()
          @validator.validateSlice(@slice, @slice[0], 1, 9)
          expect(@slice[0].errors).toBe -1
          expect(@slice[1].errors).toBe -1

    describe ".isSolved()", ->
      it "returns true when all fields are complete and have no errors", ->
        @validator.puzzle.squares.forEach (square) -> square.value = 1
        expect(@validator.isSolved()).toBe true

      it "returns false when any field is incomplete or has errors", ->
        expect(@validator.isSolved()).toBe false
        @puzzle.squares.forEach (square, i) -> square.value = i + 1
        @puzzle.squares[0].errors = 1
        expect(@validator.isSolved()).toBe false