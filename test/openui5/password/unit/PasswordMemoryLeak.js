'use strict';

sap.ui.define([
  'sap/ui/qunit/utils/MemoryLeakCheck',
  'openui5/password/Password'
],
function(MemoryLeakCheck, Password) {
  MemoryLeakCheck.checkControl('openui5.password.Password', function() {
    return new Password();
  });
});
