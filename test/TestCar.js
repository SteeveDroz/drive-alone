"use strict";

class TestCar {
    testContructor() {
        const checkpoints = [new Point(0, 0), new Point(100, 0)]
        const car = new Car(checkpoints)
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
        UnitTest.assertEqual(900, car.getFitness())
        UnitTest.assertTrue(car.working)
    }

    testMove() {
        const checkpoints = [new Point(0, 0), new Point(100, 0)]
        const car = new Car(checkpoints)
        car.angle = 0
        car.speed = 1
        car.steer = 0

        car.move()
        UnitTest.assertEqual(new Point(1, 0), car.location)
        UnitTest.assertEqual(1, car.speed)
        UnitTest.assertEqual(901, car.getFitness())
        UnitTest.assertEqual(0, car.angle)

        car.steer = Math.PI / 2
        car.move()
        UnitTest.assertEqual(new Point(1, 1), car.location, 1e-6)
        UnitTest.assertEqual(1, car.speed)
        UnitTest.assertEqual(1000 - Math.sqrt(99 * 99 + 1), car.getFitness(), 1e-6)
        UnitTest.assertEqual(Math.PI / 2, car.angle, 1e-6)

        car.move()
        UnitTest.assertEqual(Math.PI, car.angle, 1e-6)
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

        UnitTest.assertEqual([new Point(110, 225), new Point(110, 175), new Point(90, 175), new Point(90, 225)], car.getCorners())
    }

    testGetSegments() {
        const car = new Car()
        car.location = new Point(100, 200)
        car.width = 20
        car.height = 50
        car.angle = 0

        UnitTest.assertEqual([new Segment(110, 225, 110, 175), new Segment(110, 175, 90, 175), new Segment(90, 175, 90, 225), new Segment(90, 225, 110, 225)], car.getSegments())
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

        const paths1 = [new Path([
            [-100, -100],
            [-5.01, -100],
            [-5.01, 100],
            [100, 100]
        ])]

        const paths2 = [new Path([
            [0, 9.999],
            [9.999, 0]
        ])]

        UnitTest.assertFalse(car1.collide(paths1))
        UnitTest.assertTrue(car1.collide(paths2))
        UnitTest.assertTrue(car2.collide(paths1))
        UnitTest.assertFalse(car2.collide(paths2))
    }

    testFindBest() {
        const checkpoints = [new Point(0, 0), new Point(100, 0)]
        const car1 = new Car(checkpoints)
        car1.fitness = 1000

        const car2 = new Car(checkpoints)
        car2.fitness = 1000

        const car3 = new Car(checkpoints)
        car3.fitness = 1000

        const car4 = new Car(checkpoints)
        car4.fitness = 1001

        const car5 = new Car(checkpoints)
        car5.fitness = 1000

        UnitTest.assertEqual(car4, Car.findBest([car1, car2, car3, car4]))
    }
}
