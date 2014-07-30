define (require) ->
  App = require('app')

  describe "App", ->
    describe "App.start", ->
      beforeEach -> App.start(el: $('<div/>'), store: sessionStorage)

      it "gets an element", ->
        expect(App.$el).toBeDefined()
        expect(App.$el.constructor.prototype).toBe $.fn

      it "gets a puzzle", ->
        expect(App.puzzle).toBeDefined()

      it "renders the puzzle into its element", ->
        expect(App.$el.children().length).toBe 1

    describe "App.start when called with no arguments", ->
      it "expects to be passed an element", ->
        expect(App.start).toThrow()
