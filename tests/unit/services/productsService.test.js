const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { ValidationError } = require('joi');
const { listProductsMock, mockObj } = require('../mocks/products.mock');


describe('productsService', () => {
  beforeEach(() => sinon.restore());

  describe('#validateParamsId', () => {
    it('deve retornar o objeto ao mandar um id válido', () => {
      const validData = { id: 2 };
      const value = productsService.validateParamsId(validData);
      expect(value).to.be.deep.equal(validData);
    });

    it('deve retornar erro ao mandar um objeto com id inválido ', () => {
      expect(() => productsService.validateParamsId({ id: 'a' })).to.throws(ValidationError);
      expect(() => productsService.validateParamsId({ id: -1 })).to.throws(ValidationError);
      expect(() => productsService.validateParamsId({ id: 1.1 })).to.throws(ValidationError);
    });
  });

  describe('#checkIfExists', () => {
    it('deve retornar erro `NotFoundError` se o id fornecido for inexistente', () => {
      const id = 202
      sinon.stub(productsModel, 'exists').resolves(false);
      return expect(productsService.checkIfExists(id)).to.eventually.be.rejectedWith('Product not found');
    });
  });

  describe('#getAllProducts', () => {
    it('deve retornar um array com produtos se o model retornar um array', () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(listProductsMock);
      return expect(productsService.getAllProducts()).to.eventually.deep.equal(listProductsMock);
    });
  });

  describe('#getProductById', () => {
    it('deve retornar um objeto com as informações do produto se o id fornecido é existente', () => {
      sinon.stub(productsModel, 'getProductById').resolves(mockObj);
      return expect(productsService.getProductById(2)).to.eventually.deep.equal(mockObj);
    });

    it('deve retornar `undefined` se o id fornecido é inexistente', () => {
      sinon.stub(productsModel, 'getProductById').resolves(undefined);
      return expect(productsService.getProductById(202)).to.eventually.be.undefined;
    });
  });

});