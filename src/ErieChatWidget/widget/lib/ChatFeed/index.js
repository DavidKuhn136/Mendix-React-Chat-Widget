// Copyright 2016 Brandon Mowat
// Written, developed, and designed by Brandon Mowat for the purpose of helping
// other developers make chat interfaces.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('../ChatBubble/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../ChatInput/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../Message/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatFeed = function (_Component) {
  _inherits(ChatFeed, _Component);

  function ChatFeed(props) {
    _classCallCheck(this, ChatFeed);

    var _this = _possibleConstructorReturn(this, (ChatFeed.__proto__ || Object.getPrototypeOf(ChatFeed)).call(this, props));

    _this.state = {
      messages: props.messages || []
    };
    return _this;
  }

  _createClass(ChatFeed, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      //console.log('ChatFeed update');
    }
  }, {
    key: '_scrollToBottom',
    value: function _scrollToBottom() {
      var chat = this.refs.chat;

      var scrollHeight = chat.scrollHeight;
      var height = chat.clientHeight;
      var maxScrollTop = scrollHeight - height;
      _reactDom2.default.findDOMNode(chat).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    /**
      * Parses and collects messages of one type to be grouped together.
      *
      * @param {messages} - a list of Message objects
      * @param {index} - the index of the end of the message group
      * @param {type} - the type of group (user or recipient)
      * @return {message_nodes} - a JSX wrapped group of messages
      */

  }, {
    key: '_renderGroup',
    value: function _renderGroup(messages, index, id) {
      var _this2 = this;

      var group = [];

      for (var i = index; messages[i] ? messages[i].id == id : false; i--) {
        group.push(messages[i]);
      }

      var message_nodes = group.reverse().map(function (curr, index) {
        return _react2.default.createElement(_index2.default, {
          key: Math.random().toString(36),
          message: curr,
          bubblesCentered: _this2.props.bubblesCentered ? true : false,
          bubbleStyles: _this2.props.bubbleStyles });
      });
      return _react2.default.createElement(
        'div',
        { key: Math.random().toString(36), style: styles.chatbubbleWrapper },
        message_nodes
      );
    }

    /**
      * Determines what type of message/messages to render.
      *
      * @param {messages} - a list of message objects
      * @return {message_nodes} - a list of message JSX objects to be rendered in
      *   our UI.
      */

  }, {
    key: '_renderMessages',
    value: function _renderMessages(messages) {
      var _this3 = this;

      var message_nodes = messages.map(function (curr, index) {

        // Find diff in message type or no more messages
        if ((messages[index + 1] ? false : true) || messages[index + 1].id != curr.id) {
          return _this3._renderGroup(messages, index, curr.id);
        }
      });

      // Other end is typing...
      if (this.props.isTyping) {
        message_nodes.push(_react2.default.createElement(
          'div',
          { key: Math.random().toString(36), style: Object.assign({}, styles.recipient, styles.chatbubbleWrapper) },
          _react2.default.createElement(_index2.default, { message: new _index6.default(1, "..."), bubbleStyles: this.props.bubbleStyles ? this.props.bubbleStyles : {} })
        ));
      }

      // return nodes
      return message_nodes;
    }

    /**
    * render : renders our chatfeed
    */

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      window.setTimeout(function () {
        _this4._scrollToBottom();
      }, 10);

      var inputField = this.props.hasInputField ? _react2.default.createElement(_index4.default, null) : null;

      return _react2.default.createElement(
        'div',
        { id: 'chat-panel', style: styles.chatPanel },
        _react2.default.createElement(
          'div',
          { ref: 'chat', className: 'chat-history', style: styles.chatHistory },
          _react2.default.createElement(
            'div',
            { className: 'chat-messages' },
            this._renderMessages(this.props.messages)
          )
        ),
        inputField
      );
    }
  }]);

  return ChatFeed;
}(_react.Component);

exports.default = ChatFeed;


var styles = {
  chatPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  chatHistory: {
    overflow: 'auto'
  },
  chatbubbleWrapper: {
    marginTop: 10,
    marginBottom: 10,
    overflow: 'auto',
    position: 'relative'
  },
  img: {
    borderRadius: 100,
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: 36,
    zIndex: 100
  }
};

ChatFeed.propTypes = {
  isTyping: _react2.default.PropTypes.bool,
  hasInputField: _react2.default.PropTypes.bool,
  bubblesCentered: _react2.default.PropTypes.bool,
  bubbleStyles: _react2.default.PropTypes.object,
  messages: _react2.default.PropTypes.array.isRequired
};
