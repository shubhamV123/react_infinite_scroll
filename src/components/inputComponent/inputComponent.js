import React, { Component } from 'react';
import './inputComponent.css';
import { Input, Container, Menu, List } from 'semantic-ui-react';
import Gallery from './gallery/gallery';
import _ from 'lodash';
import SuggestionGenerate from './sugggestionGenrate/suggestion';
import InputHandleChange from './input/input';
export default class InputComponent extends Component {
    state = {
        value: '',
        suggestionText: null,
        text: null,
        checkText: false,
        test: false,
        suggestionShow: true
    }
    handleChange = _.debounce((value) => {
        this.setState({ value })
    }, 600);
    componentDidMount() {
        //added event listner for suggestion click
        document.getElementById("test").addEventListener('click', (e) => {
            this.handleClick(e);
        }, false);
        //added event listner for suggestion click
        // document.getElementById("gallery") != null ? document.getElementById("gallery").addEventListener('click', (e) => {
        //     this.handleSuggestionText(e);
        //     // this.state.suggestionText ='';
        // }, false) : null;
        //added event listner for mouse hover in on list
        document.getElementById("test").addEventListener('mouseover', (e) => {
            document.getElementById(`${e.target.innerText}`) != null ? document.getElementById(`${e.target.innerText}`).style.backgroundColor = "lightGrey" : null;
        }, false);
        //added event listner for mouse hover out on list
        document.getElementById("test").addEventListener('mouseout', (e) => {
            document.getElementById(`${e.target.innerText}`) != null ? document.getElementById(`${e.target.innerText}`).style.backgroundColor = "white" : null;
        }, false);
        //added event listner for key enter
        document.body.addEventListener('keypress', (e) => {
            var key = e.which || e.keyCode;
            if (key === 13) { // 13 is enter
                this.setState({ suggestionText: '', text: this.state.value, value: this.state.value, checkText: true, test: true });
            }
        });

    }
    handleSuggestionText() {
        this.state.suggestionText = '';
        this.state.test = false;

    }
    handleClick(e) {
        e.preventDefault();
        let text = e.target.innerText;
        this.setState({ suggestionText: '', text, value: text, checkText: true, test: true });
    }
    handleValue(value) {
        this.setState({
            value,
            suggestionShow: true
        })
    }
    handleSuggestion(val) {
        this.state.suggestionText = val;
        this.state.checkText = false;

        if (!this.state.suggestionShow) {
            this.setState({
                suggestionShow: true
            });
        }
    }

    render() {
        return (
            <div>
                <Menu fixed='top'>

                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">Welcome to React Gallery</h1>

                            <Container className="listColor">
                                <InputHandleChange checkText={this.state.checkText} text={this.state.text} handleValue={this.handleValue.bind(this)} handleSuggestion={this.handleSuggestion.bind(this)} />
                                <SuggestionGenerate val={this.state.suggestionText} />

                            </Container>
                        </header>
                    </div>
                </Menu>



                <Gallery value={this.state.value} />
            </div>

        )
    }
}
