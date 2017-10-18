"use strict";

class Neuron {

    constructor() {
        this.inputs = []
        this.bias = Math.random()
    }

    static sigmoid(z) {
        return 1 / (1 + Math.exp(-z))
    }

    addInput(source) {
        this.inputs.push({
            source: source,
            weight: Math.random()
        })
    }

    evaluate() {
        const sum = this.inputs.map(function(input) {
            return input.source.evaluate() * input.weight
        }).reduce(function(a, b) {
            return a + b
        }, 0)
        return Neuron.sigmoid(sum + this.bias)
    }
}
