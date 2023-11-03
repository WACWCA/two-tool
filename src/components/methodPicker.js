import { chipClasses, Avatar, Button, Card, CardOverflow, Checkbox, Chip, Dropdown, IconButton, Link, ListItemDecorator, Menu, MenuButton, MenuItem, Sheet, Stack, Typography, checkboxClasses, useColorScheme, Slider, Divider } from "@mui/joy";
import { METHODS } from "../util/constants";
import { useTheme } from "@mui/joy";
import { TwistyPlayer } from "https://cdn.cubing.net/js/cubing/twisty";
import { useState } from "react";


const MethodPicker = ({selected, click, depths, defaultDepths, setDepth}) => {
    const { mode, systemMode } = useColorScheme();
    const theme = useTheme();

    const backgroundColors = {
        "CLL": theme.colorSchemes[mode].palette.neutral[300],
        "EG-1": theme.colorSchemes[mode].palette.neutral[300],
        "EG-2": theme.colorSchemes[mode].palette.neutral[300],
        "LEG-1": theme.colorSchemes[mode].palette.neutral[300],
        "TCLL+": theme.colorSchemes[mode].palette.neutral[300],
        "TCLL-": theme.colorSchemes[mode].palette.neutral[300],
        "LS1": 'rgb(238, 205, 205)',
        "LS2": 'rgb(248, 230, 208)',
        "LS3": 'rgb(254, 252, 206)',
        "LS4": 'rgb(220, 233, 213)',
        "LS5": 'rgb(188, 214, 172)',
        "LS6": 'rgb(210, 225, 241)',
        "LS7": 'rgb(166, 196, 228)',
        "LS8": 'rgb(216, 210, 230)',
        "LS9": 'rgb(230, 210, 219)'
    };

    const borderColors = {
        "CLL": theme.colorSchemes[mode].palette.neutral[500],
        "EG-1": theme.colorSchemes[mode].palette.neutral[500],
        "EG-2": theme.colorSchemes[mode].palette.neutral[500],
        "LEG-1": theme.colorSchemes[mode].palette.neutral[500],
        "TCLL+": theme.colorSchemes[mode].palette.neutral[500],
        "TCLL-": theme.colorSchemes[mode].palette.neutral[500],
        "LS1": 'rgb(234, 51, 35)',
        "LS2": 'rgb(241, 158, 56)',
        "LS3": 'rgb(255, 255, 84)',
        "LS4": 'rgb(123, 206, 73)',
        "LS5": 'rgb(72, 116, 44)',
        "LS6": 'rgb(88, 132, 225)',
        "LS7": 'rgb(56, 56, 245)',
        "LS8": 'rgb(140, 26, 245)',
        "LS9": 'rgb(234, 51, 247)'
    };

    const chipStyles = (color, method) => ({

        border: '1px solid transparent',
        cursor: 'pointer',
        '&:not(selected):hover': {
            border: '1px solid ' + theme.colorSchemes[mode].palette.primary[300],
            borderColor: color,
            backgroundColor: theme.colorSchemes[mode].palette.primary[800],
        },
        '&.selected': {
            border: '1px solid green',
            // borderColor: theme.colorSchemes[mode].palette.success[300],
            borderColor: borderColors[method],
            '& button': {
                backgroundColor: backgroundColors[method]
                // backgroundColor: theme.colorSchemes[mode].palette.success[100] + '!important'
            } 
        }
    });

    return (
    <Dropdown>
        <MenuButton color="primary">
            Settings
        </MenuButton>
        <Menu placement="bottom" color="primary" variant="outlined" size="lg" sx={{padding:"0"}}>
            <Sheet sx={{backgroundColor: "transparent", padding:"0"}}>
                <Stack direction='column' paddingTop={1} spacing={1}>
                    <Divider sx={{paddingLeft:'10px', paddingRight:'10px'}}>
                        EG
                    </Divider>
                    <Sheet sx={{paddingBottom: '0', marginTop: '0px !Important'}}>
                        <Stack direction="column" paddingTop={1}>
                            <Stack direction='row' justifyContent="center" paddingLeft={2} paddingRight={2} spacing={1}>
                                <Chip className={selected['CLL'] ? 'selected' : ''} sx={chipStyles('', 'CLL')} onClick={()=>{click('CLL')}}>CLL</Chip>
                                <Chip className={selected['EG-1'] ? 'selected' : ''} sx={chipStyles('', 'EG-1')} onClick={()=>{click('EG-1')}}>EG-1</Chip>
                                <Chip className={selected['EG-2'] ? 'selected' : ''} sx={chipStyles('', 'EG-2')} onClick={()=>{click('EG-2')}}>EG-2</Chip>
                                <Chip className={selected['LEG-1'] ? 'selected' : ''} sx={chipStyles('', 'LEG-1')} onClick={()=>{click('LEG-1')}}>LEG-1</Chip>
                            </Stack>
                            <Stack direction="column" alignItems="center">
                                <Typography marginTop={1} level="body-xs">Face Depth</Typography>
                                <Stack direction="row" width="100%" justifyContent="center" alignItems="center" spacing={2} paddingLeft={2}>
                                    <Slider
                                        aria-label="Always visible"
                                        value={depths["EG"]}
                                        // getAriaValueText={valueText}
                                        step={1}
                                        min={1}
                                        max={6}
                                        color="neutral"
                                        variant="solid"
                                        valueLabelDisplay="off"
                                        onChange={(e, value) => setDepth("EG", value)}
                                        sx={{ maxWidth: "150px",
                                        padding: "0",
                                        "& > .MuiSlider-valueLabelOpen": {
                                            opacity: "1.0",
                                            background: "black !Important"
                                        }
                                        }}
                                    />
                                    <Typography width="65px" level="body-sm">
                                        {depths["EG"]} {depths["EG"] > 1 ? "moves" : "move"}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Sheet>
                    <Divider sx={{paddingLeft:'10px', paddingRight:'10px'}}>
                        TCLL
                    </Divider>
                    <Sheet sx={{paddingBottom: '0', marginTop: '0px !Important'}}>
                        <Stack direction="column" paddingTop={1}>
                            <Stack direction='row' justifyContent="center" paddingLeft={2} paddingRight={2}  spacing={1}>
                                <Chip className={selected['TCLL+'] ? 'selected' : ''} sx={chipStyles('', 'TCLL-')} onClick={()=>{click('TCLL+')}}>TCLL+</Chip>
                                <Chip className={selected['TCLL-'] ? 'selected' : ''} sx={chipStyles('', 'TCLL-')} onClick={()=>{click('TCLL-')}}>TCLL-</Chip>
                            </Stack>
                            <Stack direction="column" alignItems="center">
                                <Typography marginTop={1} level="body-xs">Face Depth</Typography>
                                <Stack direction="row" width="100%" justifyContent="center" alignItems="center" spacing={2} paddingLeft={2}>
                                    <Slider
                                        aria-label="Always visible"
                                        value={depths["TCLL"]}
                                        // getAriaValueText={valueText}
                                        step={1}
                                        min={1}
                                        max={6}
                                        color="neutral"
                                        variant="solid"
                                        valueLabelDisplay="off"
                                        onChange={(e, value) => setDepth("TCLL", value)}
                                        sx={{ maxWidth: "150px",
                                        padding: "0",
                                        "& > .MuiSlider-valueLabelOpen": {
                                            opacity: "1.0",
                                            background: "black !Important"
                                        }
                                        }}
                                    />
                                    <Typography width="65px" level="body-sm">
                                        {depths["TCLL"]} {depths["TCLL"] > 1 ? "moves" : "move"}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Sheet>
                    <Divider sx={{paddingLeft:'10px', paddingRight:'10px'}}>
                        LS
                    </Divider>
                    <Sheet sx={{paddingBottom: '0', marginTop: '0px !Important'}}>
                        <Stack direction="column" paddingTop={1}>
                            <Stack direction='row' justifyContent="center" paddingLeft={2} paddingRight={2} flexWrap="wrap" rowGap={1} columnGap={1} sx={{maxWidth: "250px"}}>
                                <Chip className={selected['LS1'] ? 'selected' : ''} sx={chipStyles('', 'LS1')} onClick={()=>{click('LS1')}}>LS1</Chip>
                                <Chip className={selected['LS2'] ? 'selected' : ''} sx={chipStyles('', 'LS2')} onClick={()=>{click('LS2')}}>LS2</Chip>
                                <Chip className={selected['LS3'] ? 'selected' : ''} sx={chipStyles('', 'LS3')} onClick={()=>{click('LS3')}}>LS3</Chip>
                                <Chip className={selected['LS4'] ? 'selected' : ''} sx={chipStyles('', 'LS4')} onClick={()=>{click('LS4')}}>LS4</Chip>
                                <Chip className={selected['LS5'] ? 'selected' : ''} sx={chipStyles('', 'LS5')} onClick={()=>{click('LS5')}}>LS5</Chip>
                                <Chip className={selected['LS6'] ? 'selected' : ''} sx={chipStyles('', 'LS6')} onClick={()=>{click('LS6')}}>LS6</Chip>
                                <Chip className={selected['LS7'] ? 'selected' : ''} sx={chipStyles('', 'LS7')} onClick={()=>{click('LS7')}}>LS7</Chip>
                                <Chip className={selected['LS8'] ? 'selected' : ''} sx={chipStyles('', 'LS8')} onClick={()=>{click('LS8')}}>LS8</Chip>
                                <Chip className={selected['LS9'] ? 'selected' : ''} sx={chipStyles('', 'LS9')} onClick={()=>{click('LS9')}}>LS9</Chip>
                            </Stack>
                            <Stack direction="column" alignItems="center">
                                <Typography marginTop={1} level="body-xs">Face Depth</Typography>
                                <Stack direction="row" width="100%" justifyContent="center" alignItems="center" spacing={2} paddingLeft={2}>
                                    <Slider
                                        color="neutral"
                                        aria-label="Always visible"
                                        value={depths["LS"]}
                                        // getAriaValueText={valueText}
                                        step={1}
                                        min={1}
                                        max={6}
                                        variant="solid"
                                        valueLabelDisplay="off"
                                        onChange={(e, value) => setDepth("LS", value)}
                                        sx={{ maxWidth: "150px",
                                        padding: "0",
                                        "& > .MuiSlider-valueLabelOpen": {
                                            opacity: "1.0",
                                            background: "black !Important"
                                        }
                                        }}
                                    />
                                    <Typography width="65px" level="body-sm">
                                        {depths["LS"]} {depths["LS"] > 1 ? "moves" : "move"}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Sheet>
                    <Sheet variant="soft" color="primary" sx={{paddingBottom: '0', paddingTop: '0'}}>
                        <Stack paddingTop={1} paddingBottom={1} direction="column">
                            <Stack direction="column" alignItems="center">
                                <Typography level="body-xs"># of algs per case</Typography>
                                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} paddingLeft={2} width="100%">
                                    <Slider
                                        aria-label="Always visible"
                                        value={depths["ALG"]}
                                        // getAriaValueText={valueText}
                                        step={1}
                                        min={1}
                                        max={3}
                                        variant="solid"
                                        color="primary"
                                        valueLabelDisplay="off"
                                        onChange={(e, value) => setDepth("ALG", value)}
                                        sx={{ maxWidth: "150px",
                                        padding: "0",
                                        "& > .MuiSlider-valueLabelOpen": {
                                            opacity: "1.0",
                                            background: "black !Important"
                                        }
                                        }}
                                    />
                                    <Typography width="65px" level="body-sm">
                                        {depths["ALG"]}{depths["ALG"] > 1 ? (depths["ALG"] === 3 ? "+ algs" : " algs") : " alg"}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Sheet>
                </Stack>
            </Sheet>
        </Menu>
    </Dropdown>
    );
};


export default MethodPicker;