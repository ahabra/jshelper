import {expect} from '@esm-bundle/chai'
import * as Objecter from '../Objecter'


describe('Objecter', () => {
  describe('isNil', ()=> {
    const isNil = Objecter.isNil

    it('checks null or undefined arg', ()=> {
      expect(isNil()).to.be.true
      expect(isNil(null)).to.be.true
      expect(isNil('')).to.be.false
      expect(isNil(false)).to.be.false
    })
  })

  describe('isString', () => {
    const isString = Objecter.isString
    it('checks its argument', () => {
      expect(isString('')).to.be.true
      expect(isString()).to.be.false
      expect(isString(null)).to.be.false
      expect(isString(false)).to.be.false
      expect(isString(1)).to.be.false
    })
  })

  describe('isFunction', ()=> {
    const isFunction = Objecter.isFunction

    it('Checks its argument', ()=> {
      expect(isFunction()).to.be.false
      expect(isFunction('')).to.be.false
      expect(isFunction(1)).to.be.false
      expect(isFunction(()=> {})).to.be.true
      expect(isFunction(it)).to.be.true
      expect(isFunction(alert)).to.be.true
    })
  })

  describe('forEachEntry', ()=> {
    const forEachEntry = Objecter.forEachEntry

    it('traveses arrays', ()=> {
      const array = ['a', 'b']
      let buffer = ''
      forEachEntry(array, (i, v)=> {
        buffer = `${buffer}[${i}:${v}]`
      })
      expect(buffer).to.equal('[0:a][1:b]')
    })

    it('traverses object', ()=> {
      const obj = {
        a: 1,
        b: 2
      }

      const out = {}

      forEachEntry(obj, (k, v)=> {
        out[k] = v
      })

      expect(out).to.eql(obj)
    })
  })

  describe('has', ()=> {
    const has = Objecter.has
    it('checks if object has a given property', ()=> {
      expect(has()).to.be.false
      expect(has({}, 'a')).to.be.false
      expect(has({a: 1}, 'a')).to.be.true
    })
  })

  describe('equals', ()=> {
    const equals = Objecter.equals
    it('checks for simple types', ()=> {
      expect(equals()).to.be.true
      expect(equals(1, 1)).to.be.true
      expect(equals(1)).to.be.false
    })

    it('checks for deep object equality', ()=> {
      const now = new Date()
      const d1 = {
        a: 1,
        b: {
          bb: 2
        },
        c: 'cc',
        now
      }
      const d2 = {
        a: 1,
        b: {
          bb: 2
        },
        c: 'cc',
        now
      }

      expect(d1).to.not.equal(d2)
      expect(d1).to.eql(d2)
      expect(equals(d1, d2)).to.be.true

      d2.x = true
      expect(equals(d1, d2)).to.be.false
    })
  })

})
