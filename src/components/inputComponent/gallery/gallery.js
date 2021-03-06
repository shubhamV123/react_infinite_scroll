import React, { Component } from 'react';
import './gallery.css';
import { Container, Loader, Segment, Header,Grid } from 'semantic-ui-react';
import axios from 'axios';
import { UrlGenerate, ImageUrlGenerate, SaveInfo } from '../../../constant';
import _ from 'lodash';
import GalleryGenerate from './galleryGenerate/galleryGenerate';
export default class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            scrolling: false,
            perPage: 15,
            totalPage: null,
            page: 1,
            value: '',
            text: 'SEARCH SOMETHING'
        }

    }
    reset(nextProps) {
        this.setState({
            data: [],
            loading: false,
            scrolling: false,
            perPage: 15,
            totalPage: null,
            page: 1,
            value: nextProps.value
        });
    }
    componentWillMount() {
        window.addEventListener('scroll', (e) => {
            this.handleScroll()
        })
    }
    //handling scroll event
    handleScroll = () => {
        let { scrolling, totalPage, page } = this.state;
        this.props.handleScrollSuggestion();
        if (scrolling) return;
        if (totalPage <= page) return;
        if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight - 30) {
            this.loadNew();
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: props.value
        }, () => {
            this.state.value.length > 0 ? this.loadMore(props) : null
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.value === this.state.value) {
            return true;
        }
        else {
            window.scrollTo(0, 0)
            this.reset(nextProps);
            return false;
        }

    }
    //Runs when user at bottom of screen
    loadNew() {

        this.setState(prevState => ({
            page: prevState.page + 1,
            scrolling: true
        }), () => {
            this.state.value.length > 0 ? this.loadMore() : null
        });
    }
    //Function to load 15 results
    loadMore() {
        this.setState({
            loading: true,
            text: ''
        })
        let saveInfoLocal = new SaveInfo(this.state.value);
        saveInfoLocal.setInfo();
        let url = new UrlGenerate(this.state.value, this.state.perPage, this.state.page);
        axios.get(url.generateUrl()).then((res) => {
            res.data.photos.photo.length > 0 ? (_.map(res.data.photos.photo, (link) => {
                let imgUrl = new ImageUrlGenerate(link.farm, link.server, link.id, link.secret);
                this.state.data = [...this.state.data, {
                    src: imgUrl.generateImageSrcURL(),
                    link
                }]
            })) : null;
            this.setState({
                loading: false,
                scrolling: false,
                data: this.state.data,
                totalPage: res.data.pages,
                text: res.data.photos.photo.length > 0 ? '' : 'NO RESULT FOUND'
            })
        })
            .catch(e => {
                this.setState({
                    loading: false
                })
            })
    }
    render() {
        return (
            <Segment id="gallery">
                <Container fluid>
                
                    {this.state.data.length > 0 ?<Grid divided='vertically' stackable style={{marginTop:"6em"}}>

                        <Grid.Row columns={4}>
                        {_.map(this.state.data, (eachPhoto, i) => {
                            //Generating gallery
                            return <Grid.Column key = {eachPhoto.id}>
                                    <GalleryGenerate src={eachPhoto.src} key={eachPhoto.id} data={eachPhoto}/>
                                </Grid.Column>
                        })}
                            
                        </Grid.Row>
                    </Grid>:<Header as="h1" textAlign="center" style={{ marginTop: "8rem" }}>{this.state.text===''?'Search Something':this.state.text}</Header>}
                </Container>
                <Loader active={this.state.loading} inline='centered' size="big" style={{ marginBottom: "1em" }} />
            </Segment>
        )
    }
}
