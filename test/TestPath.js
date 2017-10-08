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

    testDraw() {
        const canvas = document.createElement('canvas')
        canvas.width = 2
        canvas.height = 2
        const context = canvas.getContext('2d')

        const path = new Path([
            [0, 0],
            [2, 2]
        ])

        path.draw(context)

        const data = context.getImageData(0, 0, 2, 2).data
        UnitTest.assertEqual(255, data[3]) // Alpha of pixel 1
        UnitTest.assertEqual(0, data[7]) // Alpha of pixel 2
        UnitTest.assertEqual(0, data[11]) // Alpha of pixel 3
        UnitTest.assertEqual(255, data[15]) // Alpha of pixel 4
    }
}
