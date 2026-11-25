import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTrademarkBudget } from '../src/data/calculator.ts';

test('AC-04 Case 1: 1 класс, 0 доп. позиций, стандарт, электронное = 35 000 ₽ пошлин', () => {
  const res = calculateTrademarkBudget({
    designationType: 'word',
    classesCount: 1,
    extraItemsCount: 0,
    speed: 'standard',
    certificateFormat: 'electronic',
  });
  assert.equal(res.stage1Fee, 17000);
  assert.equal(res.stage2Fee, 18000);
  assert.equal(res.totalStateFee, 35000);
  assert.equal(res.fipsAccelerationFee, 0);
});

test('AC-04 Case 2: 1 класс, 40 доп. позиций (50 всего), стандарт, электронное = 55 000 ₽ пошлин', () => {
  const res = calculateTrademarkBudget({
    designationType: 'word',
    classesCount: 1,
    extraItemsCount: 40,
    speed: 'standard',
    certificateFormat: 'electronic',
  });
  assert.equal(res.stage1Fee, 37000);
  assert.equal(res.stage2Fee, 18000);
  assert.equal(res.totalStateFee, 55000);
});

test('AC-04 Case 3: 1 класс, 0 доп. позиций, стандарт, бумажное = 38 000 ₽ пошлин', () => {
  const res = calculateTrademarkBudget({
    designationType: 'word',
    classesCount: 1,
    extraItemsCount: 0,
    speed: 'standard',
    certificateFormat: 'paper',
  });
  assert.equal(res.totalStateFee, 38000);
});

test('AC-04 Case 4: 1 класс, ускоренный, комбинированный, электронное = 243 000 ₽ госплатежей', () => {
  const res = calculateTrademarkBudget({
    designationType: 'combined',
    classesCount: 1,
    extraItemsCount: 0,
    speed: 'accelerated',
    certificateFormat: 'electronic',
  });
  assert.equal(res.totalStateFee + res.fipsAccelerationFee, 243000);
});
