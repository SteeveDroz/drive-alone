"use strict";

const brainLayersSpacing = 75
const brainNeuronsSpacing = 60
const brainMargin = 25
const brainLayers = 5
const brainNeurons = 6

const loadBrain = function() {
    const canvas = document.getElementById('brain')
    canvas.width = (brainLayers - 1) * brainLayersSpacing + 2 * brainMargin
    canvas.height = (brainNeurons - 1) * brainNeuronsSpacing + 2 * brainMargin
    const brain = canvas.getContext('2d')

    const data = {}

    setInterval(function() {
        updateBrain(data)
        drawBrain(data, brain, canvas.width, canvas.height)
    }, 10)
}

const updateBrain = function(data) {
    data.neurons = sharedElements.bestCar === undefined ? [] : sharedElements.bestCar.brain.neurons
}

const drawBrain = function(data, brain, width, height) {
    const {
        neurons
    } = data

    brain.fillStyle = '#888'
    brain.fillRect(0, 0, width, height)

    for (let i = 0; i < neurons.length; i++) {
        for (let j = 0; j < neurons[i].length; j++) {
            const neuron = neurons[i][j]
            const center = getCenter(i, j)

            if (i > 0) {
                for (let k = 0; k < neuron.inputs.length; k++) {
                    const inputCenter = getCenter(i - 1, k)
                    brain.beginPath()
                    brain.moveTo(center.x, center.y)
                    brain.lineTo(inputCenter.x, inputCenter.y)
                    brain.lineWidth = Math.abs(neuron.inputs[k].weight)
                    brain.strokeStyle = neuron.inputs[k].weight < 0 ? '#000' : '#fff'
                    brain.stroke()
                }
            }
        }
    }

    brain.strokeStyle = '#888'
    brain.lineWidth = 2
    for (let i = 0; i < neurons.length; i++) {
        for (let j = 0; j < neurons[i].length; j++) {
            const neuron = neurons[i][j]
            const center = getCenter(i, j)

            brain.beginPath()
            brain.arc(center.x, center.y, i == 0 ? 10 : Math.abs(neuron.bias) * 2, 0, 2 * Math.PI, 0, 0)
            brain.fillStyle = neuron.bias < 0 ? '#000' : '#fff'
            brain.fill()
            brain.stroke()
        }
    }
}

const getCenter = function(layer, neuron) {
    return new Point(brainLayersSpacing * layer + brainMargin, brainNeuronsSpacing * (neuron + layer / 2) + brainMargin)
}
