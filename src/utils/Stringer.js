import * as Objecter from './Objecter'

export function indexOf(st, search, fromIndex = 0, ignoreCase = false) {
  if (!st) return -1
  if (ignoreCase) {
    return st.toLowerCase().indexOf(search.toLowerCase(), fromIndex)
  }
  return st.indexOf(search, fromIndex)
}

export function indexOfFirstMatch(st, callback) {
  if (!callback || !st) return -1

  return st.split('').findIndex(callback)
}

export function indexOfLastMatch(st, callback) {
  if (!callback || !st) return -1

  const chars = st.split('')
  for (let i = chars.length; i >= 0; --i) {
    if (callback(chars[i], i)) return i
  }
  return -1
}

export function startsWith(st = '', search = undefined, ignoreCase = false) {
  if (ignoreCase) {
    const start = st.substring(0, search.length).toLowerCase()
    return search.toLowerCase() === start
  }

  return st.startsWith(search)
}

export function endsWith(st, search, ignoreCase = false) {
  if (ignoreCase) {
    return st.toLowerCase().endsWith(search.toLowerCase())
  }
  return st.endsWith(search)
}

export function removePrefix(st, prefix, ignoreCase = false) {
  if (startsWith(st, prefix, ignoreCase)) {
    st = st.substring(prefix.length)
  }
  return st
}

export function removeSuffix(st, suffix, ignoreCase = false) {
  if (endsWith(st, suffix, ignoreCase)) {
    st = st.substring(0, st.length - suffix.length)
  }
  return st
}

export function removeSurrounding(st, prefix, suffix, ignoreCase = false) {
  return removeSuffix(removePrefix(st, prefix, ignoreCase), suffix, ignoreCase)
}

export function substringAfter(st, search, ignoreCase = false) {
  if (!search) {
    return st
  }
  const i = indexOf(st, search, 0, ignoreCase)
  if (i < 0) return ''

  return st.substring(i + search.length)
}

export function substringBefore(st, search, ignoreCase = false) {
  if (!search) {
    return ''
  }
  const i = indexOf(st, search, 0, ignoreCase)
  if (i < 0) return st

  return st.substring(0, i)
}

export function trim(s) {
  if (isEmpty(s)) return ''
  if (! Objecter.isString(s)) {
    s = String(s)
  }
  return s.trim(s)
}

export function isEmpty(s) {
  return s === undefined || s === null || s === ''
}

export function replaceTemplate(text = '', values = {}, preTag = '${', postTag = '}') {
  Objecter.forEachEntry(values, (k, v) => {
    if (v !== undefined) {
      k = preTag + k + postTag
      text = text.replaceAll(k, v)
    }
  })
  return text
}