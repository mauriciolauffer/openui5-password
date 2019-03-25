sap.ui.require([
  'test/unit/Password'
], function() {
  'use strict';

  const node = document.createElement('div');
  node.setAttribute('id', 'content');
  document.body.appendChild(node);
  QUnit.start();
});
