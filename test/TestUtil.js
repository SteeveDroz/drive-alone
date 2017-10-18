"use strict";

class TestUtil {
    testMap() {
        UnitTest.assertEqual(13, Util.map(0.3, [0, 1], [10, 20]), 1e-6)
        UnitTest.assertEqual(10, Util.map(0, [0, 1], [10, 20]), 1e-6)
        UnitTest.assertEqual(20, Util.map(1, [0, 1], [10, 20]), 1e-6)
        UnitTest.assertEqual(9, Util.map(-0.1, [0, 1], [10, 20]), 1e-6)
        UnitTest.assertEqual(0.3, Util.map(13, [10, 20], [0, 1]), 1e-6)
        UnitTest.assertEqual(0, Util.map(10, [10, 20], [0, 1]), 1e-6)
        UnitTest.assertEqual(1, Util.map(20, [10, 20], [0, 1]), 1e-6)
        UnitTest.assertEqual(-0.1, Util.map(9, [10, 20], [0, 1]), 1e-6)
        UnitTest.assertEqual(0.7, Util.map(3, [10, 0], [0, 1]), 1e-6)
        UnitTest.assertEqual(0.7, Util.map(3, [0, 10], [1, 0]), 1e-6)
    }
}
