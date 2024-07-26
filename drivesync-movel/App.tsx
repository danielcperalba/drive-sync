import { ThemeProvider } from 'styled-components/native';

import theme from './src/theme';

import { SignIn } from './src/screens/SignIn';
import { StatusBar } from 'react-native';

export default function App(){

  return(
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
      <SignIn />
    </ThemeProvider>
  )
}