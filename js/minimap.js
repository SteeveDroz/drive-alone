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
        cars,
        checkpoints,
        target
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

    minimap.fillStyle = '#f00'
    checkpoints.forEach(checkpoint => {
        minimap.beginPath()
        minimap.arc(checkpoint.x, checkpoint.y, 15, 0, 2 * Math.PI)
        minimap.fill()
    })

    cars.forEach(car => {
        car.draw(minimap)
    })

    minimap.strokeStyle = '#00f'
    minimap.lineWidth = 10
    minimap.beginPath()
    minimap.moveTo(target.x - 50, target.y)
    minimap.lineTo(target.x + 50, target.y)
    minimap.moveTo(target.x, target.y - 50)
    minimap.lineTo(target.x, target.y + 50)
    minimap.stroke()

    minimap.restore()
}
