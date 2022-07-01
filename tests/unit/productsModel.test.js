const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');
const { listProductsMock, mockObj } = require('../mocks/products.mock');

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

    it('ao mandar um id de produto que não existe deve retornar `false`', async () => {
      const id = 202
      sinon.stub(connection, 'execute').resolves(true);
      const result = await productsModel.exists(id)
      expect(result).to.be.eq(false);
    });
  });

  // usando o chaiAsPromised
  describe('#getAllProducts', () => {
    it('deve retornar um array com produtos ao consultar o banco', () => {
      // arranjo
      sinon.stub(connection, 'execute').resolves([listProductsMock]);
      // ação/assertiva
      expect(productsModel.getAllProducts()).to.eventually.be.deep.equal(listProductsMock);
    });

    it('deve falhar se o connection.execute disparar um erro', () => {
      sinon.stub(connection, 'execute').rejects();
      expect(productsModel.getAllProducts()).to.eventually.rejected;
    });
  });

  describe('#getProductById', () => {
    it('deve retornar um objeto ao mandar um id de produto existente', () => {
      sinon.stub(connection, 'execute').resolves([[mockObj]]);
      expect(productsModel.getProductById(2)).to.eventually.be.deep.equal(mockObj);
    });

    it('deve retornar undefined ao mandar um id de produto inexistente', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      const result = await productsModel.getProductById(202);
      expect(result).to.be.undefined;
    });
  });

});