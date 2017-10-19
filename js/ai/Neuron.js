"use strict";

class Neuron {

    constructor() {
        this.inputs = []
        this.bias = Util.map(Math.random(), [0, 1], [-10, 10])
    }

    static sigmoid(z) {
        return 1 / (1 + Math.exp(-z))
    }

    addInput(source) {
        this.inputs.push({
            source: source,
            weight: Util.map(Math.random(), [0, 1], [-10, 10])
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

    mate(other) {
        return this
        const child = new Neuron()
        child.inputs = this.inputs
        for (let i = 0; i < child.inputs.length; i++) {
            const thisWeight = this.inputs[i].weight
            const otherWeight = other.inputs[i].weight

            child.inputs[i].weight = Neuron.mateValue(thisWeight, otherWeight)
        }

        child.bias = Neuron.mateValue(this.bias, other.bias)

        return child
    }

    static mateValue(value1, value2) {
        const value = Math.random() < 0.5 ? thisWeight : otherWeight
        if (Math.random() < 0.05) {
            value += Util.map(Math.random(), [0, 1], [-value / 10, value / 10])
        }
        return value
    }
}
