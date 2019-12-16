/*
 * openui5-password
 * (c) Copyright 2017-2019 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([], function() {
  'use strict';

  /**
   * OpenUI5 library: openui5.password.
   *
   * @namespace
   * @name openui5.password
   * @author Mauricio Lauffer
   * @version 0.1.9
   * @public
   */
  return sap.ui.getCore().initLibrary({
    name: 'openui5.password',
    dependencies: [
      'sap.ui.core',
      'sap.m',
    ],
    controls: ['openui5.password.Password'],
    noLibraryCSS: true,
    version: '0.1.9',
  });
});
