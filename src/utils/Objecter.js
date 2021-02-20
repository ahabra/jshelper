export function isNil(x) {
  return x === null || x === undefined
}

export function isString(s) {
  return isType(s, 'String')
}

export function isFunction(f) {
  return isType(f, 'Function')
}

export function isDate(d) {
  return isType(d, 'Date')
}

function isType(v, type) {
  return Object.prototype.toString.call(v) === `[object ${type}]`
}

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

