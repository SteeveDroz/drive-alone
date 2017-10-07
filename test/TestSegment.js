class TestSegment {
    testConstructor() {
        const segment = Segment(Point(0, 0), Point(1, 1))
        UnitTest.assertDefined(segment)
        UnitTest.assertEqual(Point(0, 0), segment.start)
        UnitTest.assertEqual(Point(1, 1), segment.end)
    }
}
