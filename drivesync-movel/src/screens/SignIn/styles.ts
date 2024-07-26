import styled from 'styled-components/native';
import theme from '../../theme';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 52px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
    font-size: ${({ theme}) => theme.FONT_SIZE.XXXL};
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
    text-align: center;
`;

export const Slogan = styled.Text`
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: ${({ theme}) => theme.FONT_SIZE.MD};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
    text-align: center;
`;