import * as Objecter from './Objecter'

export const find = {id, all, first}

function id(elementId, root = document) {
  if (isWebComponent(root)) {
    root = root.shadowRoot
  }
  return root.getElementById(elementId)
}

function all(selector, root = document) {
  if (isWebComponent(root)) {
    root = root.shadowRoot
  }
  return Array.from(root.querySelectorAll(selector))
}

function first(selector, root = document) {
  if (isWebComponent(root)) {
    root = root.shadowRoot
  }

  if (!selector.includes('/')) {
    return root.querySelector(selector)
  }

  const path = selector.split('/').map(p => p.trim()).filter(p => p.length > 0)

  for (const p of path) {
    root = nextChild(p, root)
    if (root === null) break
  }
  return root
}

function nextChild(pathItem, root) {
  const isShadowRoot = pathItem === 'shadowRoot' || pathItem === 'shadow-root'
  return isShadowRoot ? root.shadowRoot : root.querySelector(pathItem)
}

function isWebComponent(el) {
  return el && el.shadowRoot && el.tagName.includes('-')
}

export function getAttributes(el) {
  const result = {}
  const atts = el.attributes
  if (!atts || atts.length === 0) return result

  for (let i = 0; i < atts.length; i++) {
    const a = atts[i]
    result[a.name] = a.value
  }
  return result
}

export function createElements(html = '') {
  html = html.trim()
  if (!html) return []

  const temp = document.createElement('template')
  temp.innerHTML = html
  return Array.from(temp.content.childNodes)
}

export function createElement({name, attributes = {}, content = ''} = {}) {
  const html = tag({name, attributes, content})

  const elements = createElements(html)
  if (elements.length === 0) return null
  return elements[0]
}

export function tag({name, attributes = {}, content = ''} = {}) {
  if (!name) return ''
  const atts = attsToString(attributes)
  return `<${name}${atts}>${content}</${name}>`
}

function attsToString(attributes) {
  const array = []
  Objecter.forEachEntry(attributes, (k, v) => {
    array.push(`${k}="${v}"`)
  })
  const sep = array.length > 0 ? ' ' : ''
  return sep + array.join(' ')
}

const LOCATIONS = new Set(['beforebegin', 'afterbegin', 'beforeend', 'afterend'])

/**
 * Add html or elements to given target element
 * @param target The element to add to
 * @param tobeAdded Can be html string, a DOM element, or an array of DOM elements
 * @param location String. Where to add in the target. Ons of:
 * beforebegin, afterbegin, beforeend, afterend. The default if ommited is beforeend
 *@returns {boolean} true if added, false if not
*/
export function add(target, tobeAdded, location = 'beforeend') {
  location = location.toLowerCase()
  if (!LOCATIONS.has(location)) return false

  if (Objecter.isString(tobeAdded)) {
    target.insertAdjacentHTML(location, tobeAdded)
  } else {
    addElements(target, tobeAdded, location)
  }
  return true
}

function addElements(target, tobeAdded, location) {
  if (Array.isArray(tobeAdded)) {
    tobeAdded.forEach(el => target.insertAdjacentElement(location, el))
  } else {
    target.insertAdjacentElement(location, tobeAdded)
  }
}

export function setContent(element, content) {
  element.innerHTML = ''
  element.append(content)
}

export function removeElements(selector, root = document) {
  const elements = all(selector, root)
  elements.forEach(el => {
    el.parentNode.removeChild(el)
  })
}

export function classPresentIf(el, cssClass, condition) {
  const func = condition ? 'add' : 'remove'
  el.classList[func](cssClass)
}
