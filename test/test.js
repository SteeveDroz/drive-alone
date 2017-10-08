"use strict";

class UnitTest {
    constructor(tests = []) {
        this.tests = tests
    }

    static AssertError(expected, value) {
        const error = {
            name: 'AssertError',
            message: `The value ${JSON.stringify(value)}(${typeof value}) is expected to be ${JSON.stringify(expected)}(${typeof expected}) ${(new Error).stack.split(/[\r\n]+/)[3]}.`,
        }
        error.prototype = Error.prototype
        return error
    }

    run() {
        const results = document.getElementById('results')

        this.tests.forEach(testClass => {
            const testObject = new testClass()
            results.innerHTML += `<tr><th colspan="2">${testClass.name||'Please provide a class name'}</th></tr>`

            Object.getOwnPropertyNames(Object.getPrototypeOf(testObject)).forEach(property => {
                if (property != 'constructor' && testObject[property] instanceof Function) {
                    UnitTest.total = 0
                    try {
                        testObject[property]()
                        results.innerHTML += `<tr><td>${property}()</td><td style="background:green;color:white">OK (${UnitTest.total} assertion${UnitTest.total==1?'':'s'})</td></tr>`
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

    static assertDefined(value) {
        UnitTest.total += 1
        if (value === undefined) throw this.AssertError('defined', value)
    }

    static assertUndefined(value) {
        UnitTest.assertEqual(undefined, value)
    }

    static assertTrue(value) {
        UnitTest.assertEqual(true, value)
    }

    static assertFalse(value) {
        UnitTest.assertEqual(false, value)
    }

    static assertEqual(expected, value, limit = 0, count = true) {
        if (count) UnitTest.total += 1
        try {
            if (typeof expected !== typeof value) throw Error
            switch (typeof expected) {
                case 'array':
                    if (expected.length != value.length) throw Error
                    for (let i = 0; i < expected.length; i++) {
                        UnitTest.assertEqual(expected[i], value[i], limit, false)
                    }
                    break

                case 'object':
                    Object.getOwnPropertyNames(expected).forEach(function(property) {
                        if (typeof expected[property] === 'function') return
                        if (!value.hasOwnProperty(property)) throw Error
                        UnitTest.assertEqual(expected[property], value[property], limit, false)
                    })
                    break

                case 'number':
                    if (Math.abs(expected - value) > limit) throw Error
                    break

                default:
                    if (expected !== value) throw Error
            }
        } catch (e) {
            console.log(e.stack)
            throw this.AssertError(expected, value)
        }
    }
}
/*
const runUnitTests = function(tests = []) {
    const results = document.getElementById('results')

    tests.forEach(function(testClass) {
        const testObject = new testClass()
        results.innerHTML += `<tr><th colspan="2">${testClass.name||'Please provide a class name'}</th></tr>`
        Object.getOwnPropertyNames(testClass.prototype).forEach(function(property) {
            if (property != 'constructor' && testObject[property] instanceof Function) {
                try {
                    testObject[property]()
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

const assertEqual = function(expected, value, limit = 0) {
    try {
        if (typeof expected !== typeof value) throw Error
        switch (typeof expected) {
            case 'array':
                if (expected.length != value.length) throw Error
                for (let i = 0; i < expected.length; i++) {
                    assertEqual(expected[i], value[i], limit)
                }
                break

            case 'object':
                Object.getOwnPropertyNames(expected).forEach(function(property) {
                    if (typeof expected[property] === 'function') return
                    if (!value.hasOwnProperty(property)) throw Error
                    assertEqual(expected[property], value[property], limit)
                })
                break

            case 'number':
                if (Math.abs(expected - value) > limit) throw Error
                break

            default:
                if (expected !== value) throw Error
        }
    } catch (e) {
        throw AssertError(expected, value)
    }
}

const AssertError = function(expected, value) {
    const error = {
        name: 'AssertError',
        message: `The value ${JSON.stringify(value)}(${typeof value}) is expected to be ${JSON.stringify(expected)}(${typeof expected}) ${(new Error).stack.split(/[\r\n]+/)[3]}.`,
    }
    error.prototype = Error.prototype
    return error
}
*/
