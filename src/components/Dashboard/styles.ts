import styled from "styled-components";

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
`;

export const MonthArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 2rem 0;

  p {
    
  }

  img {
    transform: rotate(90deg);
    margin-left: 1rem;

    &:first-child {
      margin-right: 1rem;
      transform: rotate(-90deg);
    }
  }

`;
