import React from 'react';
import { Segment, List,Button } from 'semantic-ui-react';
import './sugestion.css';
import _ from 'lodash'
import { SuggestionList } from '../../../constant';
export default function SuggestionGenerate(props) {
    let getInfo = new SuggestionList(props.val);
    let result = getInfo.showSuggestion();
    let suggestionShow = localStorage.getItem('suggestion');
        console.log(suggestionShow)
    return (
        <div id="test">
            {/* <Container> */}
            {result.length > 0 && props.val !== '' ? <Segment className='checking'>
                <List divided verticalAlign='middle'>
                    <List.Item>

                        {_.map(_.slice(result,0,10), (name, i) => {
                            return <List.Content key={name} id={name}><h3>{name}</h3></List.Content>
                        })}
                    </List.Item>
                </List>
                
            </Segment> : null}
            {/* </Container> */}
            {/* <Button onClick={() => {localStorage.clear()}}>Clear</Button> */}
        </div>
    )
}
