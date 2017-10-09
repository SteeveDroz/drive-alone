"use strict";

class TestCar {
    testContructor() {
        const car = new Car()
        UnitTest.assertTrue(car instanceof Car)
        UnitTest.assertEqual(new Point(0, 0), car.location)
        UnitTest.assertEqual(50, car.width)
        UnitTest.assertEqual(30, car.height)
        UnitTest.assertTrue(car.angle >= 0)
        UnitTest.assertTrue(car.angle < 2 * Math.PI)
        UnitTest.assertTrue(car.speed >= 0.9)
        UnitTest.assertTrue(car.speed < 1.1)
        UnitTest.assertTrue(car.steer >= -0.025)
        UnitTest.assertTrue(car.steer < 0.025)
        UnitTest.assertEqual(0, car.fitness)
        UnitTest.assertTrue(car.working)
    }

    testMove() {
        const car = new Car()
        car.angle = 0
        car.speed = 1
        car.steer = 0

        car.move()
        UnitTest.assertEqual(new Point(1, 0), car.location)
        UnitTest.assertEqual(1, car.speed)
        UnitTest.assertEqual(1, car.fitness)
        UnitTest.assertEqual(0, car.angle)

        car.steer = Math.PI / 6
        car.move()
        UnitTest.assertEqual(new Point(1 + Math.sqrt(3) / 2, 0.5), car.location, 1e-6)
        UnitTest.assertEqual(1, car.speed)
        UnitTest.assertEqual(2, car.fitness)
        UnitTest.assertEqual(Math.PI / 6, car.angle, 1e-6)

        car.move()
        UnitTest.assertEqual(Math.PI / 3, car.angle, 1e-6)
    }

    testDraw() {
        // I don't know how to test that
    }

    testGetCorners() {
        const car = new Car()
        car.location = new Point(100, 200)
        car.width = 20
        car.height = 50
        car.angle = 0

        UnitTest.assertEqual([new Point(110, 175), new Point(110, 225), new Point(90, 225), new Point(90, 175)], car.getCorners())
    }

    testGetSegments() {
        const car = new Car()
        car.location = new Point(100, 200)
        car.width = 20
        car.height = 50
        car.angle = 0

        UnitTest.assertEqual([new Segment(110, 175, 110, 225), new Segment(110, 225, 90, 225), new Segment(90, 225, 90, 175), new Segment(90, 175, 110, 175)], car.getSegments())
    }

    testCollide() {
        const car1 = new Car()
        car1.width = 10
        car1.height = 10
        car1.angle = 0

        const car2 = new Car()
        car2.width = 10
        car2.height = 10
        car2.angle = Math.PI / 4

        const path1 = new Path([
            [-100, -100],
            [-5, -100],
            [-5, 100],
            [100, 100]
        ])

        const path2 = new Path([
            [0, 9.999],
            [9.999, 0]
        ])

        UnitTest.assertFalse(car1.collide(path1))
        UnitTest.assertTrue(car1.collide(path2))
        UnitTest.assertTrue(car2.collide(path1))
        UnitTest.assertFalse(car2.collide(path2))
    }
}
