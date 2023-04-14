import React from 'react'
import styled from 'styled-components';

const Landing = () => {
  return (
    <LandingContainer>
      <h2>Landing Page</h2>
    </LandingContainer>
  )
}

const LandingContainer = styled.div`
  text-align: center;
  background-image: url('../../public/assets/perro1.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
  min-height: 100vh;
  padding: 25px;
`;

export default Landing
