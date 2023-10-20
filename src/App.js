import { useEffect, useState } from 'react';
import './App.css';
import SolutionCard from './components/solutionCard';
import { Button, Card, CssVarsProvider, Input, Sheet, Stack, extendTheme } from '@mui/joy';
import { getSolutions } from './util/solver';
import { TwistyPlayer } from "https://cdn.cubing.net/js/cubing/twisty";
import MethodPicker from './components/methodPicker';

function App() {

  // U' F R' U R' F U F U2
  const [solutions, setSolutions] = useState([]);
  const [scramble, setScramble] = useState('');
  const [imageScramble, setImageScramble] = useState('');
  const [selected, setSelected] = useState({
    'CLL': true,
    'EG-1': true,
    'EG-2': true,
    'LEG-1': true,
    'TCLL+': true,
    'TCLL-': true,
    'LS-1': true,
    'LS-2': true,
    'LS-3': true,
    'LS-4': true,
    'LS-5': true,
    'LS-6': true,
    'LS-7': true,
    'LS-8': true,
    'LS-9': true
  });

  const click = (method) => {
    selected[method] = !selected[method];
    setSelected({ ...selected });
  };

  const submitScramble = () => {
    if (scramble.length > 0) {
      setSolutions([ ...getSolutions(scramble) ]);
      setImageScramble(scramble);
    }

  };
  
  const appTheme = extendTheme({
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            50: '#C0CCD9',
            100: '#A5B8CF',
            200: '#6A96CA',
            300: '#4886D0',
            400: '#2178DD',
            500: '#096BDE',
            600: '#1B62B5',
            700: '#265995',
            800: '#2F4968',
            900: '#2F3C4C',
            neon: {
              50: '#def4ff',
              100: '#abe3ff',
              400: '#00b2ff'
            }
          },
        },
      },
      light: {
        palette: {
          primary: {
            50: '#C0CCD9',
            100: '#A5B8CF',
            200: '#6A96CA',
            300: '#4886D0',
            400: '#2178DD',
            500: '#096BDE',
            600: '#1B62B5',
            700: '#265995',
            800: '#2F4968',
            900: '#2F3C4C',
            neon: {

            }
          },
        },
      },
    }
  });
  

  return (
    <CssVarsProvider theme={appTheme} defaultMode='dark'>
      <Sheet sx={{ overflow: 'hidden', height: '100vh' }}>
        <Stack direction="row" spacing={1} sx={{overflowY: 'hidden', maxHeight: '100%'}}>
          <Sheet>
            <twisty-player hint-facelets='floating' background='none' control-panel='none' alg={imageScramble} puzzle="2x2x2"></twisty-player>
          </Sheet>
          <Stack paddingY={1} spacing={1} overflow='hidden' direction="column">
            <Card invertedColors={true}>
              <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={1}>
                  <Input placeholder="Scramble…" onChange={ e => setScramble(e.target.value) } />
                  <Button onClick={submitScramble} variant='solid' endDecorator={"->"} color="primary"/>
                </Stack>
                <MethodPicker selected={selected} click={click}></MethodPicker>
              </Stack>
            </Card>
            <Sheet  sx={{overflowY: 'scroll'}}>
              <Stack spacing={1}>
                { solutions.filter(solution => selected[solution.method]).slice(0, 20).map((solution, index) =>  
                  <SolutionCard key={index} color='green' {...solution} />
                  ) }
              </Stack>
            </Sheet>
            
          </Stack>
        </Stack>
      </Sheet>
      

    </CssVarsProvider>
  );
}

export default App;
