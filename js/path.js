"use strict";

console.log('LOAD — path.js');

const drawPath = function(context, points) {
    context.beginPath()
    context.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y)
    }
    context.strokeStyle = '#f00'
    context.stroke()
}
