import React, {useState, useEffect} from 'react';
import PollingStyle from './PollingStyle';
import {TouchableOpacity} from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Button,
  Icon,
  List,
  ListItem,
} from 'native-base';

const PollingDetail = ({route, navigation}) => {
  let {
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

  //console.log(value1, value2, value3);
  const [valueA, setValueA] = useState(value1);
  const [valueB, setValueB] = useState(value2);
  const [valueC, setValueC] = useState(value3);
  const [checked, setChecked] = useState({
    first: false,
    second: false,
    third: false,
  });
  const addVote = (qId, option) => {
    //console.log('calling handle vote');
    setChecked({
      first: false,
      second: false,
      third: false,
      [option]: true,
    });
    if (option === 'first') {
      setValueA(++value1);
    } else if (option === 'second') {
      setValueB(++value2);
    } else {
      setValueC(++value3);
    }
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
              <>
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
                <Content>
                  <List style={{alignItems: 'center', marginTop: 100}}>
                    <ListItem itemDivider>
                      <Text>Poll Completed!</Text>
                    </ListItem>
                  </List>
                </Content>
              </>
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
                value1: valueA,
                value2: valueB,
                value3: valueC,
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
