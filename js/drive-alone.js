"use strict";

console.log('LOAD — drive-alone.js')

const loadWorld = function() {
    const canvas = document.getElementById('world')
    canvas.width = 300
    canvas.height = 300
    const world = canvas.getContext('2d')

    const data = {}

    data.generation = 0
    data.countdown = data.initialCountdown = 10000

    data.paths = [new Path([
        [-80, -80],
        [100, -80],
        [200, -50],
        [300, -50],
        [1000, 0],
        [1000, 100],
        [1150, 250],
        [1150, 350],
        [1000, 400],
        [700, 400],
        [700, 350],
        [650, 350],
        [650, 400],
        [300, 400],
        [300, 380],
        [260, 380],
        [260, 420],
        [300, 420],
        [300, 400]
    ]), new Path([
        [-80, -80],
        [-80, 80],
        [100, 80],
        [200, 50],
        [800, 100],
        [950, 250],
        [700, 200],
        [300, 250],
        [100, 300],
        [50, 400],
        [100, 500],
        [200, 550],
        [800, 500],
        [1100, 500],
        [1300, 400],
        [2000, 450],
        [2100, 550]
    ]), new Path([
        [1150, 350],
        [1200, 300],
        [2000, 400],
        [2100, 300]
    ]), new Path([
        [1100, 250],
        [1050, 350]
    ])]

    sharedElements.paths = data.paths

    data.checkpoints = [new Point(0, 0),
        new Point(200, 0),
        new Point(400, 20),
        new Point(600, 40),
        new Point(800, 60),
        new Point(950, 150),
        new Point(1050, 240),
        new Point(1000, 350),
        new Point(800, 300),
        new Point(600, 320),
        new Point(400, 320),
        new Point(200, 400),
        new Point(400, 470),
        new Point(600, 470),
        new Point(800, 460),
        new Point(1000, 450),
        new Point(1200, 380),
        new Point(1400, 375),
        new Point(1800, 400),
        new Point(2000, 425),
        new Point(2200, 450),
    ]

    sharedElements.checkpoints = data.checkpoints

    data.cars = []
    for (let i = 0; i < 10; i++) {
        data.cars.push(new Car(data.checkpoints))
    }

    data.target = new Point(0, 0)

    setInterval(function() {
        updateWorld(data)
        drawWorld(data, world, canvas.width, canvas.height)
    }, 10)
}

const updateWorld = function(data) {
    if (--data.countdown < 0) {
        const rankedCars = data.cars.sort((a, b) => a.getFitness() - b.getFitness()).reverse()
        data.cars = []
        for (let i = 0; i < 4; i++) {
            data.cars = data.cars.concat(rankedCars[i].createNextGeneration(3 - i))
            data.cars.push(rankedCars[i].clone())
        }
        data.cars.push(new Car(data.checkpoints))

        data.generation += 1
        data.countdown = data.initialCountdown
    }

    const {
        cars,
        paths,
        target
    } = data

    let atLeastOneWorking = false
    cars.forEach(car => {
        if (car.collide(paths)) {
            car.working = false
        }
        if (car.working) {
            car.color = '#440'
        } else {
            car.color = '#888'
        }
        if (car.working) {
            atLeastOneWorking = true
        }
        car.move()
        car.useCaptors(paths)
        car.useBrain()
    })

    if (!atLeastOneWorking) {
        data.countdown = 0
        data.target = new Point(0, 0)
    }

    sharedElements.cars = cars

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
    world.fillText(`Fitness: ${Car.findBest(cars).getFitness()}`, 0, 30)
    world.fillText(`Car life: ${Car.findBest(cars).countdown}`, 0, 40)
}
