class Polygon {
    constructor(sides) {
        this.sides = sides
    }
    perimeter() {
        return this.sides.reduce(function add(a, b) {
            return a + b;
        })
    }
}
var square = Polygon([2, 2, 2, 2])
square.perimeter()

