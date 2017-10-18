"use strict";

class UnitTest {
    constructor(tests = []) {
        this.tests = tests
        this._results = {}
    }

    run() {
        this._results = {}

        this.tests.forEach(testClass => {
            this._results[testClass.name] = {}
            const testObject = new testClass()
            results.innerHTML += `<tr><th colspan="2">${testClass.name||'Please provide a class name'}</th></tr>`

            Object.getOwnPropertyNames(Object.getPrototypeOf(testObject)).forEach(property => {
                if (property != 'constructor' && testObject[property] instanceof Function) {
                    UnitTest.total = 0
                    try {
                        testObject[property]()
                        this._results[testClass.name][property] = {
                            success: true,
                            assertions: UnitTest.total
                        }
                    } catch (e) {
                        if (e.name == 'AssertError') {
                            this._results[testClass.name][property] = {
                                success: false,
                                assertions: UnitTest.total,
                                message: e.message
                            }
                        } else {
                            this._results[testClass.name][property] = {
                                success: false,
                                assertions: 0,
                                message: e.stack.split(/[\r\n]+/).slice(0, 2).join('')
                            }
                            console.log(e.stack);
                        }
                    }
                }
            })
        })
    }

    get results() {
        return this._results
    }

    static AssertError(expected, value) {
        const stack = (new Error).stack.split(/[\r\n]+/)
        const message = stack.filter(line => !line.match(/\/UnitTest\.js:\d+:\d+\)$/))[1].trim()
        const error = {
            name: 'AssertError',
            message: `The value ${JSON.stringify(value)}(${typeof value}) is expected to be ${JSON.stringify(expected)}(${typeof expected}) ${message}`,
        }
        error.prototype = Error.prototype
        return error
    }

    static success() {
        UnitTest.total += 1
    }
    static fail() {
        UnitTest.total += 1
        throw UnitTest.AssertError('fail', 'fail')
    }

    static assertNotUndefined(value) {
        UnitTest.total += 1
        if (value === undefined) throw UnitTest.AssertError('defined', value)
    }

    static assertUndefined(value) {
        UnitTest.assertEqual(undefined, value)
    }

    static assertNotNull(value) {
        UnitTest.total += 1
        if (value === null) throw UnitTest.AssertError('not null', value)
    }

    static assertNull(value) {
        UnitTest.total += 1
        if (value !== null) throw UnitTest.AssertError(null, value)
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
            console.log((new Error).stack)
            throw UnitTest.AssertError(expected, value)
        }
    }
}
