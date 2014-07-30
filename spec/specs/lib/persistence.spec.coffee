define (require) ->
  Persistence = require('lib/persistence')

  beforeEach -> @persistence = new Persistence("0123", sessionStorage)
  afterEach  -> @persistence.clear()

  describe "Persistence", ->
    describe ".save()", ->
      it "stores the value to the right spot in the data string", ->
        @persistence.save('', {id: 1}, '', "9")
        expect(@persistence.load()).toBe "0923"

      it "stores a 0 for blank values", ->
        @persistence.save('', {id: 1}, '', "")
        expect(@persistence.load()).toBe "0023"

    describe ".load()", ->
      it "returns the stored data", ->
        expect(@persistence.load()).toBe "0123"

    describe ".reset()", ->
      it "resets the data to the original puzzle spec", ->
        @persistence.save('', {id: 1}, '', "9")
        @persistence.reset()
        expect(@persistence.load()).toBe "0123"

    describe ".clear()", ->
      it "clears the data and spec from the store", ->
        @persistence.clear()
        expect(@persistence.store['spec']).toBeUndefined()
        expect(@persistence.store['puzzleData']).toBeUndefined()