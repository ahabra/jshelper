import {expect} from '@esm-bundle/chai'
import * as Stringer from '../Stringer'

describe('Stringer', ()=> {
  describe('indexOf', ()=> {
    const indexOf = Stringer.indexOf

    it('finds index of search target', ()=> {
      expect(indexOf()).to.equal(-1)
      expect(indexOf('', 'a')).to.equal(-1)
      expect(indexOf('ab', 'b')).to.equal(1)
      expect(indexOf('abcb', 'b', 2)).to.equal(3)
      expect(indexOf('ab', 'B', 0, true)).to.equal(1)
    })
  })

  describe('indexOfFirstMatch', ()=> {
    const indexOfFirstMatch = Stringer.indexOfFirstMatch

    it('finds match', ()=> {
      expect(indexOfFirstMatch()).to.equal(-1)
      expect(indexOfFirstMatch('a')).to.equal(-1)
      expect(indexOfFirstMatch('ab2', c => c >= '0' && c <= '9')).
        to.equal(2)
    })
  })

  describe('indexOfLastMatch', ()=> {
    const indexOfLastMatch = Stringer.indexOfLastMatch

    it('finds last match', ()=> {
      expect(indexOfLastMatch()).to.equal(-1)
      expect(indexOfLastMatch('a')).to.equal(-1)
      let lastIndex
      expect(indexOfLastMatch('aba', (c, i) => {
        lastIndex = i
        return c === 'a'
      })).to.equal(2)
      expect(lastIndex).to.equal(2)
    })
  })

  describe('startsWith', ()=> {
    const startsWith = Stringer.startsWith

    it('checks if a string starts with a given value', ()=> {
      expect(startsWith()).to.be.false
      expect(startsWith('ab', 'a')).to.be.true
      expect(startsWith('ab', 'x')).to.be.false
      expect(startsWith('ab', 'A')).to.be.false
      expect(startsWith('ab', 'A', true)).to.be.true
    })
  })

  describe('replaceAll', ()=> {
    const replaceAll = Stringer.replaceAll
    let originalReplaceAll

    beforeEach(()=> {
      originalReplaceAll = String.prototype.replaceAll
    })

    afterEach(()=> {
      String.prototype.replaceAll = originalReplaceAll
    })

    it('replaces all occurences of a string', ()=> {
      expect(replaceAll('abba', 'b', 'x')).to.equal('axxa')
      expect(replaceAll('abba', 'B', 'x')).to.equal('abba')
      expect(replaceAll('', 'b', 'x')).to.equal('')
      expect(replaceAll('abc', /b/g, 'x')).to.equal('axc')

    })

    it('replaces even when String.replaceAll() is not available', ()=> {
      String.prototype.replaceAll = undefined

      expect(replaceAll('abba', 'b', 'x')).to.equal('axxa')
      expect(replaceAll('abc', /b/, 'x')).to.equal('axc')
    })
  })

  describe('replaceTemplate', ()=> {
    const replaceTemplate = Stringer.replaceTemplate

    it('replaces keys in template', ()=> {
      const text = '${a}=${b}'
      const values = {
        a: 'id',
        b: 42
      }
      expect(replaceTemplate(text, values)).to.equal('id=42')
      expect(replaceTemplate(text)).to.equal(text)
    })

    it('allows changing tag markers', ()=> {
      const text = '[a]=[b]'
      const values = {
        a: 'id',
        b: 42
      }
      expect(replaceTemplate(text, values, '[', ']')).to.equal('id=42')
    })

  })

  describe('stripStart', ()=> {
    const stripStart = Stringer.stripStart

    it('returns empty string if given string is undefined or empty', ()=> {
      expect(stripStart('')).to.equal('')
      expect(stripStart()).to.equal('')
    })

    it('returns given string if no stripChars', ()=> {
      expect(stripStart('a')).to.equal('a')
    })

    it('removes stripChars from start of string', ()=> {
      expect(stripStart('abcd', 'ba')).to.equal('cd')
      expect(stripStart('abcd', 'ab')).to.equal('cd')
      expect(stripStart('aba', 'ba')).to.equal('')
      expect(stripStart('abcd', 'x')).to.equal('abcd')
    })

  })

  describe('stripEnd', ()=> {
    const stripEnd = Stringer.stripEnd

    it('returns empty string if given string is undefined or empty', ()=> {
      expect(stripEnd('')).to.equal('')
      expect(stripEnd()).to.equal('')
    })

    it('returns given string if no stripChars', ()=> {
      expect(stripEnd('a')).to.equal('a')
    })

    it('removes stripChars from end of string', ()=> {
      expect(stripEnd('abcd', 'cd')).to.equal('ab')
      expect(stripEnd('abcd', 'dc')).to.equal('ab')
      expect(stripEnd('abcd', 'dcd')).to.equal('ab')
      expect(stripEnd('abcd', 'dcd')).to.equal('ab')
      expect(stripEnd('cddd', 'cd')).to.equal('')
    })
  })

  describe('strip', ()=> {
    const strip = Stringer.strip

    it('returns empty string if given string is undefined or empty', ()=> {
      expect(strip('')).to.equal('')
      expect(strip()).to.equal('')
    })

    it('returns given string if no stripChars', ()=> {
      expect(strip('a')).to.equal('a')
    })

    it('strips from both sides of string', ()=> {
      expect(strip('xyaby', 'xy')).to.equal('ab')
      expect(strip('xyab', 'xy')).to.equal('ab')
      expect(strip('abyy', 'xy')).to.equal('ab')
      expect(strip('yy', 'xy')).to.equal('')
    })

  })

})