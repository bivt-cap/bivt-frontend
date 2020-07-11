/* eslint-disable radix */
import React, {useContext, useEffect} from 'react';
import PollingStyle from './PollingStyle';
import {Svg, G, Rect, Path, Text as Svgtext} from 'react-native-svg';
import {Container, Content, View, Button, Text} from 'native-base';

const PollingGraph = ({route, navigation}) => {
  const {qstValue, btn1, btn2, btn3, value1, value2, value3} = route.params;

  const BarGroups = () => {
    let valTotal =
      (parseInt(value1) ? parseInt(value1) : 1) +
      (parseInt(value2) ? parseInt(value2) : 1) +
      (parseInt(value3) ? parseInt(value2) : 1);
    if (valTotal === 0) {
      valTotal = 1;
    }
    let width1 = (value1 / 7) * 100;
    let width2 = (value2 / 7) * 100;
    let width3 = (value3 / 7) * 100;

    return (
      <>
        <View style={PollingStyle.graphWrap}>
          <Svg width="100%" height="65">
            <G transform="translate(0,0)">
              <Rect
                width={`${width1}%`}
                height="65"
                rx="4"
                ry="4"
                fill="#F1B7FD"
              />
              <Svgtext
                x="15"
                y="38"
                fill="black"
                style={PollingStyle.graphFont}>
                {btn1}
              </Svgtext>
              <Svgtext
                x="86%"
                y="38"
                fill="black"
                style={PollingStyle.graphFont}>{`${parseInt(
                width1,
              )}%`}</Svgtext>
            </G>
          </Svg>
        </View>

        <View style={PollingStyle.graphWrap}>
          <Svg width="100%" height="65">
            <G transform="translate(0,0)">
              <Rect
                width={`${width2}%`}
                height="65"
                rx="4"
                ry="4"
                fill="#F1B7FD"
              />
              <Svgtext
                x="15"
                y="38"
                fill="black"
                style={PollingStyle.graphFont}>
                {btn2}
              </Svgtext>
              <Svgtext
                x="86%"
                y="38"
                fill="black"
                style={PollingStyle.graphFont}>{`${parseInt(
                width2,
              )}%`}</Svgtext>
            </G>
          </Svg>
        </View>

        <View style={PollingStyle.graphWrap}>
          <Svg width="100%" height="65">
            <G transform="translate(0,0)">
              <Rect
                width={`${width3}%`}
                height="65"
                rx="4"
                ry="4"
                fill="#F1B7FD"
              />
              <Svgtext
                x="15"
                y="38"
                fill="black"
                style={PollingStyle.graphFont}>
                {btn3}
              </Svgtext>
              <Svgtext
                x="86%"
                y="38"
                fill="black"
                style={PollingStyle.graphFont}>{`${parseInt(
                width3,
              )}%`}</Svgtext>
            </G>
          </Svg>
        </View>
      </>
    );
  };

  return (
    <>
      <Container style={PollingStyle.container}>
        <Content>
          <View>
            <Text style={PollingStyle.topTitle}>{qstValue}</Text>
          </View>

          <BarGroups />
        </Content>
      </Container>

      <View style={PollingStyle.submitBtnWrap}>
        <Button
          style={PollingStyle.submitBtn}
          onPress={() => {
            navigation.navigate('Polling');
          }}>
          <Text style={PollingStyle.btnText}>Do Other Polls</Text>
        </Button>
      </View>
    </>
  );
};

export default PollingGraph;

// code source https://codepen.io/frontendcharts/pen/jpGYoV
