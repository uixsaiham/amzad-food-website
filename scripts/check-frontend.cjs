// Exercise browser-storage boundaries without requiring a browser or a backend.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText;
  new Function('require', 'module', 'exports', compiled)(
    name => name.startsWith('.') ? load(path.resolve(path.dirname(file), name + '.ts')) : require(name), module, module.exports
  );
  return module.exports;
}
global.window = {};
const storage = new Map();
global.localStorage = {
  getItem: key => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value)
};
const cart = load('app/lib/cart.ts');
const orders = load('app/lib/orders.ts');
const offers = load('app/lib/offers.ts');
const item = { name: 'Oil', image: '/oil.png', price: 1450, qty: 1 };
for (const input of ['null', '{}', '"wrong"', '{bad', '[null,{},false]']) {
  storage.set('amzad-cart', input);
  storage.set('amzad-orders', input);
  assert.deepEqual(cart.loadCart(), []);
  assert.deepEqual(orders.loadOrders(), []);
}
storage.set('amzad-cart', JSON.stringify([item, { ...item, price: -1 }, { ...item, qty: 0 }, { ...item, qty: 1.5 }, { ...item, qty: 999 }]));
assert.deepEqual(cart.loadCart(), [item, { ...item, qty: 20 }]);
const order = { id: 'AF123456', items: [item], total: 1510, deliveryFee: 60, name: 'Customer', phone: '01712345678', address: 'Dhaka', eta: 'Preview', placedAt: Date.now() };
storage.set('amzad-orders', JSON.stringify([order, { ...order, items: [null] }, { ...order, updates: [null] }, { ...order, placedAt: 1e20 }, { ...order, status: {} }]));
assert.deepEqual(orders.loadOrders(), [order]);
assert.deepEqual(orders.findOrder(' #af123456 '), order);
orders.saveOrder({ ...order, total: 1600 });
assert.equal(orders.loadOrders().length, 1);
assert.equal(orders.loadOrders()[0].total, 1600);
assert.equal(offers.getDeliveryFee(0), 0);
assert.equal(offers.getDeliveryFee(999), 60);
assert.equal(offers.getDeliveryFee(1000), 0);
assert.equal(cart.clampQuantity(Infinity), 1);
assert.equal(cart.clampQuantity(21), 20);
global.localStorage.getItem = () => { throw new Error('Storage unavailable'); };
assert.deepEqual(cart.loadCart(), []);
assert.deepEqual(orders.loadOrders(), []);
global.localStorage.setItem = () => { throw new Error('Storage full'); };
assert.equal(orders.saveOrder(order), false);
console.log('Frontend storage, quantity, order and shipping checks passed.');
