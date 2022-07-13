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

  describe('#validateParamsId', () => {
    it('deve retornar o objeto ao mandar um `id` válido', () => {
      const validData = { id: 2 };
      const value = salesService.validateParamsId(validData);
      expect(value).to.be.deep.equal(validData);
    });

    it('deve retornar erro ao mandar um objeto com `id` inválido ', () => {
      expect(() => salesService.validateParamsId({ id: 'a' })).to.throws(ValidationError);
      expect(() => salesService.validateParamsId({ id: -1 })).to.throws(ValidationError);
      expect(() => salesService.validateParamsId({ id: 1.1 })).to.throws(ValidationError);
    });
  });

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

  describe('#checkIfExists', () => {
    it('deve retornar caso o `salesModel.exists` retorne true', () => {
      sinon.stub(salesModel, 'exists').resolves(true);
      return expect(salesService.checkIfExists(1)).to.eventually.be.undefined;
    });

    it('deve disparar um erro caso `salesModel.exists` também dispare', () => {
      sinon.stub(salesModel, 'exists').rejects();
      return expect(salesService.checkIfExists(0)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `salesModel.exists` retorne false', () => {
      sinon.stub(salesModel, 'exists').resolves(false);
      return expect(salesService.checkIfExists(0)).to.eventually.be.rejectedWith('Sale not found');
    });
  });

  describe('#list', () => {
    it('deve retornar uma lista caso o `salesProductsModel.listAllSales` retorne', () => {
      sinon.stub(salesProductsModel, 'listAllSales').resolves([[]]);
      return expect(salesService.list()).to.eventually.be.deep.equal([[]]);
    });

    it('deve disparar um erro caso `salesProductsModel.listAllSales` dispare um erro', () => {
      sinon.stub(salesProductsModel, 'listAllSales').rejects();
      return expect(salesService.list()).to.eventually.be.rejected;
    });
  });

  describe('#listById', () => {
    it('deve retornar uma lista caso o `salesProductsModel.listSalesById` retorne', () => {
      sinon.stub(salesProductsModel, 'listSalesById').resolves([[]]);
      return expect(salesService.listById(1)).to.eventually.be.deep.equal([[]]);
    });

    it('deve disparar um erro caso `salesProductsModel.listSalesById` dispare um erro', () => {
      sinon.stub(salesProductsModel, 'listSalesById').rejects();
      return expect(salesService.listById(0)).to.eventually.be.rejected;
    });
  });

  describe('#add', () => {
    it('ao receber no parâmetro `data` dados válidos deve salvar a venda no banco e retornar o `id` da venda', async () => {
      const expectedId = 4
      sinon.stub(salesModel, 'add').resolves(expectedId);
      sinon.stub(salesProductsModel, 'bulkAddBySales').resolves(true);
      return expect(salesService.add(listAddMock)).to.eventually.be.equal(expectedId);
    });

    it('deve disparar um erro caso `salesModel.bulkAddBySales` dispare um erro', () => {
      sinon.stub(salesModel, 'add').resolves();
      sinon.stub(salesProductsModel, 'bulkAddBySales').rejects();
      return expect(salesService.add(listAddMock)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `salesModel.add` dispare um erro', () => {
      sinon.stub(salesModel, 'add').rejects();
      return expect(salesService.add({ episodes: [] })).to.eventually.be.rejected;
    });
  });

  describe('#edit', () => {
    it('deve retornar `undefined` caso sucesso', () => {
      sinon.stub(salesProductsModel, 'edit').resolves();
      return expect(salesService.edit(1, [{}])).to.eventually.be.undefined;
    });

    it('deve disparar um erro caso o `salesProductsModel.edit` dispare', () => {
      sinon.stub(salesProductsModel, 'edit').rejects();
      return expect(salesService.edit(1, [{}])).to.eventually.be.rejected;
    });
  });

  describe('#remove', () => {
    it('deve retornar `undefined` caso o `salesModel.remove` remova a venda', () => {
      sinon.stub(salesModel, 'remove').resolves();
      return expect(salesService.remove(1)).to.eventually.be.undefined;
    });

    it('deve disparar um erro caso `salesModel.remove` dispare um erro', () => {
      sinon.stub(salesModel, 'remove').rejects();
      return expect(salesService.remove(1)).to.eventually.be.rejected;
    });
  });

});