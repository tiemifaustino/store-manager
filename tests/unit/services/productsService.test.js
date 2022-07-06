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
    it('deve retornar o objeto ao mandar um `id` válido', () => {
      const validData = { id: 2 };
      const value = productsService.validateParamsId(validData);
      expect(value).to.be.deep.equal(validData);
    });

    it('deve retornar erro ao mandar um objeto com `id` inválido ', () => {
      expect(() => productsService.validateParamsId({ id: 'a' })).to.throws(ValidationError);
      expect(() => productsService.validateParamsId({ id: -1 })).to.throws(ValidationError);
      expect(() => productsService.validateParamsId({ id: 1.1 })).to.throws(ValidationError);
    });
  });

  describe('#validateBodyAdd', () => {
    it('deve retornar o objeto ao mandar um `name` válido', () => {
      const validData = { name: 'Produto X' };
      const value = productsService.validateBodyAdd(validData);
      expect(value).to.be.deep.equal(validData);
    });

    it('deve retornar erro ao mandar um objeto com `name` vazio ou inválido ', () => {
      expect(() => productsService.validateParamsId({ name: 'Pro' })).to.throws(ValidationError);
      expect(() => productsService.validateParamsId({ name: '' })).to.throws(ValidationError);
    });
  });

  describe('#checkIfExists', () => {
    it('deve retornar erro `NotFoundError` se o id fornecido for inexistente', () => {
      const id = 202
      sinon.stub(productsModel, 'exists').resolves(false);
      return expect(productsService.checkIfExists(id)).to.eventually.be.rejectedWith('Product not found');
    });
  });

  describe('#get', () => {
    it('deve retornar um array com produtos se o model retornar um array', () => {
      sinon.stub(productsModel, 'get').resolves(listProductsMock);
      return expect(productsService.get()).to.eventually.deep.equal(listProductsMock);
    });
  });

  describe('#getById', () => {
    it('deve retornar um objeto com as informações do produto se o id fornecido é existente', () => {
      sinon.stub(productsModel, 'getById').resolves(mockObj);
      return expect(productsService.getById(2)).to.eventually.be.deep.equal(mockObj);
    });

    it('deve retornar `undefined` se o id fornecido é inexistente', () => {
      sinon.stub(productsModel, 'getById').resolves(undefined);
      return expect(productsService.getById(202)).to.eventually.be.undefined;
    });
  });

  describe('#add', () => {
    it('ao enviar um `name` válido deve salvar no banco', async () => {
      const expectedId = 4
      sinon.stub(productsModel, 'add').resolves(expectedId);
      const id = await productsService.add({ name: 'Produto X' });
      expect(id).to.be.equal(expectedId);
    });
  });

});