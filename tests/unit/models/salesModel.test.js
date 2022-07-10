const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('salesModel', () => {
  beforeEach(() => sinon.restore());

  describe('#exists', () => {
    it('deve retornar `true` caso o `connection.query` retorne um item da lista', () => {
      sinon.stub(connection, 'query').resolves([[{}]]);
      return expect(salesModel.exists(2)).to.eventually.be.true;
    });

    it('deve retornar `false` o `connection.query` retorne uma lista vazia', () => {
      sinon.stub(connection, 'query').resolves([[]]);
      return expect(salesModel.exists(202)).to.eventually.be.equal(false);
    });

    it('deve disparar um erro caso o `connection.query` dispare um erro', () => {
      sinon.stub(connection, 'query').rejects();
      return expect(salesModel.exists(0)).to.eventually.be.rejected;
    });
  });

  describe('#add', () => {
    it('deve retornar o id da venda cadastrada caso dê sucesso', () => {
      const expectedId = 4
      sinon.stub(connection, 'query').resolves([{ insertId: expectedId }]);
      return expect(salesModel.add()).to.eventually.be.deep.equal(expectedId);
    });

    it('deve disparar um erro caso o `connection.query` dispare um erro', () => {
      sinon.stub(connection, 'query').rejects();
      return expect(salesModel.add({})).to.eventually.be.rejected;
    });
  });

  describe('#remove', () => {
    it('deve retornar `undefined` caso sucesso', () => {
      sinon.stub(connection, 'query').resolves();
      return expect(salesModel.remove(1)).to.eventually.be.undefined;
    });

    it('deve disparar um erro caso o `connection.query` dispare', () => {
      sinon.stub(connection, 'query').rejects();
      return expect(salesModel.remove(1)).to.eventually.be.rejected;
    });
  });

});