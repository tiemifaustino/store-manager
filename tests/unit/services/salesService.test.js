const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const salesProductsModel = require('../../../models/salesProductsModel');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const { ValidationError } = require('joi');
const { listAddMock, listAddMockWithoutProductId, listAddMockWithoutQuantity, listAddMockWithQuantityZero } = require('../mocks/products.mock');

describe('salesService', () => {
  beforeEach(() => sinon.restore());

  describe('#validateBody', () => {
    it('deve retornar o array de objetos ao mandar um array de objetos válido', () => {
      const validData = listAddMock;
      const value = salesService.validateBody(validData);
      expect(value).to.be.deep.equal(validData);
    });

    it('deve retornar erro ao mandar um array de objetos inválido ', () => {
      expect(() => salesService.validateBody(listAddMockWithoutProductId)).to.throws(ValidationError);
      expect(() => salesService.validateBody(listAddMockWithoutQuantity)).to.throws(ValidationError);
      expect(() => salesService.validateBody(listAddMockWithQuantityZero)).to.throws(ValidationError);
    });
  });

  describe('#add', () => {
    it('ao receber no parâmetro `data` dados válidos deve salvar a venda no banco e retornar o `id` da venda', async () => {
      const expectedId = 4

      sinon.stub(salesModel, 'add').resolves(expectedId);
      sinon.stub(salesProductsModel, 'bulkAddBySales').resolves(true);

      return expect(salesService.add(listAddMock)).to.eventually.be.equal(expectedId);
    });
  });

});