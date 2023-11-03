import { useEffect, useState } from 'react';
import './App.css';
import SolutionCard from './components/solutionCard';
import { Alert, Box, Button, Card, CssVarsProvider, Grid, Input, Link, Sheet, Stack, Typography} from '@mui/joy';
import { extendTheme, useTheme } from '@mui/joy/styles';
import { getSolutions } from './util/solver';
import { TwistyPlayer } from "https://cdn.cubing.net/js/cubing/twisty";
import MethodPicker from './components/methodPicker';
import FaceColorButton from './components/FaceColorButton';
import ViewListIcon from '@mui/icons-material/ViewList';
import GitHubIcon from '@mui/icons-material/GitHub';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import GridViewIcon from '@mui/icons-material/GridView';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

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
    'LS1': true,
    'LS2': true,
    'LS3': true,
    'LS4': true,
    'LS5': true,
    'LS6': true,
    'LS7': true,
    'LS8': true,
    'LS9': true
  });
  
  const [checkedColorList, setCheckedColorList] = useState({white: true, blue: true, green: true, orange: true, red: true, yellow: true});
  const [submitted, setSubmitted] = useState(false);
  const colorClick = (b, color) => {
    setCheckedColorList({
      ...checkedColorList,
      [color]: b
    });
  };

    const defaultDepths = {
      "EG": 5,
      "TCLL": 4,
      "LS": 3,
      "ALG": 1
  };

  const [depths, setDepths] = useState(defaultDepths);
  const setDepth = (group, depth) => {
    setDepths(
        {
            ...depths,
            [group]: depth
        }
    );
  }

  const click = (method) => {
    selected[method] = !selected[method];
    setSelected({ ...selected });
  };

  const submitScramble = () => {
    if (scramble.length > 0) {
      setSolutions([ ...getSolutions({ scramble: scramble, 
        egDepth: depths['EG'], 
        tcllDepth: depths['TCLL'], 
        lsDepth: depths['LS'], 
      }) ]);
      setImageScramble(scramble);
    }
    setSubmitted(true);
  };

  const getVars = (color) => {
    return {
      solidColor: `#fff`,
      solidBg: `var(--joy-palette-${color}-500)`,
      solidActiveBg: `var(--joy-palette-${color}-500)`,
      outlinedBorder: `var(--joy-palette-${color}-600)`,
      outlinedColor: `var(--joy-palette-${color}-700)`,
      outlinedActiveBg: `var(--joy-palette-${color}-100)`,
      softColor: `var(--joy-palette-${color}-800)`,
      softBg: `var(--joy-palette-${color}-200)`,
      softActiveBg: `var(--joy-palette-${color}-300)`,
      plainColor: `white`,
      plainActiveBg: `var(--joy-palette-${color}-100)`, 
    }
  }

  const appTheme = extendTheme({
    typography: {
      h0: {
        // `--joy` is the default CSS variable prefix.
        // If you have a custom prefix, you have to use it instead.
        // For more details about the custom prefix, go to https://mui.com/joy-ui/customization/using-css-variables/#custom-prefix
        // background:
        //   'linear-gradient(90deg, var(--joy-palette-blue-700), var(--joy-palette-blue-300))',
        background: 'var(--joy-palette-blue-700)',
        // `Webkit*` properties must come later.
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      },
    },
    colorSchemes: {
      light: {
        palette: {
          // primary: {
          //   50: "#e1f5fe",
          //   100: "#b3e5fc",
          //   200: "#81d4fa",
          //   300: "#4fc3f7",
          //   400: "#29b6f6",
          //   500: "#03a9f4",
          //   600: "#039be5",
          //   700: "#0288d1",
          //   800: "#0277bd",
          //   900: "#01579b"
          // },
          // danger: {
          //   50: "#fef2f2",
          //   100: "#fee2e2",
          //   200: "#fecaca",
          //   300: "#fca5a5",
          //   400: "#f87171",
          //   500: "#ef4444",
          //   600: "#dc2626",
          //   700: "#b91c1c",
          //   800: "#991b1b",
          //   900: "#7f1d1d"
          // },
          // success: {
          //   50: "#f0fdf4",
          //   100: "#dcfce7",
          //   200: "#bbf7d0",
          //   300: "#86efac",
          //   400: "#4ade80",
          //   500: "#22c55e",
          //   600: "#16a34a",
          //   700: "#15803d",
          //   800: "#166534",
          //   900: "#14532d"
          // },
          // warning: {
          //   50: "#fefce8",
          //   100: "#fef9c3",
          //   200: "#fef08a",
          //   300: "#fde047",
          //   400: "#facc15",
          //   500: "#eab308",
          //   600: "#ca8a04",
          //   700: "#a16207",
          //   800: "#854d0e",
          //   900: "#713f12",
          // },
          blue: {
            50: "#e2f2ff",
            100: "#baddff",
            200: "#8cc8ff",
            300: "#5ab2ff",
            400: "#30a1ff",
            500: "#0090ff",
            600: "#1482ff",
            700: "#1e6fea",
            800: "#225dd8",
            900: "#263bb8",
            ...(getVars("blue"))
          },
          green: {
            50: "#effee7",
            100: "#d7fbc4",
            200: "#bbf89d",
            300: "#9af46f",
            400: "#7cf046",
            500: "#5bec00",
            600: "#47da00",
            700: "#1dc400",
            800: "#00b000",
            900: "#008c00",
            ...(getVars("green"))
          },
          red: {
            50: "#ffebee",
            100: "#ffcdd2",
            200: "#ef999b",
            300: "#e57274",
            400: "#ef5152",
            500: "#f43f38",
            600: "#e53637",
            700: "#d32b31",
            800: "#c6242a",
            900: "#b7171e",
            ...(getVars("red"))
          },
          orange: {
            50: "#fff9e5",
            100: "#ffedbe",
            200: "#ffe295",
            300: "#ffd96f",
            400: "#ffce58",
            500: "#ffc751",
            600: "#ffba4c",
            700: "#fda847",
            800: "#fa9945",
            900: "#f57f40",
            ...(getVars("orange")),
            solidBg: 'var(--joy-palette-orange-800)'
          },
          yellow: {
            "50": "#feffe7",
            "100": "#fbfdc0",
            "200": "#f7fa94",
            "300": "#f2f764",
            "400": "#edf337",
            "500": "#fbff0a",
            "600": "#fceb00",
            "700": "#ffd100",
            "800": "#ffb800",
            "900": "#ff8b00",
            ...(getVars("yellow")),
            solidColor: '#000',
          },
          white: {
            50: "#c2c2c2",
            100: "#dedede",
            200: "#f0f0f0",
            300: "#f5f5f5",
            400: "#fafafa",
            500: "#ffffff",
            600: "#ffffff",
            700: "#ffffff",
            800: "#ffffff",
            900: "#ffffff",
            ...(getVars("white")),
            solidColor: "#000"
          }
        }
      },
      "dark": {
        palette: {
          blue: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#76a8fa",
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d"
          },
          green: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#ef4444",
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d"
          },
          red: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#ef4444",
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d"
          },
          orange: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#ef4444",
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d"
          },
          yellow: {
            solidBg: "#ef4444",
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#ef4444",
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d"
          },
          white: {
            50: "#fef2f2",
            100: "#fee2e2",
            200: "#fecaca",
            300: "#fca5a5",
            400: "#f87171",
            500: "#ef4444",
            600: "#dc2626",
            700: "#b91c1c",
            800: "#991b1b",
            900: "#7f1d1d"
          }
        }
      }
    }
  });
  
  return (
    <CssVarsProvider theme={appTheme} defaultMode='light'>
      <Sheet sx={{ overflow: 'hidden', height: '100vh' }}>
        <Stack direction="column" sx={{ overflow: 'hidden', height: '100vh' }}>
            <Sheet variant="outlined" sx={{marginBottom: '10px', boxShadow: 'sm', borderTop:'0', borderLeft: '0', borderRight: '0', backgroundColor: '', height: '50px'}}>
            <Grid container spacing={3} height="100%" margin={0} sx={{ flexGrow: 1 }}>
              <Grid xs alignItems="center" display="flex" flexDirection="row" padding={0} paddingLeft={1}>
                  <ViewInArIcon color="primary"/>
                  {/* <Typography>Will Callan</Typography> */}
              </Grid>
              <Grid xs={6} padding={0} margin={0} maxHeight="100%">
                <Stack height="100%" direction="row" justifyContent="center">
                  <Typography alignSelf="center" level="h2" sx={(theme) => theme.typography.h0}>Two-Tool</Typography>
                </Stack>
              </Grid>
              <Grid xs maxHeight="100%">
                <Stack height="100%" direction="row" spacing={1} justifyContent="end" alignItems="center">
                    <Link
                      href="https://docs.google.com/spreadsheets/d/1OFXakCV85Mp2zsQBXMxiMX9a506JeAcLnUXZr8FgXAY/edit?usp=sharing"
                      alignSelf="center"
                      underline="none"
                      variant="soft"
                      color="primary"
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ '--Link-gap': '0.5rem', pl: 1, pr: 1, py: 0.5, borderRadius: 'md' }}
                    >
                      Algorithms
                    </Link>
                    <Link
                      href="#common-examples"
                      target="_blank" 
                      rel="noopener noreferrer"
                      alignSelf="center"
                      underline="none"
                      variant="outlined"
                      color="neutral"
                      component="button"
                      sx={{ py:0.5, px:1, borderRadius: 'md', height: '32px'}}
                    ><GitHubIcon /></Link>
                    <Link
                      href="#common-examples"
                      target="_blank" 
                      rel="noopener noreferrer"
                      alignSelf="center"
                      underline="none"
                      variant="outlined"
                      color="neutral"
                      component="button"
                      sx={{ py:0.5, px:1, borderRadius: 'md', height: '32px'}}
                    ><QuestionMarkIcon /></Link>
                    
                  </Stack>      
                  
              </Grid>
            </Grid>
            </Sheet>  
          <Stack direction="row" justifyContent="center" spacing={1} sx={{overflowY: 'hidden', maxHeight: '100%'}}>
            <Stack direction="column">
              <Box><twisty-player hint-facelets='floating' background='none' control-panel='none' alg={imageScramble} puzzle="2x2x2"></twisty-player></Box>
              <Stack variant='outlined' justifyContent="center" sx={{py: 0, display: 'flex', borderRadius: '0'}} >
                <Link level='body-xs' marginTop={1} color="neutral" variant='outlined' textColor="primary" href="https://js.cubing.net/cubing/" target="_blank" 
                      rel="noopener noreferrer" alignSelf="center"                       sx={{ '--Link-gap': '0.5rem', pl: 1, pr: 1, py: 0.5, borderRadius: 'md' }}
                      >
                     twisty-player by Lucas Garron</Link></Stack>
            </Stack>
            <Stack paddingRight={2} paddingY={4} spacing={1} overflow='hidden' direction="column">
              <Card 
                
                sx={{
                paddingBottom: "0px",
                backgroundColor: "background.level1",
                boxShadow: 'md'
                }}>
                <Stack direction="column" spacing={1}>
                  <Stack direction="row" spacing={1}>
                    <Input placeholder="Scramble…" onChange={ e => setScramble(e.target.value) } />
                    <Button onClick={submitScramble} variant='solid' endDecorator={"->"} color="primary" sx={{
                      // border: `2px solid ${useTheme().vars.palette['success'][300]}`,
                      // backgroundColor: useTheme().vars.palette['success'][100],
                    }}/>
                  </Stack>
                  <MethodPicker selected={selected} click={click} defaultDepths={defaultDepths} depths={depths} setDepth={setDepth}></MethodPicker>
                  <Stack direction="row" spacing={1} justifyContent="center" paddingTop={2} paddingBottom={1}>
                    { 
                      ['white', 'green', 'blue', 'red', 'orange', 'yellow'].map(color => 
                        <FaceColorButton key={color} color={color} checkedList={checkedColorList} onClick={(b) => colorClick(b, color)}/>
                      )
                    }
                  
                  </Stack>
                </Stack>
              </Card>
              <Sheet sx={{overflowY: 'scroll', marginTop: '0px !Important'}}>
                <Stack direction="column" spacing={1} paddingTop={1}>
                  { solutions.filter(
                    solution => selected[solution.method] && checkedColorList[solution.color] && depths[solution.methodGroup] >= solution.depth && depths['ALG'] > solution.algNumber 
                    ).slice(0, 50).map((solution, index) =>  
                    <SolutionCard key={index} color='green' {...solution} />
                    ) }
                  { solutions.filter(
                    solution => selected[solution.method] && checkedColorList[solution.color] && depths[solution.methodGroup] >= solution.depth && depths['ALG'] > solution.algNumber 
                    ).length === 0 && submitted && ( 
                      <Alert
                      sx={{ alignItems: 'flex-start' }}
                      variant="soft"
                      color='warning'
                      >
                      <div>
                        <div>No solutions found</div>
                        <Typography level="body-sm" color='warning'>
                          Try expanding your search parameters
                        </Typography>
                      </div>
                    </Alert>
                    ) }
                  {
                    !submitted && (
                      <Alert
                      sx={{ alignItems: 'flex-start' }}
                      variant="soft"
                      color='success'
                      >
                      <div>
                        <div>Enter a scramble!</div>
                        <Typography level="body-sm" color='success'>
                          Pick methods and more with the Settings button
                        </Typography>
                      </div>
                    </Alert>
                    )
                  }
                </Stack>
              </Sheet>
              
            </Stack>
          </Stack>
        </Stack>
        
      </Sheet>
      

    </CssVarsProvider>
  );
}

export default App;
