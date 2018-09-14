import React, { Component } from 'react';
import './inputComponent.css';
import { Input, List, Segment, Container, Menu } from 'semantic-ui-react';
import Gallery from './gallery/gallery';
import _ from 'lodash';

export default class InputComponent extends Component {
    state = {
        value:'',
    }
    handleChange = _.debounce((value) => {
        console.log(value);
        this.setState({value});
    },600);
    

    
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
                                    placeholder='Type whatever you want to fetch the information from flickr...'
                                    onChange = {(e) => {this.handleChange(e.target.value)}} />
                            </Container>
                        </header>
                    </div>
                </Menu>
                <Gallery value={this.state.value}/>
            </div>

        )
    }
}
