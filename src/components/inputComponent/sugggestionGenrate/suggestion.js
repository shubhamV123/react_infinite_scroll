import React from 'react';
import { Segment, List, Button } from 'semantic-ui-react';
import './sugestion.css';
import _ from 'lodash'
import { SuggestionList } from '../../../constant';
//Generate Suggestion List
export default function SuggestionGenerate(props) {
    let getInfo = new SuggestionList(props.val);
    let suggestionInfoResult = getInfo.showSuggestion();
    return (
        <div id="test">
            {suggestionInfoResult.length > 0 && props.val !== '' ? <Segment className='checking'>
                <List divided verticalAlign='middle'>
                    {_.map(_.slice(suggestionInfoResult, 0, 10), (name, i) => {
                            return <List.Item key={name}><List.Content  id={name}><h3>{name}</h3></List.Content></List.Item>
                        })}
                    <List.Item>
                    <List.Content floated='right' >
                        <Button secondary>CLEAR</Button>
                    </List.Content>
                </List.Item>
                </List>
                
            </Segment> : null}

        </div>
    )
}
