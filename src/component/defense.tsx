import { Button, Fade, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GameType, JapaneseType } from "../type";
import { hiragana, indexKey, katakana, korean } from "../constant/word";

type Props = {
  type: JapaneseType;
  gameType: GameType | "";
  close: React.Dispatch<React.SetStateAction<GameType | "">>;
};

const Defense = (props: Props) => {
  const { type, gameType } = props;
  const [defenseType, setDefenseType] = useState("");
  const [renderValue, setRenderValue] = useState(["", ""]);
  const [renderIndex, setRenderIndex] = useState(0);
  const randomIndex = () => Math.floor(Math.random() * 46);
  const close = props.close;

  const getTable = () => {
    if (type === "hiragana") {
      return hiragana;
    } else if (type === "katakana") {
      return katakana;
    } else {
      const rand = Math.floor(Math.random() * 100);
      if (rand < 50) {
        console.log("hiragana");
        return hiragana;
      } else {
        console.log("katakana");
        return katakana;
      }
    }
  };
  const setNewValue = () => {
    const v = (randomIndex() + 1) as indexKey;
    const table = getTable();
    if (gameType === "japanese") {
      setRenderValue([table[v], korean[v]]);
    } else if (gameType === "hangul") {
      setRenderValue([korean[v], table[v]]);
    } else if (gameType === "random") {
      const rand = Math.floor(Math.random() * 100);
      if (rand < 50) {
        setRenderValue([korean[v], table[v]]);
      } else {
        setRenderValue([table[v], korean[v]]);
      }
    }
  };

  useEffect(() => {
    setDefenseType(gameType);
    if (gameType !== "") {
      setNewValue();
    }
  }, [gameType]);

  const open = () => {
    if (defenseType === "") {
      return false;
    }
    return true;
  };

  const handleClick = (number: number) => {
    if (number === 0) {
      setRenderIndex(1);
    } else {
      setNewValue();
      setRenderIndex(0);
    }
  };

  const closeAll = () => {
    setRenderIndex(0);
    setRenderValue(["", ""]);
    setDefenseType("");
    close("");
  };

  return (
    <Fade in={open()} className={`${open() ? "" : "hidden"}`}>
      <Paper elevation={12} sx={{ width: "100%", height: 384 }}>
        <div className="w-full h-full">
          <Fade in={renderIndex === 0}>
            <div
              className={`${renderIndex === 0 ? "" : "hidden"} p-2`}
              onClick={() => handleClick(0)}
            >
              <Typography variant="h4">문제</Typography>
              <Typography fontSize={"13rem"}>{renderValue[0]}</Typography>
            </div>
          </Fade>
          <Fade in={renderIndex === 1}>
            <div
              className={`${renderIndex === 1 ? "" : "hidden"} p-2`}
              onClick={() => handleClick(1)}
            >
              <Typography variant="h4">정답</Typography>
              <Typography fontSize={"13rem"}>{renderValue[1]}</Typography>
            </div>
          </Fade>
        </div>
        <Button
          color="warning"
          onClick={() => closeAll()}
          variant="contained"
          fullWidth
        >
          닫기
        </Button>
      </Paper>
    </Fade>
  );
};

export default Defense;
