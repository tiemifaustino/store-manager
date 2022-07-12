const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const { listProductsMock, mockObj, listSearchName, listSearch } = require('../mocks/products.mock');

describe('productsController', () => {
  beforeEach(() => sinon.restore());

  const req = {};
  const res = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub();

  describe('#list', () => {
    it('deve chamar `res.status` com 200 e `res.json` com o array quando o service devolve um array', async () => {
      // arranjo
      sinon.stub(productsService, 'list').resolves(listProductsMock);
      // ação
      await productsController.list(req, res);
      // assertivas
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(listProductsMock)).to.be.equal(true);
    });
  });

  describe('#search', () => {
    it('deve chamar `res.status` com 200 e `res.json` com um item da lista ao enviar um nome na URL', async () => {
      req.query = { q: 'Martelo' };

      sinon.stub(productsService, 'search').resolves(listSearchName);
      await productsController.search(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(listSearchName)).to.be.equal(true);
    });

    it('deve chamar `res.status` com 200 e `res.json` com todos os itens da lista caso não passe nenhum termo na URL ', async () => {
      req.query = { q: '' };

      sinon.stub(productsService, 'search').resolves(listSearch);
      await productsController.search(req, res)
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(listSearch)).to.be.equal(true);
    });
  });

  describe('#getById', () => {
    it('deve chamar res.status com 200 e `res.json` com o objeto quando o service retornar o objeto procurado', async () => {
      req.params = { id: 2 };

      sinon.stub(productsService, 'getById').resolves(mockObj);
      await productsController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockObj)).to.be.true;
    });

    it('deve retornar erro `NotFoundError` com status 400 quando o id for inexistente', () => {
      req.params = { id: 202 };

      sinon.stub(productsService, 'getById').rejects();
      return expect(productsController.getById(req, res)).to.eventually.be.rejectedWith('Product not found');
    });
  });

  describe('#add', () => {
    it('deve chamar `res.status` com 201 e `res.json` com o objeto criado ao enviar um `req.body` válido', async () => {    
      req.body = { name: 'Produto X' };

      sinon.stub(productsService, 'add').resolves(1);
      sinon.stub(productsService, 'getById').resolves({ id: 1, name: 'Produto X' })
      await productsController.add(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith({ id: 1, name: 'Produto X' })).to.be.equal(true);
    });
  });

  describe('#edit', () => {
    it('deve chamar `res.status` com 200 e `res.json` com o objeto editado ao enviar um `req.body` válido', async () => {
      req.body = { name: 'Produto Y' };
      req.params = { id: 1 };

      sinon.stub(productsService, 'checkIfExists').resolves(1);
      sinon.stub(productsService, 'edit').resolves(1, { name: 'Produto Y' });
      sinon.stub(productsService, 'getById').resolves({ id: 1, name: 'Produto Y' });
      await productsController.edit(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ id: 1, name: 'Produto Y' })).to.be.equal(true);
    });
  });

  describe('#remove', () => {
    it('deve chamar `res.sendStatus` com 204', async () => {
      res.sendStatus = sinon.stub();
      req.params = { id: 1 };

      sinon.stub(productsService, 'validateParamsId').resolves(req.params);
      sinon.stub(productsService, 'checkIfExists').resolves(1);
      sinon.stub(productsService, 'remove').resolves(1);
      await productsController.remove(req, res);
      expect(res.sendStatus.calledWith(204)).to.be.true;
    });
  });
});