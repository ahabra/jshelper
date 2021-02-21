import {expect} from '@esm-bundle/chai'
// import * as Helper from '../Helper'
import {Domer, Objecter, Stringer} from '../Helper'

describe('Helper', ()=> {

  it('wires Domer', ()=> {
    const p = Domer.tag({name: 'p'})
    expect(p).to.equal('<p></p>')
  })

  it('wires Objecter', ()=> {
    const flag = Objecter.isString('a')
    expect(flag).to.be.true
  })

  it('wires Stringer', ()=> {
    expect(Stringer.trim(' a ')).to.equal('a')
  })

})