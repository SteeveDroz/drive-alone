"use strict";

const loadMinimap = function() {
    const canvas = document.getElementById('minimap')
    canvas.width = 600
    canvas.height = 150
    const minimap = canvas.getContext('2d')

    const data = {}

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

    minimap.fillStyle = '#eee'
    minimap.fillRect(0, 0, width, height)

    minimap.save()
    minimap.scale(0.1, 0.1)
    minimap.translate(200, 200)
    minimap.lineWidth = 10
    paths.forEach(path => {
        path.draw(minimap)
    })

    cars.forEach(car => {
        car.draw(minimap)
    })

    minimap.restore()
}
