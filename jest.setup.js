// jest.setup.js
require('@testing-library/jest-dom');
require('whatwg-fetch');
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

try {
  const { TransformStream } = require('web-streams-polyfill');
  global.TransformStream = TransformStream;
} catch {
  global.TransformStream = global.TransformStream || function () {};
}

if (typeof global.BroadcastChannel === 'undefined') {
  class MockBroadcastChannel {
    constructor() {}
    postMessage() {}
    close() {}
    addEventListener() {}
    removeEventListener() {}
  }
  global.BroadcastChannel = MockBroadcastChannel;
}