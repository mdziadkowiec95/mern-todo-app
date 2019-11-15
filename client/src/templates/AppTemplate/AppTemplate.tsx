import React from 'react';
import Navbar from '../../components/organisms/Navbar/Navbar';
import Container from '../Container/Container';
import MainTemplate from '../MainTemplate/MainTemplate';

const AppTemplate: React.FC = ({ children }) => (
  <MainTemplate>
    <Container>
      <Navbar />
      {children}
    </Container>
  </MainTemplate>
);

export default AppTemplate;
