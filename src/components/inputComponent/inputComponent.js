import React, { Component } from 'react';
import './inputComponent.css';
import { Input, Container, Menu,List } from 'semantic-ui-react';
import Gallery from './gallery/gallery';
import _ from 'lodash';
import SuggestionGenerate from './sugggestionGenrate/suggestion';
import InputHandleChange from './input/input';
export default class InputComponent extends Component {
    state = {
        value:'',
        showSuggestion:false,
        suggestionText:null,
        text:null,
        checkText:false
    }
    handleChange = _.debounce((value) => {
        console.log(value);
        this.setState({value,showSuggestion:true})
    },600);
    componentDidMount(){
        document.getElementById("test").addEventListener('click', (e) => {
            this.handleClick(e);
        }, false); 
        document.getElementById("test").addEventListener('mouseover', (e) => {
            console.log('Works e.target',e.target.innerText,document.getElementById(`${e.target.innerText}`));
            document.getElementById(`${e.target.innerText}`)!=null?document.getElementById(`${e.target.innerText}`).style.backgroundColor = "lightGrey":null;
        }, false);
        document.getElementById("test").addEventListener('mouseout', (e) => {
            document.getElementById(`${e.target.innerText}`)!=null?document.getElementById(`${e.target.innerText}`).style.backgroundColor = "white":null;
        }, false);

    }
    handleClick(e){
        e.preventDefault();
        console.log('works',e.target.innerText);
        let text = e.target.innerText;
        this.setState({suggestionText:'',text,value:text,checkText:true});
    }
    handleValue(value){
        this.setState({
            value,
            showSuggestion:true
        })
    }
    handleSuggestion(val){
        this.state.suggestionText = val;
        this.state.checkText = false;
    //     this.setState({
    //         suggestionText:val
    //     })
    }
   
    render() {
        console.log(this.state.suggestionText);
        return (
            <div>
                <Menu fixed='top'>

                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">Welcome to React Gallery</h1>

                            <Container className="listColor">
                                {/* <Input icon='search'
                                    className="inputText"
                                    value = {(this.state.suggestionText!=='')?this.state.suggestionText:this.state.value==''?'':this.state.text}
                                    placeholder='Type whatever you want to fetch the information from flickr...'
                                    onChange = {(e) => {this.handleChange(e.target.value);this.setState({suggestionText:e.target.value})}} 
                                    /> */}
                                <InputHandleChange checkText={this.state.checkText} text={this.state.text} handleValue = {this.handleValue.bind(this)} handleSuggestion = {this.handleSuggestion.bind(this)}/>
                                <SuggestionGenerate val={this.state.suggestionText}/>

                            </Container>
                        </header>
                    </div>
                </Menu>
                

                
                <Gallery value={this.state.value}/>
            </div>

        )
    }
}
