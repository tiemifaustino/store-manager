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

});