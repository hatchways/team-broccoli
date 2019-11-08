import React from 'react';
import { Button,
         TextField,
         Dialog,
         DialogActions,
         DialogContent,
         DialogContentText,
         DialogTitle,
       } from '@material-ui/core';
import Api from "../util/Api";

export default function DonateDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  
  const openDialog = () => {
    setOpen(true);
  };

  const cancel = () => {
    setOpen(false);
  };

  const update_amount = (event) => {
    setAmount(event.target.value);
  }

  const donate = (event) => {
    setOpen(false);
    let api = new Api('make_session')
    const request = api.post({
      "line_item": {
        "name": "Donation",
        "description": props.stripe_description,
        "amount": amount,
        "currency": "usd",
        "quantity": 1,
      },
      "fundraiser_id": props.fundraiser_id,
    });

    request.then(function (response) {
      let session_id = response.contents.session_id;
      /* global Stripe */
      // as the pk_ prefix notes, this is our public key
      var stripe = Stripe('pk_test_oV8BjaCCF4yuH4CfwBOAKcAH00WInBdsHn');
      stripe.redirectToCheckout({
        sessionId: session_id,
      }).then(function (result) {
        // TODO -- better error handling
        alert("Couldn't redirect to Stripe.");
      });
    });
  };

  return (
    <div>
      <button className={props.className} onClick = {openDialog}>
        DONATE NOW
      </button>
      <Dialog open={open} onClose={cancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Donate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the amount you would like to contribute.
          </DialogContentText>
          <TextField
            autoFocus
            onChange={update_amount}
            margin="dense"
            id="donate_amt"
            label="Pledge Amount (USD)"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>
            Cancel
          </Button>
          <Button onClick={donate}>
            Donate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
