import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { Grid } from "@material-ui/core";

import { RowHistoryWallet } from "./RowHistoryWallet";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    marginTop: 10,
    marginLeft: 2,
  },
  typography: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export const HistoryWallet = () => {
  const { root, typography } = useStyles();

  const { wallets } = useSelector((state) => state.wallet);
  const { uid } = useSelector((state) => state.auth);

  return (
    <Card className={root} variant="outlined">
      <CardContent>
        <Typography className={typography}>Historial de mi Cuenta</Typography>

        <Grid container spacing={2}>
          {wallets.map((wallet) => {
            if (wallet.user._id === uid) {
              return <RowHistoryWallet key={wallet.name} wallet={wallet} />;
            }
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};
