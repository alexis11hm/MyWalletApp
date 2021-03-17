import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
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
import { walletStartUpdate, walletUpdate } from "../../actions/wallet";
import "moment";
import "moment/locale/es";
import MomentUtils from "@date-io/moment";
import moment from "moment";

const useStyles = makeStyles({
  root: {
    minWidth: 240,
    marginTop: 10,
    marginRight: 2,
  },
  typography: {
    fontSize: 20,
    marginBottom: 20,
  },
  textfield: {
    marginBottom: 20,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const now = moment();

const initWallet = {
  kind: 1,
  name: "",
  description: "",
  money: 0,
  method: 1,
  date: now.toDate(),
};

moment.locale("es")

export const ModalWallet = () => {
  const { root, typography, textfield } = useStyles();

  const dispatch = useDispatch();

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeWallet } = useSelector((state) => state.wallet);

  const [formValues, setFormValues] = useState(initWallet);

  useEffect(() => {
    if(activeWallet){ 
      setSelectedDate(activeWallet.date)
    }
  }, [activeWallet])

  const [date, setSelectedDate] = useState(now.toDate());

  const { kind, name, description, money, method } = formValues;

  useEffect(() => {
    if (activeWallet) {
      setFormValues({
        kind: activeWallet.kind,
        name: activeWallet.name,
        description: activeWallet.description,
        money: activeWallet.money,
        method: activeWallet.method,
        date: activeWallet.date,
      });
    } else {
      setFormValues(initWallet);
    }
  }, [activeWallet, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const handleDateChange = (e) => {
    setSelectedDate(e);
    console.log(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(

      walletStartUpdate({
        ...formValues,
        name: name,
        money: parseInt(money),
        id: activeWallet.id,
        date: date
      })
    );

    handleClose();
  };

  const handleClose = () => {
    dispatch(uiCloseModal());
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Modificar Wallet"}
        </DialogTitle>
        <DialogContent>
          <Card className={root} variant="outlined">
            <CardContent>
              <Typography className={typography}>
                Registrar en mi Cuenta
              </Typography>
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
                      onChange={handleInputChange}
                      label="Tipo"
                      fullWidth
                    >
                      <MenuItem value={1}>Entrada</MenuItem>
                      <MenuItem value={2}>Salida</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    className={textfield}
                    label="Nombre"
                    variant="outlined"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    required
                  />
                  <TextField
                    fullWidth
                    className={textfield}
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={3}
                  />
                  <TextField
                    fullWidth
                    className={textfield}
                    label="Money"
                    variant="outlined"
                    type="number"
                    name="money"
                    value={money}
                    onChange={handleInputChange}
                    required
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
                      onChange={handleInputChange}
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
                      value={date}
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
                    fullWidth
                  >
                    Guardar
                  </Button>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
