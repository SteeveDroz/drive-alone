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

    mate(other) {
        const child = new Brain(...this.layers)
        for (let layerId = 1; layerId < child.neurons.length; layerId++) {
            for (let neuronId = 0; neuronId < child.neurons[layerId].length; neuronId++) {
                child.neurons[layerId][neuronId] = this.neurons[layerId][neuronId].mate(other.neurons[layerId][neuronId])
            }
        }
        return child
    }
}
