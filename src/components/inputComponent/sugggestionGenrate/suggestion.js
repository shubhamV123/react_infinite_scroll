import React from 'react';
import {Segment} from 'semantic-ui-react'; 

export default () => {
  return (
    <div>
      <Segment className='checking'>
                            <List divided verticalAlign='middle'>
                                <List.Item>

                                    <List.Content>Lena</List.Content>
                                </List.Item>
                                <List.Item>

                                    <List.Content>Lindsay</List.Content>
                                </List.Item>
                                <List.Item>

                                    <List.Content>Mark</List.Content>
                                </List.Item>
                                <List.Item>

                                    <List.Content>Molly</List.Content>
                                </List.Item>
                            </List>
                        </Segment>
    </div>
  )
}
