import { useState } from "react";
import "./App.css";
import { Button, Fade } from "@mui/material";
import Defense from "./component/defense";
import { GameType, JapaneseType } from "./type";

function App() {
  const [type, setType] = useState<JapaneseType | "">("");
  const [GameType, setGameType] = useState<GameType | "">("");
  const handleClick = (i: GameType) => {
    setGameType(i);
  };
  const typeMapping = {
    hiragana: "히라가나",
    katakana: "가타카나",
    random: "일본어",
  };

  const fadeIn = () => (type === "" ? false : true);

  return (
    <>
      <Fade
        in={type === "" || GameType === ""}
        className={`${type && GameType ? "hidden" : ""}`}
      >
        <div>
          <Fade in={!fadeIn()} className={`${!fadeIn() ? "" : "hidden"}`}>
            <div>
              <div className="flex justify-center items-center gap-4 min-w-80">
                <Button variant="contained" onClick={() => setType("hiragana")}>
                  히라가나
                </Button>
                <Button variant="contained" onClick={() => setType("katakana")}>
                  가타카나
                </Button>
                <Button variant="contained" onClick={() => setType("random")}>
                  올랜덤 디펜스
                </Button>
              </div>
            </div>
          </Fade>
          {type && (
            <Fade in={fadeIn()} className={`${fadeIn() ? "" : "hidden"}`}>
              <div>
                <div className="flex flex-col items-center gap-4 min-w-80">
                  <Button
                    variant="contained"
                    onClick={() => handleClick("japanese")}
                  >
                    {typeMapping[type]}만
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleClick("hangul")}
                  >
                    한글만
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleClick("random")}
                  >
                    랜덤{typeMapping[type]} 디펜스
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => setType("")}
                  >
                    뒤로가기
                  </Button>
                </div>
              </div>
            </Fade>
          )}
        </div>
      </Fade>
      <div className="flex flex-col items-center gap-4 min-w-80">
        {type && (
          <Defense type={type} gameType={GameType} close={setGameType} />
        )}
      </div>
    </>
  );
}

export default App;
