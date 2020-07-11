import React, {useState} from 'react';
import PollingStyle from './PollingStyle';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Text, View, Button, Icon} from 'native-base';

const PollingDetail = ({route, navigation}) => {
  const {
    qstValue,
    qstid,
    enabled,
    btn1,
    btn2,
    btn3,
    value1,
    value2,
    value3,
    handleAddVote,
  } = route.params;
  const [checked, setChecked] = useState({
    first: false,
    second: false,
    third: false,
  });
  const addVote = (qId, option) => {
    console.log('calling handle vote');
    setChecked({
      first: false,
      second: false,
      third: false,
      [option]: true,
    });
    handleAddVote(qId, option);
  };

  return (
    <>
      <Container style={PollingStyle.container}>
        <Content style={PollingStyle.content}>
          <View>
            <Text style={PollingStyle.topTitle}>{qstValue}</Text>
          </View>

          <View>
            <TouchableOpacity style={PollingStyle.optionBtnWrap}>
              <Button
                transparent
                dark
                rounded
                style={PollingStyle.optionsBtn}
                disabled={!enabled}
                onPress={() => {
                  addVote(qstid, 'first');
                }}>
                <Text style={{textTransform: 'capitalize'}}>{btn1}</Text>
                {checked.first && <Icon name="checkmark-circle" />}
              </Button>
            </TouchableOpacity>

            <TouchableOpacity style={PollingStyle.optionBtnWrap}>
              <Button
                transparent
                dark
                rounded
                style={PollingStyle.optionsBtn}
                disabled={!enabled}
                onPress={() => {
                  addVote(qstid, 'second');
                }}>
                <Text style={{textTransform: 'capitalize'}}>{btn2}</Text>
                {checked.second && <Icon name="checkmark-circle" />}
              </Button>
            </TouchableOpacity>

            <TouchableOpacity style={PollingStyle.optionBtnWrap}>
              <Button
                transparent
                dark
                rounded
                style={PollingStyle.optionsBtn}
                disabled={!enabled}
                onPress={() => {
                  addVote(qstid, 'third');
                }}>
                <Text style={{textTransform: 'capitalize'}}>{btn3}</Text>
                {checked.third && <Icon name="checkmark-circle" />}
              </Button>
            </TouchableOpacity>
            {!enabled && (
              <Button
                style={PollingStyle.seeResultBtn}
                disabled={enabled}
                onPress={() => {
                  navigation.navigate('PollingGraph', {
                    qstValue: qstValue,
                    btn1: btn1,
                    btn2: btn2,
                    btn3: btn3,
                    value1: value1,
                    value2: value2,
                    value3: value3,
                  });
                }}>
                <Text style={PollingStyle.btnText}>See Results</Text>
              </Button>
            )}
          </View>
        </Content>
      </Container>

      <View style={PollingStyle.submitBtnWrap}>
        {enabled && (
          <Button
            disabled={!enabled}
            style={PollingStyle.submitBtn}
            title="Submit"
            onPress={() => {
              navigation.navigate('PollingGraph', {
                qstValue: qstValue,
                btn1: btn1,
                btn2: btn2,
                btn3: btn3,
                value1: value1,
                value2: value2,
                value3: value3,
              });
            }}>
            <Text style={PollingStyle.btnText}>Submit</Text>
          </Button>
        )}
      </View>
    </>
  );
};

export default PollingDetail;
