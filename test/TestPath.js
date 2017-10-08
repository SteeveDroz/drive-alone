"use strict";

class TestPath {
    testConstructor() {
        const path = new Path([
            [0, 0],
            [1, 1]
        ])
        UnitTest.assertDefined(path)
        UnitTest.assertEqual([new Point(0, 0), new Point(1, 1)], path.points)
    }

    testBadConstructor() {
        let fail

        fail = false
        try {
            new Path()
            fail = true
        } catch (e) {
            UnitTest.success()
        }
        if (fail) {
            UnitTest.fail()
        }

        fail = false
        try {
            new Path(['a'])
            fail = true
        } catch (e) {
            UnitTest.success()
        }
        if (fail) {
            UnitTest.fail()
        }

        fail = false
        try {
            new Path('a')
            fail = true
        } catch (e) {
            UnitTest.success()
        }
        if (fail) {
            UnitTest.fail()
        }

        fail = false
        try {
            new Path([
                [0, 1],
                [2, 3, 4]
            ])
            fail = true
        } catch (e) {
            UnitTest.success()
        }
        if (fail) {
            UnitTest.fail()
        }
    }
}
