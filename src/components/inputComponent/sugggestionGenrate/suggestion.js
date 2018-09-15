import React from 'react';
import { Segment, List, Container } from 'semantic-ui-react';
import './sugestion.css';
import _ from 'lodash'
import { SuggestionList } from '../../../constant';
export default function SuggestionGenerate(props) {
    let getInfo = new SuggestionList(props.val);
    let result = getInfo.showSuggestion();
    console.log(result); 
    return (
        <div id="test">
            {/* <Container> */}
            {result.length > 0 && props.val !== '' ? <Segment className='checking'>
                <List divided verticalAlign='middle'>
                    <List.Item>

                        {_.map(result, (name, i) => {
                            return <List.Content key={i}><h3>{name}</h3></List.Content>
                        })}
                    </List.Item>
                </List>
            </Segment> : null}
            {/* </Container> */}
        </div>
    )
}
