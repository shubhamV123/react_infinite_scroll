import React ,{ Component }from 'react';
import { Segment, List, Button } from 'semantic-ui-react';
import './sugestion.css';
import _ from 'lodash'
import { SuggestionList } from '../../../constant';
//Generate Suggestion List
export default class SuggestionGenerate extends Component {
    state = {
        val : ''
    }
    componentDidMount(){
        this.setState({
            val : this.props.val
        })
    }
    componentWillReceiveProps(nextProps){
        console.log("NextProps",nextProps);
        nextProps.val!=''?this.setState({
            val:nextProps.val
        }):null;
    }

  render() {
    let getInfo = new SuggestionList(this.state.val);
    let suggestionInfoResult = getInfo.showSuggestion();
    return (
        <div id="test">
                     {suggestionInfoResult.length > 0 && this.props.val !== '' ? <Segment className='checking'>
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
}


