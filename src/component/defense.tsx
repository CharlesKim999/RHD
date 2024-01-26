import { Button, Fade, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GameType } from "../type";
import { Japanese, indexKey, korean } from "../constant/word";

type Props = {
  type: GameType | "";
  close: React.Dispatch<React.SetStateAction<GameType | "">>;
};

const Defense = (props: Props) => {
  const { type } = props;
  const [defenseType, setDefenseType] = useState("");
  const [renderValue, setRenderValue] = useState(["", ""]);
  const [renderIndex, setRenderIndex] = useState(0);
  const randomIndex = () => Math.floor(Math.random() * 46);
  const close = props.close;

  const setNewValue = () => {
    const v = (randomIndex() + 1) as indexKey;
    if (type === "hiragana") {
      setRenderValue([Japanese[v], korean[v]]);
    } else if (type === "hangul") {
      setRenderValue([korean[v], Japanese[v]]);
    } else if (type === "random") {
      const rand = Math.floor(Math.random() * 100);
      if (rand < 50) {
        setRenderValue([korean[v], Japanese[v]]);
      } else {
        setRenderValue([Japanese[v], korean[v]]);
      }
    }
  };

  useEffect(() => {
    setDefenseType(type);
    if (type !== "") {
      setNewValue();
    }
  }, [type]);

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
        <Button onClick={() => closeAll()} variant="contained" fullWidth>
          닫기
        </Button>
      </Paper>
    </Fade>
  );
};

export default Defense;
