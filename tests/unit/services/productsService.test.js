const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { ValidationError } = require('joi');
const { listProductsMock, mockObj, listSearchName, listSearch } = require('../mocks/products.mock');


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

  describe('#validateBody', () => {
    it('deve retornar o objeto ao mandar um `name` válido', () => {
      const validData = { name: 'Produto X' };
      const value = productsService.validateBody(validData);
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

    it('deve disparar um erro caso `productsModel.exists` também dispare', () => {
      sinon.stub(productsModel, 'exists').rejects();
      return expect(productsService.checkIfExists(0)).to.eventually.be.rejected;
    });

    it('deve retornar `undefined` caso o `productsModel.exists` retorne true', () => {
      sinon.stub(productsModel, 'exists').resolves(true);
      return expect(productsService.checkIfExists(0)).to.eventually.be.undefined;
    });
  });

  describe('#checkIfExistsByArrayOfId', () => {
    it('deve retornar `true` se os `ids` forem existentes ', () => {
      sinon.stub(productsModel, 'listByArrayOfId').resolves([1, 2]);
      return expect(productsService.checkIfExistsByArrayOfId([1, 2])).to.eventually.be.true;
    });

    it('deve retornar erro se algum `id` de produto fornecido for inexistente', () => {
      sinon.stub(productsModel, 'listByArrayOfId').resolves(false);
      return expect(productsService.checkIfExistsByArrayOfId([999])).to.eventually.be.rejectedWith('Product not found');
    });
  });

  describe('#list', () => {
    it('deve retornar um array com produtos se o model retornar um array', () => {
      sinon.stub(productsModel, 'list').resolves(listProductsMock);
      return expect(productsService.list()).to.eventually.deep.equal(listProductsMock);
    });

    it('deve disparar um erro caso `productsModel.list` dispare um erro', () => {
      sinon.stub(productsModel, 'list').rejects();
      return expect(productsService.list()).to.eventually.be.rejected;
    });
  });

  describe('#search', () => {
    it('deve retornar pelo menos um item da lista ao enviar um nome na URL', () => {
      sinon.stub(productsModel, 'search').resolves(listSearchName);
      return expect(productsService.search('Martelo')).to.eventually.be.equal(listSearchName);
    });

    it('deve retornar todos os itens da lista caso não passe nenhum termo na URL ', () => {
      sinon.stub(productsModel, 'list').resolves(listSearch);
      return expect(productsService.search('')).to.eventually.be.equal(listSearch);
    });

    it('deve falhar se o`productsModel.search` disparar um erro', () => {
      sinon.stub(productsModel, 'search').rejects();
      expect(productsService.search()).to.eventually.be.rejected;
      expect(productsService.search('Martelo')).to.eventually.be.rejected;
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

    it('deve disparar um erro caso `productsModel.add` dispare um erro', () => {
      sinon.stub(productsModel, 'add').rejects();
      return expect(productsService.add({ name: 'Pro' })).to.eventually.be.rejected;
    });
  });

  describe('#edit', () => {
    it('deve retornar `undefined` caso `productsModel.edit` altere o produto', async () => {
      sinon.stub(productsModel, 'edit').resolves();
      return expect(productsService.edit(1, {})).to.eventually.be.undefined;
    });

    it('deve disparar um erro caso `productsModel.edit` dispare um erro', async () => {
      sinon.stub(productsModel, 'edit').rejects();
      return expect(productsService.edit(1, {})).to.eventually.be.rejected;
    });
  });

  describe('#remove', () => {
    it('deve retornar `undefined` caso `productsModel.remove` remova o produto', async () => {
      sinon.stub(productsModel, 'remove').resolves();
      return expect(productsService.remove(1)).to.eventually.be.undefined;
    });

    it('deve disparar um erro caso `productsModel.remove` dispare um erro', async () => {
      sinon.stub(productsModel, 'remove').rejects();
      return expect(productsService.remove(1)).to.eventually.be.rejected;
    });
  });
});