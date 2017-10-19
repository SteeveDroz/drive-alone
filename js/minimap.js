"use strict";

const loadMinimap = function() {
    const canvas = document.getElementById('minimap')
    canvas.width = 600
    canvas.height = 150
    const minimap = canvas.getContext('2d')

    const data = {}

    data.ratio = 0.2

    setInterval(function() {
        updateMinimap(data)
        drawMinimap(data, minimap, canvas.width, canvas.height)
    }, 10)
}

const updateMinimap = function(data) {}

const drawMinimap = function(data, minimap, width, height) {
    const {
        paths,
        cars
    } = sharedElements

    const {
        ratio
    } = data

    minimap.fillStyle = '#eee'
    minimap.fillRect(0, 0, width, height)

    minimap.save()
    minimap.scale(ratio, ratio)
    minimap.translate(200, 200)
    minimap.lineWidth = 1 / ratio
    paths.forEach(path => {
        path.draw(minimap)
    })

    cars.forEach(car => {
        car.draw(minimap)
    })

    minimap.restore()
}
