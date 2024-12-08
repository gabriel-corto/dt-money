import styled from "styled-components";

export const SpineerContainer = styled.div`
  margin-top: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    animation: loading 1.5s linear infinite;

    @keyframes loading {
      0% {
        transform: rotate(360deg);
      }
    }
  }

`