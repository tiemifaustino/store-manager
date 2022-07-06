const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const { listProductsMock, mockObj, listByArrayIdMock } = require('../mocks/products.mock');

describe('productsModel', () => {
  beforeEach(() => sinon.restore());

  describe('#exists', () => {
    it('ao mandar um `id` de produto que existe deve retornar `true`', async () => {
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
  describe('#get', () => {
    it('deve retornar um array com produtos ao consultar o banco', () => {
      // arranjo
      sinon.stub(connection, 'query').resolves([listProductsMock]);
      // ação/assertiva
      return expect(productsModel.get()).to.eventually.be.deep.equal(listProductsMock);
    });

    it('deve falhar se o `connection.query` disparar um erro', () => {
      sinon.stub(connection, 'query').rejects();
      return expect(productsModel.get()).to.eventually.be.rejected;
    });
  });

  describe('#listByArrayOfId', () => {
    it('deve retornar um array com produtos ao consultar o banco', () => {
      sinon.stub(connection, 'query').resolves([listByArrayIdMock]);
      return expect(productsModel.listByArrayOfId([1, 2])).to.eventually.be.deep.equal(listByArrayIdMock);
    });

    it('deve falhar se o `connection.query` disparar um erro', () => {
      sinon.stub(connection, 'query').rejects();
      return expect(productsModel.listByArrayOfId([])).to.eventually.be.rejected;
    });
  });

  describe('#getById', () => {
    it('deve retornar um objeto ao mandar um `id` de produto existente', () => {
      sinon.stub(connection, 'query').resolves([[mockObj]]);
      return expect(productsModel.getById(2)).to.eventually.be.deep.equal(mockObj);
    });

    it('deve retornar undefined ao mandar um `id` de produto inexistente', async () => {
      sinon.stub(connection, 'query').resolves([[]]);
      const result = await productsModel.getById(202);
      return expect(result).to.be.undefined;
    });
  });

  describe('#add', () => {
    it('ao enviar um objeto com o atributo `name` deve salvar os dados e retornar o produto adicionado', () => {
      const expectedId = 4
      sinon.stub(connection, 'query').resolves([{ insertId: expectedId }]);
      return expect(productsModel.add({ name: 'Produto X' })).to.eventually.be.deep.equal(expectedId);
    });
  });

});