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
}
