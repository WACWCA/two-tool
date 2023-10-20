import { chipClasses, Avatar, Button, Card, CardOverflow, Checkbox, Chip, Dropdown, IconButton, Link, ListItemDecorator, Menu, MenuButton, MenuItem, Sheet, Stack, Typography, checkboxClasses, useColorScheme } from "@mui/joy";
import { METHODS } from "../util/constants";
import { useTheme } from "@mui/joy";
import { TwistyPlayer } from "https://cdn.cubing.net/js/cubing/twisty";
import { useState } from "react";


const MethodPicker = ({selected, click}) => {
    const { mode, systemMode } = useColorScheme();
    const theme = useTheme();

    const backgroundColors = {
        "CLL": 'rgb(183, 230, 165)',
        "EG-1": 'rgb(183, 230, 165)',
        "EG-2": 'rgb(183, 230, 165)',
        "LEG-1": 'rgb(183, 230, 165)',
        "TCLL+": 'rgb(183, 230, 165)',
        "TCLL-": 'rgb(183, 230, 165)',
        "LS-1": 'rgb(238, 205, 205)',
        "LS-2": 'rgb(248, 230, 208)',
        "LS-3": 'rgb(254, 252, 206)',
        "LS-4": 'rgb(220, 233, 213)',
        "LS-5": 'rgb(188, 214, 172)',
        "LS-6": 'rgb(210, 225, 241)',
        "LS-7": 'rgb(166, 196, 228)',
        "LS-8": 'rgb(216, 210, 230)',
        "LS-9": 'rgb(230, 210, 219)'
    };

    const borderColors = {
        "CLL": 'rgb(82, 115, 70)',
        "EG-1": 'rgb(82, 115, 70)',
        "EG-2": 'rgb(82, 115, 70)',
        "LEG-1": 'rgb(82, 115, 70)',
        "TCLL+": 'rgb(82, 115, 70)',
        "TCLL-": 'rgb(82, 115, 70)',
        "LS-1": 'rgb(234, 51, 35)',
        "LS-2": 'rgb(241, 158, 56)',
        "LS-3": 'rgb(255, 255, 84)',
        "LS-4": 'rgb(123, 206, 73)',
        "LS-5": 'rgb(72, 116, 44)',
        "LS-6": 'rgb(88, 132, 225)',
        "LS-7": 'rgb(56, 56, 245)',
        "LS-8": 'rgb(140, 26, 245)',
        "LS-9": 'rgb(234, 51, 247)'
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
        <MenuButton>
            \/
        </MenuButton>
        <Menu placement="bottom-start">
            <Sheet>
                <Stack direction='column' padding={0} spacing={1}>
                    <Stack direction='row' paddingLeft={1} paddingRight={1} spacing={1}>
                        <Chip className={selected['CLL'] ? 'selected' : ''} sx={chipStyles('', 'CLL')} onClick={()=>{click('CLL')}}>CLL</Chip>
                        <Chip className={selected['EG-1'] ? 'selected' : ''} sx={chipStyles('', 'EG-1')} onClick={()=>{click('EG-1')}}>EG-1</Chip>
                        <Chip className={selected['EG-2'] ? 'selected' : ''} sx={chipStyles('', 'EG-2')} onClick={()=>{click('EG-2')}}>EG-2</Chip>
                    </Stack>
                    <Stack direction='row' paddingLeft={1} paddingRight={1} spacing={1}>
                        <Chip className={selected['LEG-1'] ? 'selected' : ''} sx={chipStyles('', 'LEG-1')} onClick={()=>{click('LEG-1')}}>LEG-1</Chip>
                    </Stack>
                    <Stack direction='row' paddingLeft={1} paddingRight={1} spacing={1}>
                        <Chip className={selected['TCLL+'] ? 'selected' : ''} sx={chipStyles('', 'TCLL-')} onClick={()=>{click('TCLL+')}}>TCLL+</Chip>
                        <Chip className={selected['TCLL-'] ? 'selected' : ''} sx={chipStyles('', 'TCLL-')} onClick={()=>{click('TCLL-')}}>TCLL-</Chip>
                    </Stack>
                    <Stack direction='row' paddingLeft={1} paddingRight={1} spacing={1}>
                        <Chip className={selected['LS-1'] ? 'selected' : ''} sx={chipStyles('', 'LS-1')} onClick={()=>{click('LS-1')}}>LS-1</Chip>
                        <Chip className={selected['LS-2'] ? 'selected' : ''} sx={chipStyles('', 'LS-2')} onClick={()=>{click('LS-2')}}>LS-2</Chip>
                        <Chip className={selected['LS-3'] ? 'selected' : ''} sx={chipStyles('', 'LS-3')} onClick={()=>{click('LS-3')}}>LS-3</Chip>
                        <Chip className={selected['LS-4'] ? 'selected' : ''} sx={chipStyles('', 'LS-4')} onClick={()=>{click('LS-4')}}>LS-4</Chip>
                        <Chip className={selected['LS-5'] ? 'selected' : ''} sx={chipStyles('', 'LS-5')} onClick={()=>{click('LS-5')}}>LS-5</Chip>
                        <Chip className={selected['LS-6'] ? 'selected' : ''} sx={chipStyles('', 'LS-6')} onClick={()=>{click('LS-6')}}>LS-6</Chip>
                        <Chip className={selected['LS-7'] ? 'selected' : ''} sx={chipStyles('', 'LS-7')} onClick={()=>{click('LS-7')}}>LS-7</Chip>
                        <Chip className={selected['LS-8'] ? 'selected' : ''} sx={chipStyles('', 'LS-8')} onClick={()=>{click('LS-8')}}>LS-8</Chip>
                        <Chip className={selected['LS-9'] ? 'selected' : ''} sx={chipStyles('', 'LS-9')} onClick={()=>{click('LS-9')}}>LS-9</Chip>
                    </Stack>
                </Stack>
            </Sheet>
        </Menu>
    </Dropdown>
    );
};


export default MethodPicker;