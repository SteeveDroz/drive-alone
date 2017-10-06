"use strict";

console.log('LOAD — path.js')

const createPath = function(points = null) {
    return {
        points: points,
        draw: function(context) {
            context.beginPath()
            context.moveTo(this.points[0].x, this.points[0].y)
            for (let i = 1; i < this.points.length; i++) {
                context.lineTo(this.points[i].x, this.points[i].y)
            }
            context.strokeStyle = '#f00'
            context.stroke()
        },
        getSegments: function() {
            const segments = []
            for (let i = 1; i < this.points.length; i++) {
                segments.push(createSegment(this.points[i - 1], this.points[i]))
            }
            return segments
        }
    }
}
