const load = function() {
    const canvas = document.getElementById('world')
    canvas.width = 300
    canvas.height = 300
    const world = canvas.getContext('2d')
    const data = {}

    setInterval(function() {
        update(data)
        draw(data, world, canvas.width, canvas.height)
    }, 1000)
}

const update = function(data) {}

const draw = function(data, world, width, height) {
    world.fillStyle = '#eee'
    world.fillRect(0, 0, width, height)
}
