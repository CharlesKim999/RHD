import { useState } from "react";
import "./App.css";
import { Button, Fade } from "@mui/material";
import Defense from "./component/defense";
import { GameType } from "./type";

function App() {
  const [type, setType] = useState<GameType | "">("");

  const handleClick = (i: GameType) => {
    setType(i);
    console.log(type);
  };

  const fadeIn = () => (type === "" ? true : false);
  return (
    <>
      <Fade in={fadeIn()} className={`${fadeIn() ? "" : "hidden"}`}>
        <div>
          <div className="flex flex-col items-center gap-4 min-w-80">
            <Button variant="contained" onClick={() => handleClick("hiragana")}>
              히라가나만
            </Button>
            <Button variant="contained" onClick={() => handleClick("hangul")}>
              한글만
            </Button>
            <Button variant="contained" onClick={() => handleClick("random")}>
              랜덤히라가나 디펜스
            </Button>
          </div>
        </div>
      </Fade>
      <div className="flex flex-col items-center gap-4 min-w-80">
        <Defense type={type} close={setType} />
      </div>
    </>
  );
}

export default App;
