class TestSegment {
    testConstructor() {
        const segment = new Segment(new Point(0, 0), new Point(1, 1))
        UnitTest.assertDefined(segment)
        UnitTest.assertEqual(new Point(0, 0), segment.start)
        UnitTest.assertEqual(new Point(1, 1), segment.end)
    }
}
