"use strict";

class Brain {
    constructor(...layers) {
        const neurons = []
        for (let i = 0; i < layers.length; i++) {
            neurons[i] = []
            for (let j = 0; j < layers[i]; j++) {
                if (i == 0) {
                    neurons[i].push({
                        value: 0,
                        evaluate: function() {
                            return value
                        }
                    })
                } else {
                    const neuron = new Neuron()
                    for (let k = 0; k < neurons[i - 1].length; k++) {
                        neuron.addInput(neurons[i - 1][k])
                    }
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
            this.neurons[0][i].value = inputs[i]
        }

        return this.neurons[this.neurons.length - 1].map(function(neuron) {
            return neuron.evaluate()
        })
    }
}
