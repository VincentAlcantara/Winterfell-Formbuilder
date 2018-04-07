'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageSortButton = function PageSortButton(props) {
  return _react2.default.createElement(
    _reactBootstrap.Button,
    {
      className: 'btn btn-block btn-primary',
      onClick: props.onClick
    },
    'sort pages'
  );
};

PageSortButton.propTypes = {
  onClick: _propTypes2.default.func.isRequired
};
var _default = PageSortButton;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(PageSortButton, 'PageSortButton', 'src/components/FormMenu/PageSortButton.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/components/FormMenu/PageSortButton.js');
}();

;