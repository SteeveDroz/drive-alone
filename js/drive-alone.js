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
        data.cars.push(createCar())
    }

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
    world.fillStyle = '#eee'
    world.fillRect(0, 0, width, height)
    const {
        cars
    } = data

    cars.forEach(car => car.draw(world))
}
