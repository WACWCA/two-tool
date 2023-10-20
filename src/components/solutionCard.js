import { Avatar, Card, CardOverflow, Chip, Link, Sheet, Stack, Typography } from "@mui/joy";
import { METHODS } from "../util/constants";
import { useTheme } from "@mui/joy";

const SolutionCard = ({color, subset, inspection, face, alg, method}) => {
    // const useCardHeaderStyles = {
    //     border: '2px solid',
    //     borderColor: '#E7EDF3',
    //     transition: '0.4s',
    //   };
    const theme = useTheme();
    // console.log(theme);

    return (
        <Card sx={{
            maxWidth: '320px'
        }}>
            <CardOverflow>
                <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={0}
                paddingBottom={1}
                >
                    <Link
                        overlay
                        underline="none"
                        sx={{ marginTop: '0.25rem !important' }}
                    >
                        <Chip
                        disabled={false}
                        variant="outlined"
                    >{method} - {subset}</Chip>
                    </Link>
                    <Stack 
                    direction="column"
                    spacing={0}
                    sx={{ width: '100%'}}
                    >
                        <Stack 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        >   
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Sheet className="circle" sx={{borderColor: '#BDBDBD !important'}}></Sheet>
                                <Typography textTransform='lowercase' level="body-sm">
                                    {inspection}
                                </Typography>
                            </Stack>
                            <Typography level="body-sm">
                                // inspection
                            </Typography>
                        </Stack>
                        <Stack 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Sheet className="circle" sx={{borderColor: color + ' !important', outline: color === 'white' ? '1px solid black' : 'none', backgroundColor: color === 'white' ? 'black !important' : 'none'}}></Sheet>
                                <Typography level="body-sm">
                                    {face}
                                </Typography>
                            </Stack>
                            <Typography level="body-sm">
                                // { method === METHODS.CLL ? 'layer' : 'face' }
                            </Typography>
                        </Stack>
                        <Stack 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Sheet className="circle" sx={{backgroundColor: color + ' !important', borderColor: color + ' !important', outline: color === 'white' ? '1px solid black' : 'none'}}></Sheet>
                                <Typography level="body-sm">
                                    {alg}
                                </Typography>
                            </Stack>
                            <Typography level="body-sm">
                                // {method}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardOverflow>
        </Card>
    );
    // return (
        // <Paper className="card" sx={{...useCardHeaderStyles, maxWidth: '400px', '--color': theme.palette[color].main, '&:hover': {borderColor:  '#5B9FED !important'}}}>
        //     <CardActionArea className="solutionCard" sx={{ maxWidth: '400px' }}>
        //         <Stack>
        //             <Stack direction='horizontal' justifyContent={'center'} sx={{ padding: '3px 16px 0px 16px'}}>
        //                 <Typography className="">
        //                 <Chip variant="outlined" size='small' label='CLL - Sune' sx={{marginTop: '3px'}} />
        //                 </Typography>
        //                 {/* <Typography className="" >
        //                 <span className="subset">SUNE</span>
        //                 </Typography> */}
        //             </Stack>
        //             {/* <Divider variant="middle" /> */}

        //             {/* <Typography sx={{ opacity: '0.5' }} >
        //                 14 moves
        //             </Typography> */}
        //         </Stack>
        //     </CardActionArea>            
        // </Paper>
    // );
};

export default SolutionCard;