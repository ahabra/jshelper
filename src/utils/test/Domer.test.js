import {expect} from '@esm-bundle/chai'
import * as Domer from '../Domer'

describe('Domer', ()=> {
  beforeEach(removeTestDivs)

  describe('find', ()=> {
    const find = Domer.find

    describe('id', ()=> {
      it('finds an element by its id', ()=> {
        addDivs([1])
        expect(find.id('div1').innerText).to.equal('div1')
        expect(find.id('divX')).to.be.null
      })
    })

    describe('all', ()=> {
      it('finds elements matching selector', ()=> {
        addDivs([1, 2, 3])
        const found = find.all('.domer-test')
        expect(found.length).to.equal(3)
        expect(found[0].innerText).to.equal('div1')
        expect(found[1].innerText).to.equal('div2')
        expect(found[2].innerText).to.equal('div3')
      })

      it('returns an empty array if no match', ()=> {
        const found = find.all('.domer-test-NOT-THERE')
        expect(found).to.eql([])
      })

      it('finds elements inside a given container', ()=> {
        addDivs(['root'])
        const root = find.id('divroot')
        addDivs([1, 2], root)
        const found = find.all('.domer-test', root)
        expect(found.length).to.equal(2)
        expect(found[0].innerText).to.equal('div1')
        expect(found[1].innerText).to.equal('div2')
      })
    })

    describe('first', ()=> {
      it('finds first element that match selector', ()=> {
        addDivs([1, 2])
        expect(find.first('.domer-test').innerText).to.equal('div1')
        expect(find.first('.domer-test-NOT-THERE')).to.nested.null
      })

      it('searches following a / sepatrated path', ()=> {
        addNestedDivs([1, 2, 3])
        const found = find.first('#div1/#div2/#div3')
        expect(found.innerText).to.equal('div3')
      })

      it('returns null if any path element is not found', ()=> {
        addNestedDivs([1, 2, 3])
        const found = find.first('#div1/#divXX/#div3')
        expect(found).to.be.null
      })

      it('ignores empty path elements', ()=> {
        addNestedDivs([1, 2, 3])
        const found = find.first('#div1//#div2  ////  #div3')
        expect(found.innerText).to.equal('div3')
      })

    })

  })

  describe('getAttributes', ()=> {
    const getAttributes = Domer.getAttributes

    it('returns element attributes as an obbject', ()=> {
      addDivs([1])
      const div = Domer.find.id('div1')
      const expected = {
        id: 'div1',
        class: 'domer-test'
      }
      expect(getAttributes(div)).to.eql(expected)
    })
  })

  describe('createElements', ()=> {
    const createElements = Domer.createElements

    it('creates elements from html', ()=> {
      const html = divHtml(1) + divHtml(2)
      const elements = createElements(html)
      expect(elements.length).to.equal(2)
      expect(elements[0].innerText).to.equal('div1')
      expect(elements[1].innerText).to.equal('div2')
    })

    it('returns empty array if no html', ()=> {
      expect(createElements()).to.eql([])
      expect(createElements(' ')).to.eql([])
    })
  })

  describe('createElement', ()=> {
    const createElement = Domer.createElement

    it('creates element', ()=> {
      const name = 'p'
      const attributes = {
        a: '1',
        b: '2'
      }
      const content = 'foo'
      const el = createElement({name, attributes, content})
      expect(el.tagName).to.equal(name.toUpperCase())
      expect(el.innerText).to.equal(content)
      expect(Domer.getAttributes(el)).to.eql(attributes)

    })

    it('returns null if no name', ()=> {
      const el = createElement({})
      expect(el).to.be.null
    })
  })

  describe('tag', ()=> {
    it('creates html tag string', ()=> {
      const attributes = {
        a: 1,
        b: 2
      }
      const tag = Domer.tag({name: 't', attributes, content: 'foo'})
      expect(tag).to.equal('<t a="1" b="2">foo</t>')
    })

    it('returns empty string if no name provided', ()=> {
      expect(Domer.tag()).to.equal('')
      expect(Domer.tag({name: ''})).to.equal('')
    })
  })

  describe('add', ()=> {
    it('adds html string', ()=> {
      const html = divHtml(1)
      Domer.add(document.body, html)
      const found = Domer.find.all('.domer-test')
      expect(found.length).to.equal(1)
    })

    it('adds a DOM element', ()=> {
      const el = Domer.createElement({name: 'p', attributes: {
        class: 'domer-test'
      }})
      Domer.add(document.body, el)
      const found = Domer.find.all('.domer-test')
      expect(found.length).to.equal(1)
      expect(found[0].tagName).to.equal('P')
    })

    it('adds an array of elements', ()=> {
      const html = divHtml(1) + divHtml(2)
      const elements = Domer.createElements(html)

      Domer.add(document.body, elements)
      const found = Domer.find.all('.domer-test')
      expect(found.length).to.equal(2)
    })
  })

  describe('setContent', ()=> {
    it('sets the content of an element', ()=> {
      addDivs([1])
      const el = Domer.find.id('div1')
      expect(el.innerText).to.equal('div1')

      Domer.setContent(el, 'foo')
      expect(el.innerText).to.equal('foo')
    })
  })

  describe('removeElements', ()=> {
    const removeElements = Domer.removeElements

    it('removes selected elements', ()=> {
      addDivs([1, 2, 3])
      expect(Domer.find.all('.domer-test').length).to.equal(3)
      removeElements('.domer-test')
      expect(Domer.find.all('.domer-test').length).to.equal(0)
    })
  })

  describe('classPresentIf', ()=> {
    const classPresentIf = Domer.classPresentIf

    it('adds or remove class based on condition', ()=> {
      const el = Domer.createElement({name: 'p'})
      classPresentIf(el, 'c1', true)
      expect(el.classList[0]).to.equal('c1')
      classPresentIf(el, 'c1', false)
      expect(el.classList.length).to.equal(0)
    })
  })

})

function divHtml(id) {
  return `<div class="domer-test" id="div${id}">div${id}</div>`
}

function addDivs(ids, root = document.body) {
  ids.forEach(id => {
    root.insertAdjacentHTML('beforeend', divHtml(id))
  })
}

function addNestedDivs(ids, root = document.body) {
  ids.forEach(id => {
    addDivs([id], root)
    root = Domer.find.id('div' + id)
  })
}

function removeTestDivs() {
  const found = document.querySelectorAll('.domer-test')
  found.forEach(el => {
    el.parentNode.removeChild(el)
  })
}