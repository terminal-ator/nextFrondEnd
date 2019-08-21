import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const InlineLi = styled.li`
  display: inline;
  margin-left: 10px;
`
export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`

export const SimpleA = styled.a`
  text-decoration: none;
  color: blue;
`
export const Card = styled.div`
  margin-left: 10px;
  padding: 10px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  font-family: 'Arial';
  max-width: ${ props => props.maxWidth || '300px'};
  width: ${props => props.width || '200px'};
  max-height: ${props => props.maxHeight || '200px'};
  border: 1px solid #f2f3f5;
`

export const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  color: ${ props => props.txtColot || 'white'};
  background-color: ${props => props.bgColor || '#169EF8'} ;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);
  font-size: ${props => props.size || '14px'};

  :hover{
    background-color: #1E7BB8;
    cursor: pointer;
  }
  :disabled{
    background-color: #cccccc;
    color: #666666;
  }
`

export const LoginCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 60px auto;
`
export const LoginInput = styled.input`
  margin-top: 10px;
  font-family: 'Arial';
  border-radius: 4px;
  border: 1px solid #169EF8;
  background-color: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);
  padding: 10px;
  height: 20px;
  font-size: 14px;
  :focus{
    outline: none;

  }
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: blue;
`

export const Errorp = styled.p`
  background-color: red;
  padding: 5px;
  font-size: 12px;
  color: white;
  margin-bottom: 0px;
`;