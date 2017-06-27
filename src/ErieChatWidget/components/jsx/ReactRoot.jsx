define([
  "ErieChatWidget/widget/lib/react",
  "ErieChatWidget/widget/lib/react-dom",
  "ErieChatWidget/components/js/Child"
], function(React, ReactDOM, Child) {
    return React.createClass({
      render: function(){
        return (
          <div>
            <!--<h3>{this.props.person.get('Name')}'s Chat</h3>
            <Chat person={this.props.person}/>-->
            <Chat />
          </div>
        )
      }
    })
});
