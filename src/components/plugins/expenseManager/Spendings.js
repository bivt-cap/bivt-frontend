/**
 * This component is responsible to load data in spending tabs
 *
 * @version 0.0.1
 * @author Arshdeep Singh (https://github.com/Singh-Arshdeep)
 */
//react
import React from 'react';

//native base
import {Container, Content} from 'native-base';

const Spendings = (props) => {
  return (
    <Container>
      <Content>{props.data}</Content>
    </Container>
  );
};

export default Spendings;
