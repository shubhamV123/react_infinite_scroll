import React, { Component } from 'react';
import './gallery.css';
import { Container, Loader, Segment, Header } from 'semantic-ui-react';
import axios from 'axios';
import { UrlGenerate, ImageUrlGenerate } from '../../../constant';
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
            text:'SEARCH SOMETHING'
        }

    }

    componentWillMount(props) {
        window.addEventListener('scroll', (e) => {
            this.handleScroll()
        })
    }
    handleScroll = () => {
        let { scrolling, totalPage, page } = this.state;
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
            this.state.value.length>0?this.loadMore(props):null
        })
    }
    loadNew() {
        this.setState(prevState => ({

            page: prevState.page + 1,
            scrolling: true
        }), () => {
            this.state.value.length>0?this.loadMore():null
        });
    }
    loadMore() {
        this.setState({
            loading: true,
            text:''
        })
        let url = new UrlGenerate(this.state.value, this.state.perPage, this.state.page);
        axios.get(url.generateUrl()).then((res) => {
           res.data.photos.photo.length>0?( _.map(res.data.photos.photo, (link) => {
                let imgUrl = new ImageUrlGenerate(link.farm, link.server, link.id, link.secret);
                this.state.data = [...this.state.data, {
                    src: imgUrl.generateImageSrcURL(),
                    link
                }]
            })):null;
            this.setState({
                loading: false,
                scrolling: false,
                totalPage: res.data.pages,
                text:res.data.photos.photo.length>0?'':'NO RESULT FOUND'
            })
        })
            .catch(e => {
                this.setState({
                    loading:false
                })
            })
    }
    render() {
        return (
            <Segment>
                <Container fluid>
                {this.state.data.length>0?<div className="gallery">
                        {_.map(this.state.data, (eachPhoto, i) => {
                            return <GalleryGenerate src={eachPhoto.src} key={i} />
                        })}
                    </div>:<Header as="h1" textAlign="center" style={{marginTop:"8rem"}}>{this.state.text}</Header>}
                    
                </Container>
                <Loader active={this.state.loading} inline='centered' size="big" />
            </Segment>
        )
    }
}
