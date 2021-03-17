import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    marginTop: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  typography: {
    fontSize: 40,
  },
});

export const StatusWallet = () => {
  const { root, typography } = useStyles();

  const { wallets } = useSelector((state) => state.wallet);
  const { uid } = useSelector((state) => state.auth);

  let balance = 0;

  wallets.forEach((wallet) => {
    if (wallet.user._id === uid) {
      //tipo salida de dinero
      if (wallet.kind === 2) {
        balance -= wallet.money;
      } else {
        balance += wallet.money;
      }
    }
  });

  return (
    <Card className={root} variant="outlined">
      <CardContent>
        <Typography className={typography}>Saldo Actual: ${balance}</Typography>
      </CardContent>
    </Card>
  );
};
