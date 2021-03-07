/*
 * ${copyright}
 */

sap.ui.define([
  'sap/ui/core/library',
  'sap/m/library'
], function() {
  'use strict';

  /**
   * OpenUI5 library: openui5.password.
   *
   * @namespace
   * @name openui5.password
   * @author Mauricio Lauffer
   * @version ${version}
   * @public
   */
  return sap.ui.getCore().initLibrary({
    name: 'openui5.password',
    dependencies: [
      'sap.ui.core',
      'sap.m'
    ],
    controls: ['openui5.password.Password'],
    noLibraryCSS: true,
    version: '${version}'
  });
});
