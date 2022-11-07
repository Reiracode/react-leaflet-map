import { Button, Grid, makeStyles } from "@material-ui/core";
import CountryButton from "./CountryButton";

const useStyles = makeStyles((theme) => ({
  styledButton: {
    width: "200px"
  }
}));

const CountryButtons = (props) => {
  const classes = useStyles();

  // Click Event
  const buttonClick = (e) => {
    console.log(e.currentTarget.value);
  };
  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      <CountryButton
        countryInfo={{
          capital: "パリ",
          country: "フランス",
          latitude: 48.856614,
          longitude: 2.3522219
        }}
        setCoordinate={props.setCoordinate}
      />
      <CountryButton
        countryInfo={{
          capital: "ワシントンD.C.",
          country: "アメリカ合衆国",
          latitude: 38.9071923,
          longitude: -77.0368707
        }}
        setCoordinate={props.setCoordinate}
      />
      <CountryButton
        countryInfo={{
          capital: "ロンドン",
          country: "イギリス",
          latitude: 51.5072178,
          longitude: -0.1275862
        }}
        setCoordinate={props.setCoordinate}
      />
      <CountryButton
        countryInfo={{
          capital: "ベルリン",
          country: "ドイツ",
          latitude: 52.5200066,
          longitude: 13.404954
        }}
        setCoordinate={props.setCoordinate}
      />
      <CountryButton
        countryInfo={{
          capital: "ローマ",
          country: "イタリア",
          latitude: 41.9027835,
          longitude: 12.4963655
        }}
        setCoordinate={props.setCoordinate}
      />
      <CountryButton
        countryInfo={{
          capital: "オタワ",
          country: "カナダ",
          latitude: 45.4215296,
          longitude: -75.6971931
        }}
        setCoordinate={props.setCoordinate}
      />
      <CountryButton
        countryInfo={{
          capital: "東京",
          country: "日本",
          latitude: 35.6803997,
          longitude: 139.7690174
        }}
        setCoordinate={props.setCoordinate}
      />
    </Grid>
  );
};

export default CountryButtons;
