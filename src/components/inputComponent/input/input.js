import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import _ from 'lodash';


export default class InputHandleChange extends Component {
    state = {
        val: null,
        text: ''
    }
    handleChange = _.debounce((value) => {
        console.log(value);
        this.props.handleValue(value);
    }, 600);

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps, nextState);
        if (nextProps.text != null && nextProps.checkText == true) {
            console.log(nextProps.text);
            // this.setState({text:nextProps.text});
            this.state.text = nextProps.text;
            return true;
        }
        else {
            return true;
        }

    }
    render() {
        return (
            <div>
                <Input icon='search'
                    className="inputText"
                    value={this.state.text}
                    placeholder='Type whatever you want to fetch the information from flickr...'
                    onChange={(e) => {
                        this.handleChange(e.target.value);
                        this.setState({ text: e.target.value })
                        this.props.handleSuggestion(e.target.value);
                    }}
                />
            </div>
        )
    }
}
