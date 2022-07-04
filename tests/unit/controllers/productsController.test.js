const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const { listProductsMock, mockObj } = require('../mocks/products.mock');


describe('productsController', () => {
  beforeEach(() => sinon.restore());

  describe('#getAll', () => {
    it('deve chamar res.status com 200 e res.json com o array quando o service devolve um array', async () => {
      // arranjo
      sinon.stub(productsService, 'getAllProducts').resolves(listProductsMock);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      // ação
      await productsController.getAll(req, res);

      // assertivas
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(listProductsMock)).to.be.equal(true);
    });
  });

  describe('#getById', () => {
    it('deve chamar res.status com 200 e res.json com o objeto quando o service retornar o objeto procurado', async () => {
      sinon.stub(productsService, 'getProductById').resolves(mockObj);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 2 };

      await productsController.getById(req, res);

      console.log(mockObj);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockObj)).to.be.true;
    });

    // it('deve chamar res.status com 404 quando o service retornar nulo', async () => {
    //   sinon.stub(productsService, 'getProductById').resolves(null);

    //   const req = {};
    //   const res = {};

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub();
    //   req.params = { id: 202 };

    //   await productsController.getById(req, res);

    //   expect(res.status.calledWith(404)).to.be.true;
    // });
  });

});