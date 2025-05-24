import * as Stringer from './Stringer'

/** Compare two texts, line by line */
export function compareLines(t1, t2,
  { trim = true, skipEmpty = true, caseSensitive = true } =
  {trim: true, skipEmpty: true, caseSensitive: true}) {

  t1 = toLines(t1, {trim, skipEmpty})
  t2 = toLines(t2, {trim, skipEmpty})

  if (t1.length !== t2.length) {
    return `t1 has ${t1.length} lines(s) while t2 has ${t2.length} line(s).`
  }

  return compareArraysOfLines(t1, t2, caseSensitive)
}

function compareArraysOfLines(t1, t2, caseSensitive) {
  for (let i = 0; i < t1.length; i++) {
    const result = compareTwoLines(t1[i], t2[i], i, caseSensitive)
    if (result.length > 0) {
      return result
    }
  }

  return ''
}

function compareTwoLines(t1, t2, index, caseSensitive) {
  const a = caseSensitive ? t1 : t1.toLowerCase()
  const b = caseSensitive ? t2 : t2.toLowerCase()
  if (a !== b) {
    return `Line #${index + 1} mismatch.\n${t1}\n${t2}`
  }
  return ''
}

function toLines(t, {trim, skipEmpty}) {
  if (trim) {
    t = Stringer.trim(t)
  }
  t = t.split('\n')
  if (trim) {
    t = t.map(ln => Stringer.trim(ln))
  }
  if (skipEmpty) {
    t = t.filter(ln => !!ln)
  }
  return t
}