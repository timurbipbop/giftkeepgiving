// Run: node --test
const test = require("node:test");
const assert = require("node:assert");
const K = require("./calc.js");

test("worked example from the spec: Rp 1jt into trees at Rp 25k", () => {
  const A = 1_000_000, c = K.CAUSES.pohon.cost;
  assert.equal(K.oneTime(A, c), 40);
  assert.equal(K.units(A, c, 1), 2);
  assert.equal(K.units(A, c, 10), 24);
  assert.equal(K.units(A, c, 17), 40);
  assert.equal(K.units(A, c, 100), 240);
});

test("crossover year follows from net yield", () => {
  assert.equal(K.crossover(), Math.ceil(1 / K.NET_YIELD));
  assert.equal(K.crossover(), 17);
});

test("eternal gift matches or exceeds one-time gift from the crossover year on", () => {
  for (const key of Object.keys(K.CAUSES)) {
    const c = K.CAUSES[key].cost;
    for (const A of [K.MIN_GIFT, 1_000_000, K.MAX_GIFT]) {
      assert.ok(K.units(A, c, K.crossover()) >= K.oneTime(A, c), `${key} A=${A}`);
    }
  }
});

test("units minted at fixed unit price", () => {
  assert.equal(K.unitsMinted(1_000_000), 1000);
});
