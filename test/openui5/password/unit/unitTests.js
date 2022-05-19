'use strict';

QUnit.config.autostart = false;
QUnit.config.reorder = false;

sap.ui.getCore().attachInit(function() {
  sap.ui.require([
    'openui5/password/library',
    'test/unit/allTests'
  ], function() {
    if (window.blanket) {
      window.blanket.options('sap-ui-cover-only', 'openui5/password');
      window.blanket.options('sap-ui-cover-never', 'openui5/password/thirdparty');
    }

    QUnit.start();
  });
});
