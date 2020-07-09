import React, {useState, useEffect} from 'react';
import PollingStyle from './PollingStyle';
import {
  Container,
  Content,
  View,
  Item,
  Form,
  Label,
  Input,
  Button,
  Text,
} from 'native-base';

const AddPolling = ({route, navigation}) => {
  const initialPolling = {
    id: null,
    qst: '',
  };

  const [polling, setPolling] = useState(initialPolling);

  const handleChange = (name, content) => {
    setPolling((prevState) => {
      if (name === 'qst') {
        return {
          ...prevState,
          [name]: content,
        };
      }
    });
  };

  const handleAnswer = (name, content) => {
    let answer = polling.answer ? [...polling.answer] : [];
    answer.push({
      name: [content],
      value: 0,
    });

    setPolling({
      ...polling,
      answer,
    });
  };

  const {handleAddNewPoll} = route.params;

  return (
    <>
      <Container style={PollingStyle.container}>
        <Content>
          <Form>
            <Label>Question</Label>
            <Item regular style={PollingStyle.inputStyle}>
              <Input
                placeholder={'Your Question'}
                onChangeText={(content) => handleChange('qst', content)}
                value={polling.qst}
              />
            </Item>

            <Label>Answer First</Label>
            <Item regular style={PollingStyle.inputStyle}>
              <Input
                placeholder={'Answer First'}
                onChangeText={(content) => handleAnswer('answer', content)}
                value={
                  polling && polling.answer && polling.answer[0]
                    ? polling.answer[0].name
                    : ''
                }
              />
            </Item>

            <Label>Answer Second</Label>
            <Item regular style={PollingStyle.inputStyle}>
              <Input
                placeholder={'Answer Second'}
                onChangeText={(content) => handleAnswer('answer', content)}
                value={
                  polling && polling.answer && polling.answer[1]
                    ? polling.answer[1].name
                    : ''
                }
              />
            </Item>

            <Label>Answer Third</Label>
            <Item regular style={PollingStyle.inputStyle}>
              <Input
                placeholder={'Answer Third'}
                onChangeText={(content) => handleAnswer('answer', content)}
                value={
                  polling && polling.answer && polling.answer[2]
                    ? polling.answer[2].name
                    : ''
                }
              />
            </Item>
          </Form>
        </Content>
      </Container>

      <View style={PollingStyle.submitBtnWrap}>
        <Button
          style={PollingStyle.submitBtn}
          onPress={() => {
            // if (!polling.qst || !polling.answer) return;
            handleAddNewPoll(polling);
            setPolling(initialPolling);
          }}>
          <Text style={PollingStyle.btnText}>Create</Text>
        </Button>
      </View>
    </>
  );
};

export default AddPolling;

//code source https://github.com/Singh-Arshdeep/simple-poll
