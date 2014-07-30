define (require) ->
  Puzzle       = require('puzzle')
  SquareRegion = require('square_region')
  puzzleData   = require('lib/sample_puzzle')

  beforeEach ->
    @region = new SquareRegion(1, new Puzzle(spec: puzzleData, data: puzzleData))

  describe "SquareRegion", ->
    it "has an id", ->
      expect(@region.id).toBe 1

    it "has an $el", ->
      expect(@region.$el).toBeDefined
      expect(@region.$el.constructor.prototype).toBe $.fn

    it "has an array of 9 Squares", ->
      expect(@region.squares).toBeDefined
      expect(@region.squares.length).toBe 9

    it "renders its squares into its element", ->
      expect(@region.$el.children().length).toBe 9