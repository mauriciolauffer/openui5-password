/**
 * openui5-password - An OpenUI5 Control to allow you to check your password strength and validate it
 * @author Mauricio Lauffer
 * @version 0.0.1
 * @license MIT
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Renderer","sap/m/InputBaseRenderer"],function(e,t,r){"use strict";var n=t.extend(r);return n.writeInnerAttributes=function(e,t){e.writeAttribute("type","password"),t.getEnabled()||e.writeAttribute("readonly","readonly")},n},!0);