import React, {useState} from 'react';
import PollingStyle from './PollingStyle';
import {TouchableOpacity} from 'react-native';
import {Container, Content, Text, View, Button} from 'native-base';

const PollingDetail = ({route, navigation}) => {
  const {
    qstValue,
    qstid,
    btn1,
    btn2,
    btn3,
    value1,
    value2,
    value3,
  } = route.params;

  return (
    <>
      <Container style={PollingStyle.container}>
        <Content style={PollingStyle.content}>
          <View>
            <Text style={PollingStyle.topTitle}>{qstValue}</Text>
          </View>

          <View>
            <TouchableOpacity style={PollingStyle.optionBtnWrap}>
              <Button transparent dark rounded style={PollingStyle.optionsBtn}>
                <Text style={{textTransform: 'capitalize'}}>{btn1}</Text>
              </Button>
            </TouchableOpacity>

            <TouchableOpacity style={PollingStyle.optionBtnWrap}>
              <Button transparent dark rounded style={PollingStyle.optionsBtn}>
                <Text style={{textTransform: 'capitalize'}}>{btn2}</Text>
              </Button>
            </TouchableOpacity>

            <TouchableOpacity style={PollingStyle.optionBtnWrap}>
              <Button transparent dark rounded style={PollingStyle.optionsBtn}>
                <Text style={{textTransform: 'capitalize'}}>{btn3}</Text>
              </Button>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>

      <View style={PollingStyle.submitBtnWrap}>
        <Button
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
      </View>
    </>
  );
};

export default PollingDetail;
