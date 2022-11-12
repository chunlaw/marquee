import React, { useCallback, useEffect, useState } from "react";
import { Box, Input, Slider, SxProps, Theme } from "@mui/material";

interface SliderFieldProps {
  value: number;
  onChange: (v: number) => void;
}

const SliderField = ({ value, onChange }: SliderFieldProps) => {
  const [text, setText] = useState<string>(`${value}`);

  const handleInputChange = useCallback(
    (v: string) => {
      setText(v);
      console.log(v);
      if (v.length === 0) {
      } else {
        onChange(parseFloat(v));
      }
    },
    [setText, onChange]
  );

  useEffect(() => {
    setText(`${value}`);
  }, [value, setText]);

  return (
    <Box sx={rootSx}>
      <Slider
        value={value}
        onChange={(e, v) => onChange(v as number)}
        step={0.1}
        min={0.1}
        max={40}
        sx={{ width: "80%" }}
      />
      <Input
        value={text}
        onChange={(e) => handleInputChange(e.target.value)}
        type="number"
        sx={{ width: "20%" }}
      />
    </Box>
  );
};

export default SliderField;

const rootSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "space-between",
  flex: 1,
  pl: 3,
  gap: 1,
};
