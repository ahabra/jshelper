import {expect} from '@esm-bundle/chai'
import * as Objecter from '../Objecter'


describe('Objecter', () => {

  describe('isString', () => {
    it('checks its argument', () => {
      expect(Objecter.isString('')).to.be.true
    })

    it.skip('isString', () => {
      expect(true).to.be.false
    })
  })


})
