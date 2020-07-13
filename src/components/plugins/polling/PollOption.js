import React from 'react';
import {Item, Input} from 'native-base';
import PollingStyle from './PollingStyle';

const PollOption = (props) => {
  let optionName = 'option' + props.id;

  return (
    <Item regular style={PollingStyle.inputStyle}>
      <Input
        type="text"
        placeholder={optionName}
        onChangeText={props.handleChange}
        value={props.pollData.options['option' + props.id]}
        required
      />
    </Item>
  );
};

export default PollOption;
