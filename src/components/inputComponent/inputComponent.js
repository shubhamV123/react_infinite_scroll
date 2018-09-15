import React, { Component } from 'react';
import './inputComponent.css';
import { Input, Container, Menu,List } from 'semantic-ui-react';
import Gallery from './gallery/gallery';
import _ from 'lodash';
import SuggestionGenerate from './sugggestionGenrate/suggestion';
export default class InputComponent extends Component {
    state = {
        value:'',
        showSuggestion:false,
        suggestionText:null,
        text:null
    }
    handleChange = _.debounce((value) => {
        console.log(value);
        this.setState({value,showSuggestion:true})
    },600);
    componentDidMount(){
        document.getElementById("test").addEventListener('click', (e) => {
            this.handleClick(e);
        }, false); 

    }
    handleClick(e){
        e.preventDefault();
        console.log('works',e.target.innerText);
        let text = e.target.innerText;
        this.setState({suggestionText:'',text,value:text});
    }
   
    render() {
        
        return (
            <div>
                <Menu fixed='top'>

                    <div className="App">
                        <header className="App-header">
                            <h1 className="App-title">Welcome to React Gallery</h1>

                            <Container className="listColor">
                                <Input icon='search'
                                    className="inputText"
                                    value = {(this.state.suggestionText!=='')?this.state.suggestionText:this.state.value==''?'':this.state.text}
                                    placeholder='Type whatever you want to fetch the information from flickr...'
                                    onChange = {(e) => {this.handleChange(e.target.value);this.setState({suggestionText:e.target.value})}} 
                                    />
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
