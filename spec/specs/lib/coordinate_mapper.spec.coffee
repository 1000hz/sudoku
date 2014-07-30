define (require) ->
  Mapper = require('lib/coordinate_mapper')

  describe "CoordinateMapper", ->
    describe ".rowFor", ->
      it "returns the row for a square given its id", ->
        expect(Mapper.rowFor( 0)).toBe 0
        expect(Mapper.rowFor( 4)).toBe 1
        expect(Mapper.rowFor( 8)).toBe 2
        expect(Mapper.rowFor(36)).toBe 3
        expect(Mapper.rowFor(40)).toBe 4
        expect(Mapper.rowFor(44)).toBe 5
        expect(Mapper.rowFor(72)).toBe 6
        expect(Mapper.rowFor(76)).toBe 7
        expect(Mapper.rowFor(80)).toBe 8

    describe ".columnFor", ->
      it "returns the column for a square given its id", ->
        expect(Mapper.columnFor( 0)).toBe 0
        expect(Mapper.columnFor( 4)).toBe 1
        expect(Mapper.columnFor( 8)).toBe 2
        expect(Mapper.columnFor(36)).toBe 3
        expect(Mapper.columnFor(40)).toBe 4
        expect(Mapper.columnFor(44)).toBe 5
        expect(Mapper.columnFor(72)).toBe 6
        expect(Mapper.columnFor(76)).toBe 7
        expect(Mapper.columnFor(80)).toBe 8

    describe ".regionFor", ->
      it "returns the region for a square given its id", ->
        expect(Mapper.regionFor( 0)).toBe 0
        expect(Mapper.regionFor(10)).toBe 1
        expect(Mapper.regionFor(20)).toBe 2
        expect(Mapper.regionFor(30)).toBe 3
        expect(Mapper.regionFor(40)).toBe 4
        expect(Mapper.regionFor(50)).toBe 5
        expect(Mapper.regionFor(60)).toBe 6
        expect(Mapper.regionFor(70)).toBe 7
        expect(Mapper.regionFor(80)).toBe 8