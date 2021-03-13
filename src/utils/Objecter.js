// Provides functions related to object manipulation.

/** Check if given argument is null or undefined */
export function isNil(x) {
  return x === null || x === undefined
}

/** Check if given argument is of String type */
export function isString(s) {
  return isType(s, 'String')
}

/** Check if given argument is of Function type */
export function isFunction(f) {
  return isType(f, 'Function')
}

/** Check if given argument is of Date type */
export function isDate(d) {
  return isType(d, 'Date')
}

/** Check if argument is a valid number or a string that can be parsed to a number */
export function isNumber(n) {
  if (isType(n, 'Number')) {
    if (Number.isNaN(n)) return false
    return Number.isFinite(n)
  }
  if (!isString(n)) return false

  n = n.trim()
  if (n === '') return false
  return !isNaN(n)
}

/** Check if argument is a valid integer or a string that can be parsed to an integer */
export function isInteger(n) {
  if (! isNumber(n)) return false
  return Number.isInteger(Number.parseFloat(n))
}

function isType(v, type) {
  return Object.prototype.toString.call(v) === `[object ${type}]`
}

/**
 *
 * @param {Array or Object} object to traverse its members
 * @param {callback function} func The function will be called with
 * (key, value) as aruments
 */
export function forEachEntry(object, func) {
  if (!object || !func) return

  if (Array.isArray(object)) {
    object.forEach((v, index) => {
      func(index, v)
    })
    return
  }

  Object.entries(object).forEach(p => func(p[0], p[1]))
}

/** Check if the given object has a property with given name */
export function has(object, propName) {
  if (!object || !propName) return false
  return Object.prototype.hasOwnProperty.call(object, propName)
}

/** Perform deep equals test */
export function equals(a, b) {
  if (a === b) return true
  if (a === undefined || b === undefined) return false
  return isEqual(a, b)
}

function isEqual(a, b) {
  if (isSimpleType(a) || isSimpleType(b)) return a === b
  return isEqualCompoundType(a, b)
}

const simpleTypes = new Set(['boolean', 'number', 'bigint', 'string', 'symbol'])

function isSimpleType(v) {
  return simpleTypes.has(typeof v)
}

function isEqualCompoundType(a, b) {
  if (!isEqualType(a, b)) return false

  if (isEqualDates(a, b)) return true
  return isEqualObjects(a, b)
}

function isEqualType(a, b) {
  return prototypeToString(a) === prototypeToString(b)
}

function prototypeToString(v) {
  return Object.prototype.toString.call(v)
}

function isEqualDates(a, b) {
  if (isDate(a) && isDate(b)) {
    return a.getTime() === b.getTime()
  }
  return false
}

function isEqualObjects(a, b) {
  const akeys = Object.keys(a)
  if (akeys.length !== Object.keys(b).length) return false

  return akeys.every(k => equals(a[k], b[k]))
}

