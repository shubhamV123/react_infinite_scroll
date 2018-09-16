import React from 'react';
import {Image,Modal} from 'semantic-ui-react';
import {ImageUrlGenerate} from '../../../../constant'
export default function GalleryGenerate(props){
    let {farm,server,id,secret,title} = props.data.link; 
    let imgUrl = new ImageUrlGenerate(farm, server, id, secret,'h');
    return (
        <div>
            <div className="cell">
            <Modal trigger={<Image src={props.src} key={props.key}/>} basic  closeIcon>
            <Modal.Header>{title}</Modal.Header>
                <Modal.Content>
                <Image src={imgUrl.generateImageSrcURL()} key={props.key}/>

                </Modal.Content>
            </Modal>
                
            </div>
        </div>
    )
}
