'use strict';

/*
 * openui5-password
 * (c) Copyright 2017-2022 Mauricio Lauffer
 * Licensed under the MIT license. See LICENSE file in the project root for full license information.
 */

sap.ui.define([
  'sap/m/InputBase',
  'sap/m/List',
  'sap/m/ResponsivePopover',
  'sap/m/StandardListItem',
  'sap/ui/core/ValueState',
  'openui5/password/PasswordRenderer',
  'openui5/password/thirdparty/zxcvbn'
],
/**
 * Module Dependencies
 *
 * @param {sap.m.InputBase} InputBase InputBase control
 * @param {sap.m.List} List List control
 * @param {sap.m.ResponsivePopover} ResponsivePopover ResponsivePopover control
 * @param {sap.m.StandardListItem} StandardListItem StandardListItem control
 * @param {sap.ui.core.ValueState} ValueState ValueState control
 * @param {object} PasswordRenderer PasswordRenderer render control
 * @returns {object} Password control, an extended UI5 InputBase control
 */
function(InputBase, List, ResponsivePopover, StandardListItem, ValueState, PasswordRenderer) {
  /**
   * OpenUI5 Password.
   *
   * @author Mauricio Lauffer
   * @version 0.1.14
   * @class
   * @namespace
   * @name openui5.password
   * @public
   * @alias openui5.password.Password
   */
  const Password = InputBase.extend('Password', {
    metadata: {
      library: 'openui5.password',
      properties: {
        /**
         * Indicates that input must contain numbers
         */
        requireNumbers: {type: 'boolean', group: 'Behavior', defaultValue: true},
        /**
         * Indicates that input must contain letters
         */
        requireLetters: {type: 'boolean', group: 'Behavior', defaultValue: true},
        /**
         * Indicates that input must contain symbols
         */
        requireSymbols: {type: 'boolean', group: 'Behavior', defaultValue: true},
        /**
         * Indicates that input must contain lowercase letters
         */
        requireLowercase: {type: 'boolean', group: 'Behavior', defaultValue: true},
        /**
         * Indicates that input must contain uppercase letters
         */
        requireUppercase: {type: 'boolean', group: 'Behavior', defaultValue: true},
        /**
         * Maximum number of characters. Value '0' means the feature is switched off.
         */
        maxLength: {type: 'int', group: 'Behavior', defaultValue: 0},
        /**
         * Minimum number of characters. Value '0' means the feature is switched off.
         */
        minLength: {type: 'int', group: 'Behavior', defaultValue: 0},
        /**
         * The score is a number which indicates the password strength.
         */
        score: {type: 'int', group: 'Behavior', defaultValue: 0}
      },
      aggregations: {
        /**
         * ErrorItems are the items which will be shown in the error popup. Changing this aggregation (by calling addSuggestionItem, insertSuggestionItem, removeSuggestionItem, removeAllSuggestionItems, destroySuggestionItems) after input is rendered will open/close the suggestion popup.
         */
        errorItems: {type: 'sap.m.StandardListItem', multiple: true, singularName: 'errorItem'}
      }
    },
    /**
     * Renderer for a new Password.
     *
     * @augments sap.m.InputBase
     * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
     * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
     * @public
     */
    renderer: function(oRm, oControl) {
      PasswordRenderer.render(oRm, oControl);
    }
  });

  /**
   * Initializes the control
   *
   * @private
   */
  Password.prototype.init = function() {
    InputBase.prototype.init.call(this);
    this._resourceBundle = sap.ui.getCore().getLibraryResourceBundle('openui5.password');
  };

  /**
   * Destroys the control
   *
   * @private
   */
  Password.prototype.exit = function() {
    InputBase.prototype.exit.call(this);
    if (this._popover) {
      this._popover.destroy();
      this._popover = null;
    }
  };

  /**
   * Handle onInput event
   *
   * @param {sap.ui.base.Event} oEvent Event handler
   * @public
   */
  Password.prototype.oninput = function(oEvent) {
    InputBase.prototype.oninput.call(this, oEvent);
    if (oEvent.isMarked('invalid')) {
      return;
    }
    const score = this._calculateScore(this._$input.val());
    this._setStatus(score);
    this.setScore(score);
  };

  Password.prototype.onfocusin = function() {
    InputBase.prototype.onfocusin.apply(this, arguments);
    this.$().addClass('sapMInputFocused');
    if (this._popover) {
      this._popover.close();
    }
  };

  Password.prototype.onfocusout = function() {
    InputBase.prototype.onfocusout.apply(this, arguments);
    this.$().removeClass('sapMInputFocused');
    this.closeValueStateMessage(this);
  };

  Password.prototype.onsapfocusleave = function() {
    this._showPasswordErrors();
    InputBase.prototype.onsapfocusleave.apply(this, arguments);
  };

  /**
   * Defines the width of the input. Default value is 100%
   *
   * @public
   * @param {string} sWidth - CSS rule for width
   * @returns {object} sap.m.InputBase
   */
  Password.prototype.setWidth = function(sWidth) {
    return InputBase.prototype.setWidth.call(this, sWidth || '100%');
  };

  /**
   * Returns the width of the input.
   *
   * @public
   * @returns {string} The current width or 100% as default
   */
  Password.prototype.getWidth = function() {
    return this.getProperty('width') || '100%';
  };

  /**
   * Display password errors in a popup.
   *
   * @private
   */
  Password.prototype._showPasswordErrors = function() {
    const errors = this._getPasswordErrors(this._$input.val());
    if (errors.length > 0) {
      this._getPopover(errors).openBy(this);
      this.setValueState(ValueState.Error);
    } else {
      this.setValueState(ValueState.Success);
    }
  };

  /**
   * Returns a Popover object which list errors.
   *
   * @private
   * @param {Array} errors - Array with all errors to be displayed
   * @returns {sap.m.ResponsivePopover} Popover with all errors
   */
  Password.prototype._getPopover = function(errors) {
    if (!this._popover) {
      this._createPopover();
    }
    this._addPasswordErrorsToPopover(errors || []);
    return this._popover;
  };

  /**
   * Creates a new instance of a Popover object.
   *
   * @private
   */
  Password.prototype._createPopover = function() {
    this._popover = new ResponsivePopover(this.getId() + '-popover', {
      title: this._resourceBundle.getText('PASSWORD_POPUP_TITLE'),
      placement: 'Vertical',
      icon: 'sap-icon://alert'
    });
    this._popover.addContent(new List({}));
    this.addDependent(this._popover);
  };

  /**
   * Add messages to the Popover object.
   *
   * @private
   * @param {Array} errors - Array with all errors to be displayed
   */
  Password.prototype._addPasswordErrorsToPopover = function(errors) {
    const list = this._popover.getContent()[0];
    list.removeAllItems();
    list.destroyItems();
    errors.forEach(function(item) {
      list.addItem(item);
    });
  };

  /**
   * Check password rules and returns errors.
   *
   * @private
   * @param {string} value - The password value to be checked against the rules
   * @returns {Array} A list with all errors
   */
  Password.prototype._getPasswordErrors = function(value) {
    this.destroyAggregation('errorItems');
    const that = this;
    const errors = [];
    let regxp = /\d/;
    if (this.getRequireNumbers() && !regxp.test(value)) {
      errors.push(new StandardListItem({
        title: this._resourceBundle.getText('PASSWORD_MUST_HAVE_NUMBER'),
        info: '[0-9]',
        infoState: ValueState.Error
      }));
    }
    regxp = /[a-zA-Z]/;
    if (this.getRequireLetters() && !regxp.test(value)) {
      errors.push(new StandardListItem({
        title: this._resourceBundle.getText('PASSWORD_MUST_HAVE_LETTER'),
        info: '[a-z , A-Z]',
        infoState: ValueState.Error
      }));
    }
    regxp = /[a-z]/;
    if (this.getRequireLowercase() && !regxp.test(value)) {
      errors.push(new StandardListItem({
        title: this._resourceBundle.getText('PASSWORD_MUST_HAVE_LOWERCASE_LETTER'),
        info: '[a-z]',
        infoState: ValueState.Error
      }));
    }
    regxp = /[A-Z]/;
    if (this.getRequireUppercase() && !regxp.test(value)) {
      errors.push(new StandardListItem({
        title: this._resourceBundle.getText('PASSWORD_MUST_HAVE_UPPERCASE_LETTER'),
        info: '[A-Z]',
        infoState: ValueState.Error
      }));
    }
    regxp = /\W/;
    if (this.getRequireSymbols() && !regxp.test(value)) {
      errors.push(new StandardListItem({
        title: this._resourceBundle.getText('PASSWORD_MUST_HAVE_SYMBOL'),
        info: '[!, @, #, $, %, &...]',
        infoState: ValueState.Error
      }));
    }
    if (this.getMinLength() > 0 && value.length < this.getMinLength()) {
      errors.push(new StandardListItem({
        title: this._resourceBundle.getText('PASSWORD_MUST_HAVE_NOT_LESS'),
        info: this._resourceBundle.getText('PASSWORD_LIMIT_CHARACTERS', this.getMinLength()),
        infoState: ValueState.Error
      }));
    }
    if (this.getMaxLength() > 0 && value.length > this.getMaxLength()) {
      errors.push(new StandardListItem({
        title: this._resourceBundle.getText('PASSWORD_MUST_HAVE_NOT_MORE'),
        info: this._resourceBundle.getText('PASSWORD_LIMIT_CHARACTERS', this.getMaxLength()),
        infoState: ValueState.Error
      }));
    }
    errors.forEach(function(errorItem) {
      that.addAggregation('errorItems', errorItem, true);
    });
    return errors;
  };


  /**
   * Returns the calculated score of the password.
   *
   * @private
   * @param {string} value - The password value
   * @returns {number} The current score or 0 as default
   */
  Password.prototype._calculateScore = function(value) {
    if (!value || value.length < 1) {
      return 0;
    }
    return zxcvbn(value).score || 0;
  };

  /**
   * Defines status according to a given score.
   *
   * @private
   * @param {number} score - The score value
   */
  Password.prototype._setStatus = function(score) {
    const status = this._getStatus(score);
    this.setValueState(status.state);
    this.setValueStateText(status.text);
  };

  /**
   * Returns the current status.
   *
   * @private
   * @param {number} score - The score value
   * @returns {object} The status object
   */
  Password.prototype._getStatus = function(score) {
    let status = {
      state: ValueState.None,
      text: ''
    };
    switch (score) {
      case 0:
        status = {
          state: ValueState.Error,
          text: this._resourceBundle.getText('PASSWORD_IS_VERY_WEAK')
        };
        break;

      case 1:
        status = {
          state: ValueState.Error,
          text: this._resourceBundle.getText('PASSWORD_IS_WEAK')
        };
        break;

      case 2:
        status = {
          state: ValueState.Warning,
          text: this._resourceBundle.getText('PASSWORD_IS_NOT_STRONG_ENOUGH')
        };
        break;

      case 3:
        status = {
          state: ValueState.Success,
          text: this._resourceBundle.getText('PASSWORD_IS_STRONG')
        };
        break;

      case 4:
        status = {
          state: ValueState.Success,
          text: this._resourceBundle.getText('PASSWORD_IS_VERY_STRONG')
        };
        break;

      default:
        break;
    }
    return status;
  };

  return Password;
});
