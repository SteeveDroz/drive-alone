"use strict";

class Brain {
    constructor(...layers) {
        this.layers = layers
        const neurons = []
        for (let i = 0; i < layers.length; i++) {
            neurons[i] = []
            for (let j = 0; j < layers[i]; j++) {
                if (i == 0) {
                    neurons[i].push({
                        evaluate: function() {
                            return 0
                        },
                        name: '0-' + j
                    })
                } else {
                    const neuron = new Neuron()
                    for (let k = 0; k < neurons[i - 1].length; k++) {
                        neuron.addInput(neurons[i - 1][k])
                    }
                    neuron.name = i + '-' + j
                    neurons[i].push(neuron)
                }
            }
        }
        this.neurons = neurons
    }

    evaluate(...inputs) {
        if (inputs.length != this.neurons[0].length) {
            throw new Error()
        }

        for (let i = 0; i < inputs.length; i++) {
            this.neurons[0][i].evaluate = function() {
                return inputs[i]
            }
        }

        const data = this.neurons[this.neurons.length - 1].map(function(neuron) {
            return neuron.evaluate()
        })
        return data
    }

    createAlteration() {
        const brain = new Brain(...this.layers)
        for (let layer = 1; layer < brain.neurons.length; layer++) {
            for (let neuron = 0; neuron < brain.neurons[layer].length; neuron++) {
                for (let input = 0; input < brain.neurons[layer][neuron].inputs.length; input++) {
                    let weight = this.neurons[layer][neuron].inputs[input].weight
                    if (Math.random() < 0.01) {
                        weight += Util.map(Math.random(), [0, 1], [-10, 10])
                    }

                    brain.neurons[layer][neuron].inputs[input].weight = weight + Util.map(Math.random(), [0, 1], [-weight / 10, weight / 10])
                }
                let bias = this.neurons[layer][neuron].bias
                if (Math.random() < 0.01) {
                    bias += Util.map(Math.random(), [0, 1], [-10, 10])
                }

                brain.neurons[layer][neuron].bias = bias + Util.map(Math.random(), [0, 1], [-bias / 10, bias / 10])
            }
        }
        return brain
    }
}
