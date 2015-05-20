// ====================================
//
// Imports
//
// ====================================
var lodash = require('lodash');
var React = require('react');
var logger = require('bragi-browser');

// ====================================
//
// Main
//
// ====================================
// ------------------------------------
// (Main) Friends List
// ------------------------------------
var FriendsList = React.createClass({
    getInitialState: function () {
        logger.log('FriendsList:getInitialState', 'called');
        return {
            name: 'Erik',
            friends: ['thristleshot', 'enoex', 'aaragorn', 'vasir', 'mimir']
        };
    },

    componentWillMount: function(){
        logger.log('FriendsList:componentWillMount', 'called');
    },
    componentDidMount: function(){
        logger.log('FriendsList:componentDidMount', 'called');
    },
    componentWillReceiveProps: function(){
        logger.log('FriendsList:componentWillReceiveProps', 'called');
    },
    componentWillUnmount: function(){
        logger.log('FriendsList:componentWillUnmount', 'called');
    },

    addFriend: function( friend ){
        logger.log('FriendsList:addFriend', 'called');
        this.setState({
            friends: this.state.friends.concat([ friend ])
        });
    },

    render: function () {
        logger.log('FriendsList:render', 'called');
        return (
            <div>
                <h3> Name: {this.state.name} </h3>
                <ShowList names={this.state.friends} />
                <AddFriend addNew={this.addFriend} />
            </div>
        );
    }
});


// ------------------------------------
// Add Friend
// ------------------------------------
var AddFriend = React.createClass({
    getInitialState: function(){
        logger.log('AddFriend:getInitialState', 'called');
        return { newFriend: '' };
    },

    componentWillReceiveProps: function(){
        logger.log('AddFriend:componentWillReceiveProps', 'called');
    },

    propTypes: {
        addNew: React.PropTypes.func.isRequired
    },

    updateNewFriend: function (e){
        logger.log('AddFriend:updateNewFriend', 'called');
        this.setState({ newFriend: e.target.value });
    },

    handleAddNewFriend: function () {
        logger.log('AddFriend:handleAddNewFriend', 'called');

        if(('' + this.state.newFriend.length) < 1){
            console.log('Invalid Name');
            return false;
        }

        this.props.addNew(this.state.newFriend);
        this.setState({ newFriend: '' });
    },

    render: function () {
        logger.log('AddFriend:render', 'called | ' + this.state.newFriend);

        return (
            <div>
                <input type='text' value={this.state.newFriend} onChange={this.updateNewFriend} />
                <button onClick={this.handleAddNewFriend}> Add Friend </button>
            </div>
        );
    }
});



var ShowList = React.createClass({
    getDefaultProps: function(){
        return { names: [] };
    },

    render: function () {
        logger.log('ShowList:render', 'called with: %O', this.props);

        var listItems = this.props.names.map(function(friend){
            return <li> {friend} </li>;
        });

        return (
            <div>
                <h3> Friends </h3>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
});

// ====================================
//
// Render
//
// ====================================
React.render(<FriendsList />, document.getElementById('app'));
