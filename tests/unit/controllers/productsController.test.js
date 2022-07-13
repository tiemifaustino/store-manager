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

    it('deve disparar um erro caso o `productsService.list` também dispare', () => {
      sinon.stub(productsService, 'list').rejects();
      expect(productsController.list(req, res)).to.eventually.be.rejected;
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

    it('deve disparar um erro caso o `productsService.search` também dispare', () => {
      req.query = { q: 'aaa' };

      sinon.stub(productsService, 'search').rejects();
      expect(productsController.search(req, res)).to.eventually.be.rejected;
    });
  });

  describe('#getById', () => {
    it('deve chamar res.status com 200 e `res.json` com o objeto quando o service retornar o objeto procurado', async () => {
      req.params = { id: 2 };

      sinon.stub(productsService, 'validateParamsId').resolves(req.params);
      sinon.stub(productsService, 'checkIfExists').resolves(req.params);
      sinon.stub(productsService, 'getById').resolves(mockObj);
      await productsController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockObj)).to.be.true;
    });

    it('deve disparar um erro caso `productsService.validateParamsId` também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      return expect(productsController.getById(req, res)).to.eventually.be.rejected;
    });

    it('deve retornar erro quando o id for inexistente', () => {
      req.params = { id: 202 };

      sinon.stub(productsService, 'validateParamsId').resolves(req.params);
      sinon.stub(productsService, 'checkIfExists').rejects();
      expect(productsController.getById(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `productsService.getById` também dispare', () => {
      req.params = { id: 4 };

      sinon.stub(productsService, 'validateParamsId').resolves(req.params);
      sinon.stub(productsService, 'checkIfExists').resolves(req.params);
      sinon.stub(productsService, 'getById').rejects();
      expect(productsController.getById(req, res)).to.eventually.be.rejected;
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

    it('deve disparar um erro caso o `productsService.validateBody` também dispare', () => {
      sinon.stub(productsService, 'validateBody').rejects();
      expect(productsController.add(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o `productsService.add` também dispare', () => {
      sinon.stub(productsService, 'validateBody').resolves();
      sinon.stub(productsService, 'add').rejects();
      expect(productsController.add(req, res)).to.eventually.be.rejected;    });

    it('deve disparar um erro caso o `productsService.getById` também dispare', () => {
      sinon.stub(productsService, 'validateBody').resolves();
      sinon.stub(productsService, 'add').resolves();
      sinon.stub(productsService, 'getById').rejects();
      expect(productsController.add(req, res)).to.eventually.be.rejected;    });
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

    it('deve disparar um erro caso `productsService.validateParamsId` também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      sinon.stub(productsService, 'validateBody').resolves();
      expect(productsController.edit(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `productsService.validateBody` também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'validateBody').rejects();
      expect(productsController.edit(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `productsService.checkIfExists` também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').rejects();
      expect(productsController.edit(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `productsService.edit` também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'edit').rejects();
      expect(productsController.edit(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `productsService.getById` também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'edit').resolves();
      sinon.stub(productsService, 'getById').rejects();
      expect(productsController.edit(req, res)).to.eventually.be.rejected;
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

    it('deve disparar um erro caso `productsService.validateParamsId` também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      expect(productsController.remove(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `productsService.checkIfExists` também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'checkIfExists').rejects();
      expect(productsController.remove(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `productsService.remove` também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'remove').rejects();
      expect(productsController.remove(req, res)).to.eventually.be.rejected;
    });
  });
  
});