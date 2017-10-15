"use strict";

console.log('LOAD — drive-alone.js')

const loadWorld = function() {
    const canvas = document.getElementById('world')
    canvas.width = 300
    canvas.height = 300
    const world = canvas.getContext('2d')

    const data = {}

    data.cars = []
    for (let i = 0; i < 10; i++) {
        data.cars.push(new Car())
    }

    data.path = new Path([
        [-100, 50],
        [100, 300],
        [200, 400]
    ])

    data.target = new Point(0, 0)

    setInterval(function() {
        updateWorld(data)
        drawWorld(data, world, canvas.width, canvas.height)
    }, 10)
}

const updateWorld = function(data) {
    const {
        cars,
        path,
        target
    } = data

    cars.forEach(car => {
        if (car.collide(path)) {
            car.working = false
            car.color = '#888'
        } else {
            car.color = '#440'
        }
        car.move()
        car.useCaptors(path)
        car.useBrain()
    })

    const bestCar = Car.findBest(cars)
    bestCar.color = '#f80'

    const targetDisplacement = bestCar.location.translate(target.negate()).getVectorOfLength(Math.min(10, bestCar.location.getDistance(target)))
    data.target = data.target.translate(targetDisplacement)
}

const drawWorld = function(data, world, width, height) {
    const {
        cars,
        path,
        target
    } = data

    world.fillStyle = '#eee'
    world.fillRect(0, 0, width, height)

    world.save()

    world.translate(width / 2 - target.x, height / 2 - target.y)

    world.beginPath()
    for (let i = -1000; i < 1000; i += 50) {
        world.moveTo(i, -1000)
        world.lineTo(i, 1000)
        world.moveTo(-1000, i)
        world.lineTo(1000, i)
    }
    world.strokeStyle = '#ccc'
    world.stroke()

    cars.forEach(car => car.draw(world))
    path.draw(world)

    world.restore()
}
