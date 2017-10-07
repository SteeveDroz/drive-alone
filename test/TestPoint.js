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

    testRotateNoArgument() {
        const point = Point(1, 0)
        assertEqual(Point(Math.sqrt(3) / 2, 1 / 2), point.rotate(Math.PI / 6), 1e-6)
        assertEqual(Point(Math.sqrt(2) / 2, Math.sqrt(2) / 2), point.rotate(Math.PI / 4), 1e-6)
        assertEqual(Point(1 / 2, Math.sqrt(3) / 2), point.rotate(Math.PI / 3), 1e-6)
        assertEqual(Point(0, 1), point.rotate(Math.PI / 2), 1e-6)
        assertEqual(Point(-1, 0), point.rotate(Math.PI), 1e-6)
        assertEqual(Point(1, 0), point.rotate(2 * Math.PI), 1e-6)
    }

    testRotate() {
        const point = Point(4, 5)
        const center = Point(3, 5)
        assertEqual(Point(3 + Math.sqrt(3) / 2, 5 + 1 / 2), point.rotate(Math.PI / 6, center), 1e-6)
        assertEqual(Point(3 + Math.sqrt(2) / 2, 5 + Math.sqrt(2) / 2), point.rotate(Math.PI / 4, center), 1e-6)
        assertEqual(Point(3 + 1 / 2, 5 + Math.sqrt(3) / 2), point.rotate(Math.PI / 3, center), 1e-6)
        assertEqual(Point(3, 6), point.rotate(Math.PI / 2, center), 1e-6)
        assertEqual(Point(2, 5), point.rotate(Math.PI, center), 1e-6)
        assertEqual(Point(4, 5), point.rotate(2 * Math.PI, center), 1e-6)

    }

    testRotateNotModify() {
        const point = Point(4, 5)
        point.rotate(1)
        assertEqual(Point(4, 5), point)
    }

    testMeasureAngleNoArgument() {
        const point1 = Point(1, 0)
        assertEqual(0, point1.measureAngle(), 1e-6)

        const point2 = Point(Math.sqrt(3), 1)
        assertEqual(Math.PI / 6, point2.measureAngle(), 1e-6)

        const point3 = Point(1, 1)
        assertEqual(Math.PI / 4, point3.measureAngle(), 1e-6)

        const point4 = Point(1, Math.sqrt(3))
        assertEqual(Math.PI / 3, point4.measureAngle(), 1e-6)

        const point5 = Point(0, 1)
        assertEqual(Math.PI / 2, point5.measureAngle(), 1e-6)

        const point6 = Point(-1, 0)
        assertEqual(Math.PI, point6.measureAngle(), 1e-6)
    }

    testMeasureAngle() {
        const center = Point(4, 5)
        const point1 = Point(5, 5)
        assertEqual(0, point1.measureAngle(center), 1e-6)

        const point2 = Point(4 + Math.sqrt(3), 6)
        assertEqual(Math.PI / 6, point2.measureAngle(center), 1e-6)

        const point3 = Point(5, 6)
        assertEqual(Math.PI / 4, point3.measureAngle(center), 1e-6)

        const point4 = Point(5, 5 + Math.sqrt(3))
        assertEqual(Math.PI / 3, point4.measureAngle(center), 1e-6)

        const point5 = Point(4, 6)
        assertEqual(Math.PI / 2, point5.measureAngle(center), 1e-6)

        const point6 = Point(3, 5)
        assertEqual(Math.PI, point6.measureAngle(center), 1e-6)
    }

    testMeasureAngleSamePoint() {
        const origin = Point(0, 0)
        assertEqual(0, origin.measureAngle(), 1e-6)

        const point = Point(4, 5)
        assertEqual(0, point.measureAngle(point), 1e-6)
    }
}
