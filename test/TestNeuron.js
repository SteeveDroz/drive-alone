"use strict";

class TestNeuron {
    testConstructor() {
        const neuron = new Neuron()
        UnitTest.assertTrue(neuron instanceof Neuron)
    }

    testSigmoid() {
        UnitTest.assertEqual(0.006693, Neuron.sigmoid(-5), 1e-6)
        UnitTest.assertEqual(0.017986, Neuron.sigmoid(-4), 1e-6)
        UnitTest.assertEqual(0.047426, Neuron.sigmoid(-3), 1e-6)
        UnitTest.assertEqual(0.119203, Neuron.sigmoid(-2), 1e-6)
        UnitTest.assertEqual(0.268941, Neuron.sigmoid(-1), 1e-6)
        UnitTest.assertEqual(0.5, Neuron.sigmoid(0), 1e-6)
        UnitTest.assertEqual(0.731059, Neuron.sigmoid(1), 1e-6)
        UnitTest.assertEqual(0.880797, Neuron.sigmoid(2), 1e-6)
        UnitTest.assertEqual(0.952574, Neuron.sigmoid(3), 1e-6)
        UnitTest.assertEqual(0.982014, Neuron.sigmoid(4), 1e-6)
        UnitTest.assertEqual(0.993307, Neuron.sigmoid(5), 1e-6)
    }

    testAddInput() {
        const neuron = new Neuron()
        UnitTest.assertEqual(0, neuron.inputs.length)

        const source1 = new Neuron()
        const source2 = new Neuron()
        const source3 = new Neuron()

        neuron.addInput(source1)
        neuron.addInput(source2)
        neuron.addInput(source3)

        UnitTest.assertEqual(3, neuron.inputs.length)

        UnitTest.assertEqual(source1, neuron.inputs[0].source)
        UnitTest.assertEqual(source2, neuron.inputs[1].source)
        UnitTest.assertEqual(source3, neuron.inputs[2].source)
    }
}
