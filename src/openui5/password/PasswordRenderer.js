'use strict';

/*
 * ${copyright}
 */

sap.ui.define([
  'sap/ui/core/Renderer',
  'sap/m/InputBaseRenderer'
],
/**
 * Module Dependencies
 * @param {sap.ui.core.Renderer} Renderer Renderer control
 * @param {sap.m.InputBaseRenderer} InputBaseRenderer InputBaseRenderer control
 * @returns {object} PasswordRenderer control, an extended UI5 InputBaseRenderer control
 */
function(Renderer, InputBaseRenderer) {
  /**
   * OpenUI5 Password renderer.
   * @author Mauricio Lauffer
   * @version ${version}
   * @class
   * @namespace
   * @name openui5.password
   * @public
   * @alias openui5.password.PasswordRenderer
   */
  const PasswordRenderer = Renderer.extend(InputBaseRenderer);

  /**
   * Add extra attributes to Password
   * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
   * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
   */
  PasswordRenderer.writeInnerAttributes = function(oRm, oControl) {
    oRm.writeAttribute('type', 'password');
    if (!oControl.getEnabled()) {
      oRm.writeAttribute('readonly', 'readonly');
    }
  };

  return PasswordRenderer;
});
