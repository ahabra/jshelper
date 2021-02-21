import {expect} from '@esm-bundle/chai'
import Helper from '../Helper'

describe('Helper', ()=> {

  it('test wiring', ()=> {
    const flag = Helper.Objecter.isString('a')
    expect(flag).to.be.true
  })

})