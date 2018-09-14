import React from 'react';
import {Image} from 'semantic-ui-react';
export default function GalleryGenerate(props){
    return (
        <div>
            <div className="cell">
                <Image src={props.src} key={props.key}/>
            </div>
        </div>
    )
}
