/*
 * openui5-password
 * (c) Copyright 2017-2019 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/m/InputBaseRenderer"],function(e,t){"use strict";const r=e.extend(t);r.writeInnerAttributes=function(e,t){e.writeAttribute("type","password");if(!t.getEnabled()){e.writeAttribute("readonly","readonly")}};return r});