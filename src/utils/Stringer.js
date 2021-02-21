// Provide String handling functions

import * as Objecter from './Objecter'

/**
 * Find the index of a given string inside another
 * @param {String} st The string to search
 * @param {String} search The string to look for
 * @param {Integer default 0} fromIndex Starting index in st
 * @param {Boolean defaule false} ignoreCase is the search case sensitive or not
 * @returns the index of search if found. -1 if not found.
 */
export function indexOf(st, search, fromIndex = 0, ignoreCase = false) {
  if (!st) return -1
  if (ignoreCase) {
    return st.toLowerCase().indexOf(search.toLowerCase(), fromIndex)
  }
  return st.indexOf(search, fromIndex)
}

/**
 * Index of first charcter matching the given criterion
 * @param {String} st The string to search
 * @param {Function} callback a function that takes a character as an argument
 * and return true or false based on desired criterion
 */
export function indexOfFirstMatch(st, callback) {
  if (!callback || !st) return -1

  return st.split('').findIndex(callback)
}

/**
 * Index of last charcter matching the given criterion
 * @param {String} st The string to search
 * @param {Function} callback a function that takes a character as an argument
 * and return true or false based on desired criterion
 */
export function indexOfLastMatch(st, callback) {
  if (!callback || !st) return -1

  const chars = st.split('')
  for (let i = chars.length; i >= 0; --i) {
    if (callback(chars[i], i)) return i
  }
  return -1
}

/**
 * Check if a given string starts with a given search string.
 * @param {String} st The string to search
 * @param {String} search The desired start
 * @param {Boolean} ignoreCase case sensitivity
 */
export function startsWith(st = '', search = undefined, ignoreCase = false) {
  if (ignoreCase) {
    const start = st.substring(0, search.length).toLowerCase()
    return search.toLowerCase() === start
  }

  return st.startsWith(search)
}

/**
 * Check if a given string ends with a given search string.
 * @param {String} st The string to search
 * @param {String} search The desired start
 * @param {Boolean} ignoreCase case sensitivity
 */
export function endsWith(st, search, ignoreCase = false) {
  if (ignoreCase) {
    return st.toLowerCase().endsWith(search.toLowerCase())
  }
  return st.endsWith(search)
}

/**
 * Remove a given prefix from a string, if found.
 * @param {String} st The string to search
 * @param {String} prefix The prefix string to remove
 * @param {Boolean} ignoreCase
 */
export function removePrefix(st, prefix, ignoreCase = false) {
  if (startsWith(st, prefix, ignoreCase)) {
    st = st.substring(prefix.length)
  }
  return st
}

/**
 * Remove a given suffix from a string, if found.
 * @param {*} st The string to search
 * @param {*} suffix The suffix string to remove
 * @param {*} ignoreCase
 */
export function removeSuffix(st, suffix, ignoreCase = false) {
  if (endsWith(st, suffix, ignoreCase)) {
    st = st.substring(0, st.length - suffix.length)
  }
  return st
}

/**
 * Remove a given prefix and suffix from a string.
 * @param {*} st The string to search
 * @param {*} prefix The prefix string to remove
 * @param {*} suffix The suffix string to remove
 * @param {*} ignoreCase
 */
export function removeSurrounding(st, prefix, suffix, ignoreCase = false) {
  return removeSuffix(removePrefix(st, prefix, ignoreCase), suffix, ignoreCase)
}

/**
 * Find the substring after the first occurance of a search string
 * @param {*} st The string to search
 * @param {*} search The string to look for
 * @param {*} ignoreCase
 * Returns the substring after search. Returns empty string if not found
 */
export function substringAfter(st, search, ignoreCase = false) {
  if (!search) {
    return st
  }
  const i = indexOf(st, search, 0, ignoreCase)
  if (i < 0) return ''

  return st.substring(i + search.length)
}

/**
 * Find the substring before the first occurance of a search string
 * @param {*} st The string to search
 * @param {*} search The string to look for
 * @param {*} ignoreCase
 * Returns the substring before search. Returns whole string if not found
 */
export function substringBefore(st, search, ignoreCase = false) {
  if (!search) {
    return ''
  }
  const i = indexOf(st, search, 0, ignoreCase)
  if (i < 0) return st

  return st.substring(0, i)
}

/**
 * Trim given string.
 * @param {String} s The string to trim
 * @returns The trimmed string. If string is null or undefined, returns empty string
 */
export function trim(s) {
  if (isEmpty(s)) return ''
  if (! Objecter.isString(s)) {
    s = String(s)
  }
  return s.trim(s)
}

/**
 * Check if given string is undefined, null, or zero length
 * @param {String} s
 */
export function isEmpty(s) {
  return s === undefined || s === null || s === ''
}

/**
 * Search text for keys in values, and replace them.
 * @param {String} text The template text
 * @param {Object} values An object with keys/values to replace in the template
 * @param {String} preTag Optional, default '${'. The tag prefix
 * @param {String} postTag Optional, default '}'. The tag suffix
 */
export function replaceTemplate(text = '', values = {}, preTag = '${', postTag = '}') {
  Objecter.forEachEntry(values, (k, v) => {
    if (v !== undefined) {
      k = preTag + k + postTag
      text = text.replaceAll(k, v)
    }
  })
  return text
}