
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
