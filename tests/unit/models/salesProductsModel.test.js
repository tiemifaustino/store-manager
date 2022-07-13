const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const connection = require('../../../models/connection');
const salesProductsModel = require('../../../models/salesProductsModel');
const { listAddMock } = require('../mocks/products.mock');

describe('salesProductsModel', () => {
  beforeEach(() => sinon.restore());

  describe('#bulkAddBySales', () => {
    it('deve retornar `true` ao adicionar os dados no banco', () => {
      const saleId = 3;
      const items = listAddMock;

      sinon.stub(connection, 'query').resolves([{ affectedRows: 2 }]);
      return expect(salesProductsModel.bulkAddBySales(saleId, items)).to.eventually.be.true;
    });

    it('deve retornar `false` ao receber no parâmetro `items` um array vazio', () => {
      const saleId = 3;
      const items = [];

      sinon.stub(connection, 'query').resolves([{ }]);
      return expect(salesProductsModel.bulkAddBySales(saleId, items)).to.eventually.be.false;
    });
  });

  describe('#listAllSales', () => {
    it('deve retornar uma lista caso o `connection.query` retorne', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      return expect(salesProductsModel.listAllSales()).to.eventually.deep.equal([]);
    });

    it('deve disparar um erro caso o `connection.query` dispare um erro', () => {
      sinon.stub(connection, 'query').rejects();
      return expect(salesProductsModel.listAllSales()).to.eventually.be.rejected;
    });
  });

  describe('#listSalesById', () => {
    it('deve retornar uma lista caso o `connection.query` retorne', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      return expect(salesProductsModel.listSalesById(1)).to.eventually.deep.equal([]);
    });

    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(connection, 'query').rejects();
      return expect(salesProductsModel.listSalesById(1)).to.eventually.be.rejected;
    });
  });

  describe('#edit', () => {
    it('deve retornar nada caso sucesso', () => {
      sinon.stub(connection, 'query').resolves();
      return expect(salesProductsModel.edit(1, {})).to.eventually.be.undefined;
    });

    it('deve disparar um erro caso o `connection.query` dispare um erro', () => {
      sinon.stub(connection, 'query').rejects();
      return expect(salesProductsModel.edit(1, {})).to.eventually.be.rejected;
    });
  });

});