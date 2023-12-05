'use strict';

/*
 * openui5-password
 * (c) Copyright 2017-2023 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([
  'sap/ui/core/Lib',
  'sap/ui/core/library',
  'sap/m/library'
],
/**
 * Module Dependencies
 * @param {sap.ui.core.Lib} Lib - sap.ui.core.Lib
 * @returns {object} openui5.password library
 */
function(Lib) {
  /**
   * OpenUI5 library: openui5.password.
   * @namespace
   * @name openui5.password
   * @author Mauricio Lauffer
   * @version 0.1.14
   * @public
   */
  return Lib.init({
    name: 'openui5.password',
    dependencies: [
      'sap.ui.core',
      'sap.m'
    ],
    controls: ['openui5.password.Password'],
    noLibraryCSS: true,
    version: '0.1.14'
  });
});
