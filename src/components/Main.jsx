import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import usePrayerTimings from "../hooks/usePrayerTimings";
import moment from "moment";
import "moment/locale/fr";
import { useEffect, useRef } from "react";

// importation des photos
const fajr = "/images/Salawat/fadjr.png";
const dohr = "/images/Salawat/dohr.png";
const asr = "/images/Salawat/asr.png";
const maghreb = "/images/Salawat/maghreb.png";
const icha = "/images/Salawat/icha.png";

export default function Main() {
  const { wilaya, setWilaya, timings, leftTime, nextPrayer } =
    usePrayerTimings();
  const audioRef = useRef(null);
  useEffect(() => {
    if (leftTime === "00:00:00" && audioRef.current) {
      audioRef.current.play();
    }
  }, [leftTime]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ color: "white" }}>
            {moment().format("MMMM D YYYY, h:mm")}
          </h2>
          <h1 style={{ color: "white" }}>{wilaya}</h1>
        </div>

        <div>
          <h2 style={{ color: "white" }}>{nextPrayer} dans</h2>
          <h1 style={{ color: "white" }}>{leftTime}</h1>
        </div>

        <FormControl style={{ width: "20%", color: "white" }}>
          <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>
            Wilaya
          </InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Wilaya"
            value={wilaya}
            style={{ style: "white" }}
            onChange={(event) => {
              setWilaya(event.target.value);
            }}
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              ".MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            <MenuItem value={"Bejaia"}>Bejaia</MenuItem>
            <MenuItem value={"Oran"}>Oran</MenuItem>
            <MenuItem value={"Djanet"}>Djanet</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Divider style={{ backgroundColor: "white", opacity: "50%" }} />

      <Stack direction="row" justifyContent={"space-around"} marginTop={"20px"}>
        <Prayer name="Al Fajr" img={fajr} time={timings.Fajr} />
        <Prayer name="Al Dohr" img={dohr} time={timings.Dhuhr} />
        <Prayer name="Al Asr" img={asr} time={timings.Asr} />
        <Prayer name="Al Maghreb" img={maghreb} time={timings.Maghrib} />
        <Prayer name="Al Icha" img={icha} time={timings.Isha} />
      </Stack>

      <div>
        <audio ref={audioRef} src="../../public/assets/Adan/a6.mp3" autoPlay>
          Votre navigateur ne supporte pas l'élément audio.
        </audio>
      </div>
    </div>
  );
}
