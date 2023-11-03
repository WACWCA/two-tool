import { Avatar, Card, CardOverflow, Chip, Link, Sheet, Stack, Typography } from "@mui/joy";
import { METHODS } from "../util/constants";
import { useTheme } from "@mui/joy";

const SolutionCard = ({color, subset, inspection, face, alg, method, depth, algNumber, methodGroup}) => {
    // const useCardHeaderStyles = {
    //     border: '2px solid',
    //     borderColor: '#E7EDF3',
    //     transition: '0.4s',
    //   };
    const theme = useTheme();
    // console.log(theme);
    
    const bgColor = theme.vars.palette[color][500];
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
                    >{method} &bull; {subset}</Chip>
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
                                // inspection {depth} {algNumber} {methodGroup}
                            </Typography>
                        </Stack>
                        <Stack 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Sheet className="circle" sx={{borderColor: bgColor + ' !important', outline: color === 'white' ? '1px solid black' : 'none', backgroundColor: color === 'white' ? 'black !important' : 'none'}}></Sheet>
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
                                <Sheet className="circle" sx={{backgroundColor: bgColor + ' !important', borderColor: bgColor + ' !important', outline: color === 'white' ? '1px solid black' : 'none'}}></Sheet>
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
};

export default SolutionCard;