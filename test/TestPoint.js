"use strict";

class TestPoint {

    testConstructorOrigin() {
        const origin = new Point(0, 0)
        UnitTest.assertDefined(origin.x)
        UnitTest.assertDefined(origin.y)
        UnitTest.assertEqual(0, origin.x)
        UnitTest.assertEqual(0, origin.y)
    }

    testConstructor() {
        const point = new Point(4, 5)
        UnitTest.assertDefined(point.x)
        UnitTest.assertDefined(point.y)
        UnitTest.assertEqual(4, point.x)
        UnitTest.assertEqual(5, point.y)
        UnitTest.assertEqual(new Point(4, 5), point)
    }

    testNegateOrigin() {
        const point = new Point(0, 0)
        UnitTest.assertEqual(new Point(0, 0), point.negate())
    }

    testNegate() {
        const point = new Point(4, 5)
        UnitTest.assertEqual(new Point(-4, -5), point.negate())
    }

    testNegateNotModify() {
        const point = new Point(4, 5)
        point.negate()
        UnitTest.assertEqual(new Point(4, 5), point)
    }

    testTranslateOrigin() {
        const point = new Point(4, 5)
        UnitTest.assertEqual(new Point(4, 5), point.translate())
    }

    testTranslate() {
        const point = new Point(4, 5)
        UnitTest.assertEqual(new Point(7, -1), point.translate(new Point(3, -6)))
    }

    testTranslateNotModify() {
        const point = new Point(4, 5)
        point.translate(new Point(1, 1))
        UnitTest.assertEqual(new Point(4, 5), point)
    }

    testRotateNoArguments() {
        const point = new Point(1, 0)
        UnitTest.assertEqual(new Point(Math.sqrt(3) / 2, 1 / 2), point.rotate(Math.PI / 6), 1e-6)
        UnitTest.assertEqual(new Point(Math.sqrt(2) / 2, Math.sqrt(2) / 2), point.rotate(Math.PI / 4), 1e-6)
        UnitTest.assertEqual(new Point(1 / 2, Math.sqrt(3) / 2), point.rotate(Math.PI / 3), 1e-6)
        UnitTest.assertEqual(new Point(0, 1), point.rotate(Math.PI / 2), 1e-6)
        UnitTest.assertEqual(new Point(-1, 0), point.rotate(Math.PI), 1e-6)
        UnitTest.assertEqual(new Point(1, 0), point.rotate(2 * Math.PI), 1e-6)
    }

    testRotate() {
        const point = new Point(4, 5)
        const center = new Point(3, 5)
        UnitTest.assertEqual(new Point(3 + Math.sqrt(3) / 2, 5 + 1 / 2), point.rotate(Math.PI / 6, center), 1e-6)
        UnitTest.assertEqual(new Point(3 + Math.sqrt(2) / 2, 5 + Math.sqrt(2) / 2), point.rotate(Math.PI / 4, center), 1e-6)
        UnitTest.assertEqual(new Point(3 + 1 / 2, 5 + Math.sqrt(3) / 2), point.rotate(Math.PI / 3, center), 1e-6)
        UnitTest.assertEqual(new Point(3, 6), point.rotate(Math.PI / 2, center), 1e-6)
        UnitTest.assertEqual(new Point(2, 5), point.rotate(Math.PI, center), 1e-6)
        UnitTest.assertEqual(new Point(4, 5), point.rotate(2 * Math.PI, center), 1e-6)

    }

    testRotateNotModify() {
        const point = new Point(4, 5)
        point.rotate(1)
        UnitTest.assertEqual(new Point(4, 5), point)
    }

    testMeasureAngleNoArguments() {
        const point1 = new Point(1, 0)
        UnitTest.assertEqual(0, point1.measureAngle(), 1e-6)

        const point2 = new Point(Math.sqrt(3), 1)
        UnitTest.assertEqual(Math.PI / 6, point2.measureAngle(), 1e-6)

        const point3 = new Point(1, 1)
        UnitTest.assertEqual(Math.PI / 4, point3.measureAngle(), 1e-6)

        const point4 = new Point(1, Math.sqrt(3))
        UnitTest.assertEqual(Math.PI / 3, point4.measureAngle(), 1e-6)

        const point5 = new Point(0, 1)
        UnitTest.assertEqual(Math.PI / 2, point5.measureAngle(), 1e-6)

        const point6 = new Point(-1, 0)
        UnitTest.assertEqual(Math.PI, point6.measureAngle(), 1e-6)
    }

    testMeasureAngle() {
        const center = new Point(4, 5)
        const point1 = new Point(5, 5)
        UnitTest.assertEqual(0, point1.measureAngle(center), 1e-6)

        const point2 = new Point(4 + Math.sqrt(3), 6)
        UnitTest.assertEqual(Math.PI / 6, point2.measureAngle(center), 1e-6)

        const point3 = new Point(5, 6)
        UnitTest.assertEqual(Math.PI / 4, point3.measureAngle(center), 1e-6)

        const point4 = new Point(5, 5 + Math.sqrt(3))
        UnitTest.assertEqual(Math.PI / 3, point4.measureAngle(center), 1e-6)

        const point5 = new Point(4, 6)
        UnitTest.assertEqual(Math.PI / 2, point5.measureAngle(center), 1e-6)

        const point6 = new Point(3, 5)
        UnitTest.assertEqual(Math.PI, point6.measureAngle(center), 1e-6)
    }

    testMeasureAngleSame() {
        const origin = new Point(0, 0)
        UnitTest.assertEqual(0, origin.measureAngle(), 1e-6)

        const point = new Point(4, 5)
        UnitTest.assertEqual(0, point.measureAngle(point), 1e-6)
    }
}
