const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const sinon = require('sinon');
const { expect, use } = require('chai');
const chaiAsPromised = require('chai-as-promised');

use(chaiAsPromised);

describe('productsModel', () => {
  beforeEach(() => sinon.restore());

  describe('#exists', () => {
    it('ao mandar um id de produto que existe deve retornar `true`', async () => {
      // arranjo
      const id = 2
      sinon.stub(connection, 'execute').resolves(true);
      // assertiva
      const result = await productsModel.exists(id)
      // ação
      expect(result).to.be.eq(true);
    });
  });
});