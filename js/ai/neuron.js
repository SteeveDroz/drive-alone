"use strict";

class Neuron {

    constructor() {
        this.inputs = []
        this.bias = 0
    }

    static sigmoid(z) {
        return 1 / (1 + Math.exp(-z))
    }

    addInput(source) {
        inputs.push({
            source: source,
            weight: 1
        })
    }

    evaluate() {
        const sum = this.inputs.map(function(input) {
            return input.source.evaluate() * input.weight
        }).reduce(function(a, b) {
            a + b
        }, 0)
        return Neuron.sigmoid(sum + this.bias)
    }

}
