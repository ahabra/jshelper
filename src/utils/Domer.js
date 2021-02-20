
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