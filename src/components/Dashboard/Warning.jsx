import styled from 'styled-components';

export default function WarningMessage({ message }) {
  return (
    <AlertDiv>
      <h2>{message}</h2>
    </AlertDiv>
  );
}

const AlertDiv = styled.div`
  width: 100%;
  height: 80%;
  padding: 0% 25% 0% 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8e8e;
  text-align: center;
`;
