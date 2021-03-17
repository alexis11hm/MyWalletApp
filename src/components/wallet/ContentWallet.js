import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import { StatusWallet } from "./StatusWallet";
import { FormWallet } from "./FormWallet";
import { HistoryWallet } from "./HistoryWallet";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export const ContentWallet = () => {

  const { root} = useStyles();

  return (
    <div className={root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
         <StatusWallet />
        </Grid>
        <Grid item xs={6}>
          <FormWallet />
        </Grid>
        <Grid item xs={6}>
          <HistoryWallet />
        </Grid>
    </Grid>
    </div>
  );
};
