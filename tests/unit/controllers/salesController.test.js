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
  });

  describe('#listById', () => {
    it('deve chamar res.status com 200 e `res.json` com o objeto quando o service retornar o objeto procurado', async () => {
      req.params = { id: 2 };

      sinon.stub(salesService, 'listById').resolves({});
      await salesController.listById(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({})).to.be.true;
    });

    it('deve retornar erro `NotFoundError` com status 400 quando o id for inexistente', () => {
      req.params = { id: 202 };

      sinon.stub(salesService, 'listById').rejects();
      return expect(salesController.listById(req, res)).to.eventually.be.rejectedWith('Sale not found');
    });
  });

  describe('#add', () => {
    it('deve chamar res.status com 201 e res.json com os dados da venda cadastrada', async () => {
      req.body = listAddMock;

      sinon.stub(productsService, 'checkIfExistsByArrayOfId').resolves([1, 2]);
      sinon.stub(salesService, 'add').resolves(3);
      await salesController.add(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(listSaleAddedMock)).to.be.equal(true);
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

      sinon.stub(salesService, 'checkIfExists').resolves(1);
      sinon.stub(productsService, 'checkIfExistsByArrayOfId').resolves([]);
      sinon.stub(salesService, 'edit').resolves();
      await salesController.edit(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({})).to.be.equal(true);
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
  });

});