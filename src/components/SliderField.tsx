import { useCallback, useEffect, useState } from "react";
import { Box, Input, Slider, SxProps, Theme } from "@mui/material";
import { IconButton } from "@mui/material";
import { Add as AddIcon, Remove as MinusIcon } from "@mui/icons-material";

interface SliderFieldProps {
  value: number;
  onChange: (v: number) => void;
}

const SliderField = ({ value, onChange }: SliderFieldProps) => {
  const [text, setText] = useState<string>(`${value}`);

  const handleInputChange = useCallback(
    (v: string) => {
      setText(v);
      if (v.length === 0) {
      } else {
        onChange(parseFloat(v));
      }
    },
    [setText, onChange],
  );

  useEffect(() => {
    setText(`${value}`);
  }, [value, setText]);

  return (
    <Box sx={rootSx}>
      <IconButton
        onClick={() =>
          onChange(Math.round(Math.max(value - 0.1, 0.1) * 10) / 10)
        }
      >
        <MinusIcon />
      </IconButton>
      <Slider
        value={value}
        onChange={(_, v) => onChange(v as number)}
        step={0.1}
        min={0.1}
        max={40}
        sx={{ width: "80%" }}
      />
      <IconButton onClick={() => onChange(Math.round((value + 0.1) * 10) / 10)}>
        <AddIcon />
      </IconButton>
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
  alignItems: "center",
  flex: 1,
  pl: 3,
  gap: 1,
};
