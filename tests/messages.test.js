import test from 'node:test';
import assert from 'node:assert/strict';
import { getShareUrl, wishes } from '../src/messages.js';
test('QR sharing preserves GitHub project path without fragment or query', () => {
  assert.equal(getShareUrl(new URL('https://mlakainu.github.io/MiniApp/?from=friend#letter')), 'https://mlakainu.github.io/MiniApp/');
});
test('wishes provide multiple distinct nonempty messages', () => {
  assert.ok(wishes.length >= 5);
  assert.equal(new Set(wishes).size, wishes.length);
  assert.ok(wishes.every(wish => wish.length > 40));
});
