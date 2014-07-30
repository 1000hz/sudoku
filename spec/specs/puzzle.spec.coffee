define (require) ->
  Puzzle     = require('puzzle')
  puzzleData = require('lib/sample_puzzle')

  beforeEach ->
    @puzzle = new Puzzle(puzzleData)

  describe "Puzzle", ->
    it "has an $el", ->
      expect(@puzzle.$el).toBeDefined()
      expect(@puzzle.$el.constructor.prototype).toBe $.fn

    it "has an array of 9 Regions", ->
      expect(@puzzle.regions).toBeDefined()
      expect(@puzzle.regions.length).toBe 9

    it "renders its regions into its element", ->
      expect(@puzzle.$el.children().length).toBe 9