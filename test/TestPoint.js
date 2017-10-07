const TestPoint = function() {
    return {
        testCreateOrigin: function() {
            const origin = Point(0, 0)
            assertDefined(origin.x)
            assertDefined(origin.y)
            assertEqual(0, origin.x)
            assertEqual(0, origin.y)
        },

        testCreate: function() {
            const point = Point(4, 5)
            assertDefined(point.x)
            assertDefined(point.y)
            assertEqual(4, point.x)
            assertEqual(5, point.y)
            assertEqual(Point(4, 5), point)
        },

        testNegateOrigin: function() {
            const point = Point(0, 0)
            assertEqual(Point(0, 0), point.negate())
        },

        testNegate: function() {
            const point = Point(4, 5)
            assertEqual(Point(-4, -5), point.negate())
        },

        testNegateNotModify: function() {
            const point = Point(4, 5)
            point.negate()
            assertEqual(Point(4, 5), point)
        }
    }
}
