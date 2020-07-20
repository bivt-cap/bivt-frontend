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
  Spinner,
} from 'native-base';

const AddPolling = ({route, navigation}) => {
  const initialPolling = {
    id: null,
    qst: '',
    answer: [],
    enabled: true,
  };

  const [polling, setPolling] = useState(initialPolling);
  const [showSpinner, setShowSpinner] = useState(false);

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
    let ans = {
      name: content,
      value: 0,
    };
    if (name === 'answerFirst') {
      setPolling((prevState) => {
        let ansArr = prevState.answer;
        ansArr[0] = ans;
        return {
          ...prevState,
          answer: ansArr,
        };
      });
    } else if (name === 'answerSecond') {
      setPolling((prevState) => {
        let ansArr = prevState.answer;
        ansArr[1] = ans;
        return {
          ...prevState,
          answer: ansArr,
        };
      });
    } else if (name === 'answerThird') {
      setPolling((prevState) => {
        let ansArr = prevState.answer;
        ansArr[2] = ans;
        return {
          ...prevState,
          answer: ansArr,
        };
      });
    }
    //console.log(polling);
  };

  const navigateToMainScreen = () => {
    setShowSpinner(true);
    setTimeout(() => {
      navigation.navigate('Polling');
      setPolling(initialPolling);
    }, 1000);
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
                onChangeText={(content) => handleAnswer('answerFirst', content)}
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
                onChangeText={(content) =>
                  handleAnswer('answerSecond', content)
                }
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
                onChangeText={(content) => handleAnswer('answerThird', content)}
                value={
                  polling && polling.answer && polling.answer[2]
                    ? polling.answer[2].name
                    : ''
                }
              />
            </Item>
            {/* <Button style={PollingStyle.addOptionBtn}>
              <Text style={PollingStyle.btnText}>Add option</Text>
            </Button> */}
            {showSpinner && <Spinner />}
          </Form>
        </Content>
      </Container>

      <View style={PollingStyle.submitBtnWrap}>
        <Button
          style={PollingStyle.submitBtn}
          onPress={() => {
            if (polling.qst && polling.answer) {
              handleAddNewPoll(polling);
              //navigate to mainscreen
              navigateToMainScreen();
            }
          }}>
          <Text style={PollingStyle.btnText}>Create</Text>
        </Button>
      </View>
    </>
  );
};

export default AddPolling;

//code source https://github.com/Singh-Arshdeep/simple-poll
