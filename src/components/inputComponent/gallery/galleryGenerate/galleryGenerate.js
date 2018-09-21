import React, { Component } from 'react';
import { Image, Modal,Icon, Responsive } from 'semantic-ui-react';
import { ImageUrlGenerate } from '../../../../constant'


export default class GalleryGenerate extends Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false }
    }
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })
    render() {
        let { farm, server, id, secret, title } = this.props.data.link;
        let imgUrl = new ImageUrlGenerate(farm, server, id, secret, 'h');
        return (
            <div>
                <div className="cell">
                    <Modal trigger={<Image src={this.props.src} key={this.props.key} onClick={this.handleOpen}/>}
                     basic size="fullscreen" 
                     open={this.state.modalOpen}
                     onClose={this.handleClose} >
                        <Modal.Header><center>{title} <Icon name="close" onClick={this.handleClose} style={{cursor:"pointer",float:"right"}}/></center></Modal.Header>
                        <center>
                            <Modal.Content>
                                <Responsive minWidth={1100}>
                                <Image src={imgUrl.generateImageSrcURL()} key={this.props.key} style={{maxWidth:"70%"}}/>
                                </Responsive>
                                <Responsive maxWidth={1099}>
                                <Image src={imgUrl.generateImageSrcURL()} key={this.props.key} />
                                </Responsive>
                            </Modal.Content>
                        </center>
                    </Modal>

                </div>
            </div>
        )
    }
}

