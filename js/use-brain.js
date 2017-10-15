"use static";

const loadBrain = function() {
    const canvas = document.getElementById('brain')
    canvas.width = 300
    canvas.height = 300
    const brain = canvas.getContext('2d')

    const data = {}

    setInterval(function() {
        updateBrain(data)
        drawBrain(data, brain, canvas.width, canvas.height)
    })
}

const updateBrain = function(data) {

}

const drawBrain = function(data, brain, width, height) {
    brain.fillStyle = '#000'
    brain.fillRect(0, 0, width, height)
}
