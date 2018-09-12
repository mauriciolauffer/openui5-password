sap.ui.require([
  'test/unit/Password',
  'sap/ui/thirdparty/sinon',
  'sap/ui/thirdparty/sinon-qunit'
], function() {
  'use strict';

  const node = document.createElement('div');
  node.setAttribute('id', 'content');
  document.body.appendChild(node);
  QUnit.start();
});
