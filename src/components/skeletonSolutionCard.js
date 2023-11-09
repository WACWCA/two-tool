import { Avatar, Box, Card, CardOverflow, Chip, Link, Sheet, Skeleton, Stack, Typography } from "@mui/joy";
import { METHODS } from "../util/constants";
import { useTheme } from "@mui/joy";

const SkeletonSolutionCard = () => {

    const theme = useTheme();
    
    // const bgColor = theme.vars.palette[color][500];
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
                    <Stack 
                    direction="column"
                    spacing={0}
                    sx={{ width: '100%'}}
                    paddingTop={2}
                    >
                        <Stack 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        >   
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography textTransform='lowercase' level="body-sm">
                                    <Skeleton>
                                        x y
                                    </Skeleton>
                                </Typography>
                            </Stack>
                            <Typography level="body-sm">
                                <Skeleton>
                                    // inspection
                                </Skeleton>
                            </Typography>
                        </Stack>
                        <Stack 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography level="body-sm">
                                    <Skeleton>
                                        R U F U R U
                                    </Skeleton> 
                                </Typography>
                            </Stack>
                            <Typography level="body-sm">
                                <Skeleton>
                                    // Layer
                                </Skeleton>                             
                            </Typography>
                        </Stack>
                        <Stack 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography level="body-sm">
                                    <Skeleton>
                                        R U R' U R U' R' U R U' R' F
                                    </Skeleton> 
                                </Typography>
                            </Stack>
                            <Typography level="body-sm">
                                <Skeleton>
                                    // alg
                                </Skeleton>                             
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </CardOverflow>
        </Card>
    );
};

export default SkeletonSolutionCard;