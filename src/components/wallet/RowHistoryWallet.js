import { Grid, IconButton } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { walletDelete, walletSetActive, walletStartDelete } from "../../actions/wallet";
import { uiOpenModal } from "../../actions/ui";
import Swal from "sweetalert2";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const RowHistoryWallet = ({ wallet }) => {
  const dispatch = useDispatch();

  const {activeWallet} = useSelector( state => state.wallet );

  const { name, kind, money } = wallet;

  const handleOnClick = () => {
    dispatch(walletSetActive(wallet));
  };

  const handleOnDoubleClick = () => {
    dispatch(uiOpenModal());
  };

  const handleDelete = () => {
    if(activeWallet){
      dispatch(walletStartDelete(wallet))
    }else{
      Swal.fire('Error','Selecciona un wallet para eliminar','info')
    }
  }

  return (
    <>
      <Grid item xs={11}>
        <Alert
          onClick={handleOnClick}
          onDoubleClick={handleOnDoubleClick}
          severity={kind === 1 ? "success" : "error"}
        >
          {`${name} - $${money}`}
        </Alert>
      </Grid>
      <Grid item xs={1}>
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Grid>
    </>
  );
};
