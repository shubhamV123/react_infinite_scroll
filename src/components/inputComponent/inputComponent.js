import React, { Component } from 'react';
import './inputComponent.css';
import {  Container, Menu, } from 'semantic-ui-react';
import Gallery from './gallery/gallery';
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
    componentDidMount() {
        //added event listner for suggestion click
        document.getElementById("test").addEventListener('click', (e) => {
            this.handleClick(e);
        }, false);

        document.getElementById("test").addEventListener('mouseover', (e) => {
            console.log( document.getElementById(`${e.target.innerText}`));
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
                // console.log('Hitted enter')
                this.setState({ suggestionText: '', text: this.state.value, value: this.state.value, checkText: true, test: true });
            }
        });

    }
    handleSuggestionText() {
        // this.state.suggestionText = '';
        // this.state.test = false;
        this.setState({
            suggestionText:'',
            test:false
        });

    }
    handleClick(e) {
        e.preventDefault();
        console.log(e.target.tagName);
        if(e.target.tagName!=="BUTTON"){
            let text = e.target.innerText;
            this.setState({ suggestionText: '', text, value: text, checkText: true, test: true });
        }
        else{
            localStorage.clear();
            this.setState({ suggestionText: '', text:'', value: '', checkText: false, test: false });

        }
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
    }

    render() {
        return (
            <div>
                <Menu fixed='top'>

                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">Welcome to Search Gallery</h1>

                            <Container className="listColor">
                                {/*Simple Input handle*/}
                                <InputHandleChange checkText={this.state.checkText} text={this.state.text} handleValue={this.handleValue.bind(this)} handleSuggestion={this.handleSuggestion.bind(this)} />
                                {/*Simple List handle*/}
                                <SuggestionGenerate val={this.state.suggestionText} />

                            </Container>
                        </header>
                    </div>
                </Menu>


                {/*Simple Gallery handle*/}
                <Gallery value={this.state.value} />
            </div>

        )
    }
}
