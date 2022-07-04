const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const { listProductsMock, mockObj } = require('../mocks/products.mock');


describe('productsModel', () => {
  beforeEach(() => sinon.restore());

  describe('#exists', () => {
    it('ao mandar um id de produto que existe deve retornar `true`', async () => {
      const id = 2
      // arranjo
      sinon.stub(connection, 'execute').resolves(true);
      // assertiva
      const result = await productsModel.exists(id);
      // ação
      expect(result).to.be.equal(true);
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
      sinon.stub(connection, 'query').resolves([listProductsMock]);
      // ação/assertiva
      return expect(productsModel.getAllProducts()).to.eventually.be.deep.equal(listProductsMock);
    });

    it('deve falhar se o connection.query disparar um erro', () => {
      sinon.stub(connection, 'query').rejects();
      return expect(productsModel.getAllProducts()).to.eventually.be.rejected;
    });
  });

  describe('#getProductById', () => {
    it('deve retornar um objeto ao mandar um id de produto existente', () => {
      sinon.stub(connection, 'query').resolves([[mockObj]]);
      return expect(productsModel.getProductById(2)).to.eventually.be.deep.equal(mockObj);
    });

    it('deve retornar undefined ao mandar um id de produto inexistente', async () => {
      sinon.stub(connection, 'query').resolves([[]]);
      const result = await productsModel.getProductById(202);
      return expect(result).to.be.undefined;
    });
  });

});