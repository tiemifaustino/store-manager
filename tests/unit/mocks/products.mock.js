const mocks = {
  listProductsMock: [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
  ],
  mockObj: { id: 2, name: 'Traje de encolhimento' },
  listAddMock: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ],
  listAddMockWithoutProductId: [
    { quantity: 1 },
    {
      productId: 2,
      quantity: 5
    }
  ],
  listAddMockWithoutQuantity: [
    { productId: 1 },
    {
      productId: 2,
      quantity: 5
    }
  ],
  listAddMockWithQuantityZero: [
    {
      productId: 1,
      quantity: 0
    },
    {
      productId: 2,
      quantity: 5
    }
  ],
};

module.exports = mocks;