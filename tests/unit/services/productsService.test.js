const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');
const { listProductsMock, mockObj } = require('../mocks/products.mock');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { ValidationError } = require('joi');

use(chaiAsPromised);

describe('productsService', () => {
  beforeEach(() => sinon.restore());

  describe('#validateParamsId', () => {
    it('deve retornar o objeto ao mandar um id válido', () => {
      const validData = { id: 2 };
      const value = productsService.validateParamsId(validData);
      expect(value).to.be.deep.equal(validData);
    });

    it('deve retornar erro ao mandar um objeto inválido ', () => {
      expect(() => productsService.validateParamsId({ id: 'a' })).to.throws(ValidationError);
      expect(() => productsService.validateParamsId({ id: -1 })).to.throws(ValidationError);
      expect(() => productsService.validateParamsId({ id: 1.1 })).to.throws(ValidationError);
    });
  });

  // describe('#checkIfExists', () => {
  //   it('deve retornar erro `Product not found` se o id fornecido for inexistente', async () => {
  //       const id = 202
  //       sinon.stub(productsModel, 'exists').resolves(false);
  //       const result = await productsService.checkIfExists(id);
  //     expect(result).to.be.equal('Product not found');
  //   });
  // });

  describe('#', () => {
   
  });

  describe('#', () => {

  });

});