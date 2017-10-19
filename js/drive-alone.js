"use strict";

console.log('LOAD — drive-alone.js')

const loadWorld = function() {
    const canvas = document.getElementById('world')
    canvas.width = 300
    canvas.height = 300
    const world = canvas.getContext('2d')

    const data = {}

    data.generation = 0
    data.countdown = data.initialCountdown = 1000

    data.cars = []
    for (let i = 0; i < 10; i++) {
        data.cars.push(new Car())
    }

    data.paths = [new Path([
        [-100, 50],
        [100, 300],
        [200, 400]
    ]), new Path([
        [100, 50],
        [300, 300],
        [400, 400]
    ])]

    data.target = new Point(0, 0)

    setInterval(function() {
        updateWorld(data)
        drawWorld(data, world, canvas.width, canvas.height)
    }, 10)
}

const updateWorld = function(data) {
    if (--data.countdown < 0) {
        const rankedCars = data.cars.sort((a, b) => a.getFitness() - b.getFitness())
        const newCars = []
        newCars.push(rankedCars[9])
        for (let i = 0; i < 8; i++) {
            const car1 = rankedCars[Math.floor(Util.map(Math.random(), [0, 1], [1, 9]))]
            const car2 = rankedCars[Math.floor(Util.map(Math.random(), [0, 1], [1, 9]))]
            newCars.push(car1.mate(car2))
        }
        newCars.push(new Car())

        data.cars = newCars

        data.countdown = data.initialCountdown
    }

    const {
        cars,
        paths,
        target,
        generation
    } = data

    cars.forEach(car => {
        if (car.collide(paths)) {
            car.working = false
            car.color = '#888'
        } else {
            car.color = '#440'
        }
        car.move()
        car.useCaptors(paths)
        car.useBrain()
    })

    const bestCar = Car.findBest(cars)
    bestCar.color = '#f80'
    sharedElements.bestCar = bestCar

    const targetDisplacement = bestCar.location.translate(target.negate()).getVectorOfLength(Math.min(10, bestCar.location.getDistance(target)))
    data.target = data.target.translate(targetDisplacement)
}

const drawWorld = function(data, world, width, height) {
    const {
        cars,
        paths,
        target,
        generation
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
    paths.forEach(path => {
        path.draw(world)
    })

    world.restore()

    world.fillStyle = '#000'
    world.fillText(`Generation: ${generation}`, 0, 10)
    world.fillText(`Countdown: ${data.countdown}`, 0, 20)
}
