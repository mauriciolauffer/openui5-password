/**
 * openui5-password - An OpenUI5 Control to allow you to check your password strength and validate it
 * @author Mauricio Lauffer
 * @version 0.0.1
 * @license MIT
 */
sap.ui.define([
  'jquery.sap.global',
  'sap/ui/core/library'
], function(jQuery) {
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
  // delegate further initialization of this library to the Core
  sap.ui.getCore().initLibrary({
    name: 'openui5.password',
    dependencies: [
      'sap.ui.core',
      'sap.m'
    ],
    interfaces: [],
    controls: ['openui5.password.Password'],
    elements: [],
    noLibraryCSS: true,
    version: '${version}'
  });

  return openui5.password;
}, /* bExport= */ false);
