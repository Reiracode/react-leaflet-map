import { Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  styledButton: {
    width: "200px"
  }
}));

const CountryButton = (props) => {
  const classes = useStyles();

  // Click Event
  const buttonClick = () => {
    props.setCoordinate({
      latitude: props.countryInfo.latitude,
      longitude: props.countryInfo.longitude,
      capital: props.countryInfo.capital
    });
  };
  return (
    <Grid item xs={6}>
      <Button
        variant="contained"
        onClick={buttonClick}
        className={classes.styledButton}
        value={props.countryInfo.capital}
      >
        {props.countryInfo.country}
      </Button>
    </Grid>
  );
};

export default CountryButton;
