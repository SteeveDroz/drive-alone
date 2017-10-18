"use strict";

class Util {
    static map(value, src, dest) {
        const percentage = (value - src[0]) / (src[1] - src[0])
        return dest[0] + percentage * (dest[1] - dest[0])
    }
}
