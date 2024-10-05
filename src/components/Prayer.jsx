import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import { CardMedia } from "@mui/material";
import { CardActions } from "@mui/material";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

Prayer.propTypes = {
  name: PropTypes.string.isRequired, // La prière est requise et doit être une chaîne
  img: PropTypes.string.isRequired, // L'image est requise et doit être une chaîne
  time: PropTypes.string.isRequired,
};
export default function Prayer({ name, img, time }) {
  return (
    <div>
      <Card
        sx={{
          width: 220,
          height: 330,
          backgroundImage: `url(${img})`,
          backgroundSize: "contain",
        }}
      >
        <CardContent style={{ marginTop: "20px", alignItems: "center" }}>
          <h2 style={{ textAlign: "center", color: "white" }}>{name}</h2>
          <Typography variant="h2" color="white" textAlign={"center"}>
            {time}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}
