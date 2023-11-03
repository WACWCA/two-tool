import { Button, Checkbox, useTheme } from "@mui/joy";

const FaceColorButton = ({color, checkedList, onClick}) => {
    const theme = useTheme();

    return (
        <Checkbox color={color} label="" checked={checkedList[color]} onChange={()=>{onClick(!checkedList[color])}} sx={{
            "& .MuiCheckbox-checkbox": {
                // border: (color === "white" || color === "white") ? '2px solid black !important' : '',
                borderWidth: "2px",
                "&:not(.Mui-checked)": {
                    backgroundColor: theme.vars.palette[color][100],
                    "&:hover": {
                        backgroundColor: theme.vars.palette[color][300],
                    }
                }
            },
        }} />
    );
    
}

export default FaceColorButton;