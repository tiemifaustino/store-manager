const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const productsService = require('../../../services/productsService');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const { listAddMock, listSaleAddedMock } = require('../mocks/products.mock');

describe('salesController', () => {
  beforeEach(() => sinon.restore());
  
  const req = {};
  const res = {};
  
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub();

  describe('#list', () => {
    it('deve chamar `res.status` com 200 e `res.json` com o array quando o service devolve um array', async () => {
      sinon.stub(salesService, 'list').resolves([{}]);
      await salesController.list(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith([{}])).to.be.equal(true);
    });

    it('deve disparar um erro caso o `salesService.list` também dispare', () => {
      sinon.stub(salesService, 'list').rejects();
      expect(salesController.list(req, res)).to.eventually.be.rejected;
    });
  });

  describe('#listById', () => {
    it('deve chamar res.status com 200 e `res.json` com o objeto quando o service retornar o objeto procurado', async () => {
      req.params = { id: 2 };

      sinon.stub(salesService, 'listById').resolves({});
      await salesController.listById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({})).to.be.true;
    });

    it('deve disparar um erro caso `salesService.validateParamsId` também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').rejects();
      return expect(salesController.listById(req, res)).to.eventually.be.rejected;
    });

    it('deve retornar erro quando o id for inexistente', () => {
      req.params = { id: 202 };

      sinon.stub(salesService, 'validateParamsId').resolves(req.params);
      sinon.stub(salesService, 'checkIfExists').rejects();
      expect(salesController.listById(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `salesService.getById` também dispare', () => {
      req.params = { id: 4 };

      sinon.stub(salesService, 'validateParamsId').resolves(req.params);
      sinon.stub(salesService, 'checkIfExists').resolves(req.params);
      sinon.stub(salesService, 'listById').rejects();
      expect(salesController.listById(req, res)).to.eventually.be.rejected;
    });
  });

  describe('#add', () => {
    it('deve chamar res.status com 201 e res.json com os dados da venda cadastrada', async () => {
      req.body = listAddMock;

      sinon.stub(salesService, 'validateBody').resolves(req.body);
      sinon.stub(productsService, 'checkIfExistsByArrayOfId').resolves([1, 2]);
      sinon.stub(salesService, 'add').resolves(3);
      await salesController.add(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(listSaleAddedMock)).to.be.equal(true);
    });

    it('deve disparar um erro caso o `salesService.validateBody` também dispare', () => {
      sinon.stub(salesService, 'validateBody').rejects();
      expect(salesController.add(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o `productsService.checkIfExistsByArrayOfId` também dispare', () => {
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExistsByArrayOfId').rejects();
      expect(salesController.add(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o `salesService.getById` também dispare', () => {
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(productsService, 'checkIfExistsByArrayOfId').resolves();
      sinon.stub(salesService, 'add').rejects();
      expect(salesController.add(req, res)).to.eventually.be.rejected;
    });
  });

  describe('#edit', () => {
    it('deve chamar `res.status` com 200 e `res.json` com o objeto editado ao enviar um `req.body` válido', async () => {
      req.body = [
        {
          productId: 1,
          quantity: 10
        },
        {
          productId: 2,
          quantity: 50
        }
      ];
      req.params = { id: 1 };

      sinon.stub(productsService, 'validateParamsId').resolves(req.params);
      sinon.stub(productsService, 'validateBody').resolves(req.body);
      sinon.stub(salesService, 'checkIfExists').resolves(1);
      sinon.stub(productsService, 'checkIfExistsByArrayOfId').resolves([]);
      sinon.stub(salesService, 'edit').resolves();
      await salesController.edit(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({})).to.be.equal(true);
    });

    it('deve disparar um erro caso `salesService.validateParamsId` também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').rejects();
      sinon.stub(salesService, 'validateBody').resolves();
      expect(salesController.edit(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `salesService.validateBody` também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'validateBody').rejects();
      expect(salesController.edit(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `salesService.checkIfExists` também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(salesService, 'checkIfExists').rejects();
      expect(salesController.edit(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `salesService.checkIfExistsByArrayOfId` também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'checkIfExistsByArrayOfId').rejects();
      expect(salesController.edit(req, res)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso `salesService.edit` também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(productsService, 'checkIfExistsByArrayOfId').resolves();
      sinon.stub(salesService, 'edit').rejects();
      expect(salesController.edit(req, res)).to.eventually.be.rejected;
    });
  });

  describe('#remove', () => {
    it('deve chamar `res.sendStatus` com 204', async () => {
      res.sendStatus = sinon.stub();
      req.params = { id: 1 };

      sinon.stub(salesService, 'validateParamsId').resolves(req.params);
      sinon.stub(salesService, 'checkIfExists').resolves(1);
      sinon.stub(salesService, 'remove').resolves(1);
      await salesController.remove(req, res);
      expect(res.sendStatus.calledWith(204)).to.be.true;
    });

    it('deve disparar um erro caso `salesService.validateParamsId` também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').rejects();
      expect(salesController.remove(req, res)).to.eventually.be.rejected;
    });
  
    it('deve disparar um erro caso `salesService.checkIfExists` também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'checkIfExists').rejects();
      expect(salesController.remove(req, res)).to.eventually.be.rejected;
    });
  
    it('deve disparar um erro caso `salesService.remove` também dispare', () => {
      sinon.stub(salesService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'checkIfExists').resolves();
      sinon.stub(salesService, 'remove').rejects();
      expect(salesController.remove(req, res)).to.eventually.be.rejected;
    });
  });

});