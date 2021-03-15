import {expect} from '@esm-bundle/chai'

import * as LineCompare from '../LineCompare'

describe('LineCompare', ()=> {
  const compareLines = LineCompare.compareLines

  it('checks number of non-empty lines', ()=> {
    const t1 = 'a\nb'
    const t2 = 'ab'
    const expected = 't1 has 2 lines(s) while t2 has 1 line(s).'
    expect(compareLines(t1, t2)).to.equal(expected)
  })

  it('returns empty string if equal', ()=> {
    expect(compareLines('', '')).to.equal('')
    expect(compareLines()).to.equal('')
    expect(compareLines('')).to.equal('')
    expect(compareLines(null, null)).to.equal('')
    expect(compareLines(null, '')).to.equal('')
    expect(compareLines('a', 'a')).to.equal('')
    expect(compareLines('a\nb', 'a\nb')).to.equal('')
  })

  it('trims lines and ignore empty ones', ()=> {
    expect(compareLines('a  \n  b ', 'a\nb')).to.equal('')
    expect(compareLines('a\n\n\nb\n\n', 'a\nb')).to.equal('')
  })

  it('reports on the first difference', ()=> {
    const expected = 'Line #2 mismatch.\nb\nc'
    expect(compareLines('a\nb', 'a\nc')).to.equal(expected)
  })

  it('can skip trimming', ()=> {
    expect(compareLines('a ', 'a', {trim: false})).to.equal('Line #1 mismatch.\na \na')
  })

  it('can include empty lines', ()=> {
    const expected = 't1 has 2 lines(s) while t2 has 3 line(s).'
    expect(compareLines('a\nb', 'a\n\nb', {skipEmpty: false})).to.equal(expected)
  })

  it('can ignore case', ()=> {
    expect(compareLines('a', 'A', {caseSensitive: false})).to.equal('')
  })

})