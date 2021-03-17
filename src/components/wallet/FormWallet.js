import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { walletAddNew, walletStartAddNew } from "../../actions/wallet";
import moment from "moment";
import "moment/locale/es";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    marginTop: 10,
    marginRight: 2,
  },
  typography: {
    fontSize: 20,
    marginBottom: 20,
  },
  textfield: {
    marginBottom: 10,
  },
});

moment.locale("es");

const now = moment();

export const FormWallet = () => {
  const { root, typography, textfield } = useStyles();

  const dispatch = useDispatch();

  //const { activeWallet } = useSelector((state) => state.wallet);

  const [selectedDate, setSelectedDate] = useState(now.toDate());

  const [formValues, handleValuesInputChange, reset] = useForm({
    kind: 1,
    name: "",
    description: "",
    money: 0,
    method: 1,
    date: now.toDate(),
  });

  const { kind, name, description, money, method } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    //Create wallet
      dispatch(
        walletStartAddNew({
          id: name,
          kind,
          name,
          description,
          money: parseInt(money),
          method,
          date: selectedDate,
        })
      );
    
    reset();
  };

  const handleDateChange = (e) => {
    setSelectedDate(e);
  };

  return (
    <Card className={root} variant="outlined">
      <CardContent>
        <Typography className={typography}>Registrar en mi Cuenta</Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <FormControl
              required
              variant="outlined"
              className={textfield}
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Tipo
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="kind"
                value={kind}
                onChange={handleValuesInputChange}
                label="Tipo"
              >
                <MenuItem value={1}>Entrada</MenuItem>
                <MenuItem value={2}>Salida</MenuItem>
              </Select>
            </FormControl>
            <TextField
              className={textfield}
              label="Nombre"
              variant="outlined"
              name="name"
              value={name}
              onChange={handleValuesInputChange}
              required
              fullWidth
            />
            <TextField
              className={textfield}
              label="Description"
              variant="outlined"
              name="description"
              value={description}
              onChange={handleValuesInputChange}
              required
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              className={textfield}
              label="Money"
              variant="outlined"
              type="number"
              name="money"
              value={money}
              onChange={handleValuesInputChange}
              required
              fullWidth
            />
            <FormControl
              required
              variant="outlined"
              className={textfield}
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Metodo de Pago
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="method"
                value={method}
                onChange={handleValuesInputChange}
                label="Tipo"
              >
                <MenuItem value={1}>Efectivo</MenuItem>
                <MenuItem value={2}>Tarjeta de Credito</MenuItem>
                <MenuItem value={3}>Tarjeta de Debito</MenuItem>
                <MenuItem value={4}>Cheque</MenuItem>
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                autoOk
                orientation="landscape"
                openTo="date"
                className={textfield}
                id="date-picker-dialog"
                label="Fecha"
                format="DD/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                required
                fullWidth
                maxDate={now}
              />
            </MuiPickersUtilsProvider>
            <Button
              className={textfield}
              type="submit"
              variant="contained"
              color="primary"
            >
              Registrar
            </Button>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
