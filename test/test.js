"use strict";

const test = function() {
    const results = document.getElementById('results')

    const tests = {
        TestPoint: TestPoint()
    }

    Object.keys(tests).forEach(function(testClass) {
        results.innerHTML += `<tr><th colspan="2">${testClass}</th></tr>`
        Object.keys(tests[testClass]).forEach(function(property) {
            if (tests[testClass][property] instanceof Function) {
                try {
                    tests[testClass][property]()
                    results.innerHTML += `<tr><td>${property}()</td><td style="background:green;color:white">OK</td></tr>`
                } catch (e) {
                    if (e.name == 'AssertError') {
                        results.innerHTML += `<tr><td>${property}()</td><td style="background:red;color:white">${e.message}</td></tr>`
                    } else {
                        results.innerHTML += `<tr><td colspan="2" style="background:red;color:white;font-weight:bold;white-space:pre">${e.message} ${(new Error).stack}</td></tr>`
                    }
                }
            }
        })
    })
}

const assertDefined = function(value) {
    if (value === undefined) throw AssertError('defined', value)
}

const assertUndefined = function(value) {
    if (value !== undefined) throw AssertError(undefined, value)
}

const assertTrue = function(value) {
    if (!value) throw AssertError(true, value)
}

const assertFalse = function(value) {
    if (value) throw AssertError(true, value)
}

const assertEqual = function(expected, value) {
    try {
        if (expected instanceof Array) {
            if (!(value instanceof Array)) throw Error
            if (expected.length != value.length) throw Error
            for (let i = 0; i < expected.length; i++) {
                assertEqual(expected[i], value[i])
            }
        } else if (expected instanceof Object) {
            if (!(value instanceof Object)) throw Error
            for (let property in expected) {
                if (!value.hasOwnProperty(property)) throw Error
                assertEqual(expected[property], value[property])
            }
        } else if (expected !== value) throw Error
    } catch (e) {
        throw AssertError(expected, value)
    }
}

const AssertError = function(expected, value) {
    const error = {
        name: 'AssertError',
        message: `The value ${value}(${typeof value}) is expected to be ${expected}(${typeof expected}) ${(new Error).stack.split(/[\r\n]+/)[3]}.`,
    }
    error.prototype = Error.prototype
    return error
}
