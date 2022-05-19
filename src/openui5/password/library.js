'use strict';

/*
 * ${copyright}
 */

sap.ui.define([
  'sap/ui/core/Core',
  'sap/ui/core/library',
  'sap/m/library'
],
/**
 * Module Dependencies
 *
 * @param {sap.ui.core.Core} Core - sap.ui.core.Core
 * @returns {object} openui5.password library
 */
function(Core) {
  /**
   * OpenUI5 library: openui5.password.
   *
   * @namespace
   * @name openui5.password
   * @author Mauricio Lauffer
   * @version ${version}
   * @public
   */
  Core.initLibrary({
    name: 'openui5.password',
    dependencies: [
      'sap.ui.core',
      'sap.m'
    ],
    controls: ['openui5.password.Password'],
    noLibraryCSS: true,
    version: '${version}'
  });

  return openui5.password; // eslint-disable-line
});
