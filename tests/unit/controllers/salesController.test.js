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

  describe('#add', () => {
    it('deve chamar res.status com 201 e res.json com os dados da venda cadastrada', async () => {
      // arranjo
      const req = {};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = listAddMock;

      sinon.stub(productsService, 'checkIfExistsByArrayOfId').resolves([1, 2]);
      sinon.stub(salesService, 'add').resolves(3);

      // ação
      await salesController.add(req, res);

      // assertivas
      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(listSaleAddedMock)).to.be.equal(true);
    });
  });

});