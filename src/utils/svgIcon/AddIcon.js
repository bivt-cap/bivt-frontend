import React from 'react';
import {Svg, Path, G, Circle, Rect} from 'react-native-svg';

const AddIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64">
      <G
        id="Group_1662"
        data-name="Group 1662"
        transform="translate(-594 -5009)">
        <Rect
          id="Rectangle_233"
          data-name="Rectangle 233"
          width="64"
          height="64"
          transform="translate(594 5009)"
          fill="none"
          opacity="0.315"
        />
        <G
          id="Ellipse_37"
          data-name="Ellipse 37"
          transform="translate(594 5009)"
          fill="none"
          stroke="#a53bba"
          stroke-width="2">
          <Circle cx="64" cy="64" r="64" stroke="none" />
          <Circle cx="64" cy="64" r="15.5" fill="none" />
        </G>
        <G id="Group_1525" data-name="Group 1525">
          <G
            id="Rectangle_234"
            data-name="Rectangle 234"
            transform="translate(610 5017)"
            fill="#fff"
            stroke="#a53bba"
            stroke-width="1">
            <Rect width="2" height="17" rx="1" stroke="none" />
            <Rect x="0.5" y="0.5" width="1" height="16" rx="0.5" fill="none" />
          </G>
          <G
            id="Rectangle_235"
            data-name="Rectangle 235"
            transform="translate(619.5 5024.5) rotate(90)"
            fill="#fff"
            stroke="#a53bba"
            stroke-width="1">
            <Rect width="2" height="17" rx="1" stroke="none" />
            <Rect x="0.5" y="0.5" width="1" height="16" rx="0.5" fill="none" />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default AddIcon;
