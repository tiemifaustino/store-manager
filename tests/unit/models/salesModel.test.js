const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const { expect, use } = require('chai');

use(chaiAsPromised);

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('salesModel', () => {
  beforeEach(() => sinon.restore());

  describe('#add', () => {
    it('deve retornar o id da venda cadastrada', () => {
      const expectedId = 4
      sinon.stub(connection, 'query').resolves([{ insertId: expectedId }]);
      return expect(salesModel.add()).to.eventually.be.deep.equal(expectedId);
    });
  });

});