class TestSegment {
    testConstructorTwoArguments() {
        const segment = new Segment(new Point(0, 0), new Point(1, 1))
        UnitTest.assertDefined(segment)
        UnitTest.assertEqual(new Point(0, 0), segment.start)
        UnitTest.assertEqual(new Point(1, 1), segment.end)
    }

    testConstructorFourArguments() {
        const segment = new Segment(0, 0, 1, 1)
        UnitTest.assertDefined(segment)
        UnitTest.assertEqual(new Point(0, 0), segment.start)
        UnitTest.assertEqual(new Point(1, 1), segment.end)
    }

    testMeasureOrientation() {
        const segment = new Segment(0, 0, 1, 0)
        UnitTest.assertEqual(-1, segment.measureOrientation(new Point(10, -10)))
        UnitTest.assertEqual(0, segment.measureOrientation(new Point(10, 0)))
        UnitTest.assertEqual(1, segment.measureOrientation(new Point(10, 10)))
    }

    testIntersect() {
        // 4 | 4         3
        // 3 | |     2 /
        // 2 | 4     /
        // 1 | 1 - 3 + - - 1
        // 0 |       2
        // --+--------------
        //   | 0 1 2 3 4 5 6

        const segment1 = new Segment(0, 1, 6, 1)
        const segment2 = new Segment(3, 0, 3, 3)
        const segment3 = new Segment(2, 1, 5, 4)
        const segment4 = new Segment(0, 2, 0, 4)

        UnitTest.assertTrue(segment1.intersect(segment2))
        UnitTest.assertTrue(segment1.intersect(segment3))
        UnitTest.assertFalse(segment1.intersect(segment4))

        UnitTest.assertTrue(segment2.intersect(segment1))
        UnitTest.assertTrue(segment2.intersect(segment3))
        UnitTest.assertFalse(segment2.intersect(segment4))

        UnitTest.assertTrue(segment3.intersect(segment1))
        UnitTest.assertTrue(segment3.intersect(segment2))
        UnitTest.assertFalse(segment3.intersect(segment4))

        UnitTest.assertFalse(segment4.intersect(segment1))
        UnitTest.assertFalse(segment4.intersect(segment2))
        UnitTest.assertFalse(segment4.intersect(segment3))
    }
}
