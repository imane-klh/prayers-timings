import "./App.css";
import Main from "./components/Main";
import Container from "@mui/material/Container";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Container maxWidth="lg">
          <Main />
        </Container>
      </div>
    </>
  );
}

export default App;
