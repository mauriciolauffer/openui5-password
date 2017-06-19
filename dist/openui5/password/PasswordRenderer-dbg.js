/**
 * openui5-password - An OpenUI5 Control to allow you to check your password strength and validate it
 * @author Mauricio Lauffer
 * @version 0.0.1
 * @license MIT
 */
sap.ui.define([
  'jquery.sap.global',
  'sap/ui/core/Renderer',
  'sap/m/InputBaseRenderer'
], function(jQuery, Renderer, InputBaseRenderer) {
  'use strict';

  /**
   * Password renderer.
   *
   * @namespace
   * @author Mauricio Lauffer
   *
   * PasswordRenderer extends the InputBaseRenderer
   */
  var PasswordRenderer = Renderer.extend(InputBaseRenderer);

  /**
   * add extra attributes to Password
   *
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
}, /* bExport= */ true);
