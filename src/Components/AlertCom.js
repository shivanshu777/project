import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

function AlertCom({title,body,timer,onOpen,onClose}) {
  console.log("render");
  return (
    <Dialog
    open={onOpen}
    onClose={onClose}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {body}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertCom