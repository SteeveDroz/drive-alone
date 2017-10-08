"use strict";

console.log('LOAD — drive-alone.js')

const load = function() {
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

    setInterval(function() {
        update(data)
        draw(data, world, canvas.width, canvas.height)
    }, 10)
}

const update = function(data) {
    const {
        cars
    } = data
    cars.forEach(car => car.move())
}

const draw = function(data, world, width, height) {
    const {
        cars,
        path
    } = data

    world.fillStyle = '#eee'
    world.fillRect(0, 0, width, height)

    world.save()
    const best = getBest(cars)
    world.translate(width / 2 - best.location.x, height / 2 - best.location.y)

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
