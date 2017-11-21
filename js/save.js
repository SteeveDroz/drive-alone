"use strict";

const loadSave = function() {
    document.getElementById('showBrainData').onclick = showBrainData
    document.getElementById('loadBrainData').onclick = loadBrainData
}
const showBrainData = function() {
    const brainData = document.getElementById('brainData')
    const brainValue = JSON.stringify(sharedElements.cars.map(car => car.brain))
    brainData.value = brainValue
    brainData.select()
}

const loadBrainData = function() {
    const brainData = document.getElementById('brainData')
    try {
        const brainValue = JSON.parse(brainData.value)
        for (let i = 0; i < brainValue.length; i++) {
            const car = sharedElements.cars[i]
            car.load(brainValue[i])
        }
    } catch (e) {
        console.log(e);
        brainData.style.transition = '0.2s'
        brainData.style.background = 'red'
        brainData.style.color = 'white'
        setTimeout(() => {
            brainData.style.transition = '3s'
            brainData.style.background = 'transparent'
            brainData.style.color = 'black'
        }, 500)
    }
}
