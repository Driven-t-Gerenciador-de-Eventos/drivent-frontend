import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

import Container from '../Container';

export const StyledContainer = styled(Container)`
  font-size: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-top: 10px;
`;

export const Label = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 15px 5px 15px;
  margin-bottom: 20px;
  gap: 10px;

  font-size: 16px;
  font-weight: bold;

  cursor: pointer;
  border: 2px solid #1976d2;
  border-radius: 5px;

  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  &:hover {
  border: 2px solid #2c2b2b;
  }
`;

export const Github = styled(FaGithub)`
  font-size: 30px;
`;