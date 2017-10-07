class TestPoint {

    testCreateOrigin() {
        const origin = Point(0, 0)
        assertDefined(origin.x)
        assertDefined(origin.y)
        assertEqual(0, origin.x)
        assertEqual(0, origin.y)
    }

    testCreate() {
        const point = Point(4, 5)
        assertDefined(point.x)
        assertDefined(point.y)
        assertEqual(4, point.x)
        assertEqual(5, point.y)
        assertEqual(Point(4, 5), point)
    }

    testNegateOrigin() {
        const point = Point(0, 0)
        assertEqual(Point(0, 0), point.negate())
    }

    testNegate() {
        const point = Point(4, 5)
        assertEqual(Point(-4, -5), point.negate())
    }

    testNegateNotModify() {
        const point = Point(4, 5)
        point.negate()
        assertEqual(Point(4, 5), point)
    }

    testTranslateOrigin() {
        const point = Point(4, 5)
        assertEqual(Point(4, 5), point.translate())
    }

    testTranslate() {
        const point = Point(4, 5)
        assertEqual(Point(7, -1), point.translate(Point(3, -6)))
    }

    testTranslateNotModify() {
        const point = Point(4, 5)
        point.translate(Point(1, 1))
        assertEqual(Point(4, 5), point)
    }

    testRotate() {
        const point = Point(1, 0)
        assertEqual(Point(0, 1), point.rotate(Math.PI / 2), 1e-6)
    }
}
