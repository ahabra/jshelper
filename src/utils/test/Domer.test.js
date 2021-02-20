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