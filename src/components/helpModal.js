import { Link, Modal, ModalClose, Sheet, Typography } from "@mui/joy";

const HelpModal = ({ open, setOpen }) => {
    return (
    <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h3"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            sx={(theme) => theme.typography.h0}
          >
            Two-Tools.com
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Two-tools helps find practical solutions to any 2x2 scramble.
            Enter any 2x2 scramble with WCA notation and submit to see possible solutions.
            Use the settings button to change things such as which methods you want to see.
            Solutions are sorted by <Typography fontWeight="bold">expected speed</Typography>.
          </Typography>
          <Typography marginTop={2} textAlign="right">Developed by Will Callan (<Link target="_blank" rel="noopener noreferrer" href="https://www.worldcubeassociation.org/persons/2012CALL01">2012CALL01</Link>)</Typography>
        </Sheet>
    </Modal>);
}

export default HelpModal;