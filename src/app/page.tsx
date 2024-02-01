"use client";

import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import StepCreate from "~/components/create-sc/StepCreate";
import { chains } from "~/core/config";
import getLogo from "~/utils/blockchain/getLogo";

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function HomeContainer() {
  const [step, setStep] = useState(0);
  const [chain, setChain] = useState("0");
  return (
    <ThemeProvider theme={theme}>
      <Container className="pt-[40px]">
        <StepCreate step={step} />

        <FormControl>
          <InputLabel id="select-chains-config-label">Chains</InputLabel>
          <Select
            labelId="select-chains-config-label"
            id="select-chains-config"
            value={chain}
            label="Select chain"
            onChange={(event: SelectChangeEvent) => {
              setChain(event.target.value);
            }}
          >
            <MenuItem value="0">Select Chain</MenuItem>
            {chains?.map((item) => {
              return (
                <MenuItem value={item.id} key={item.id}>
                  <div className="flex items-center gap-[6px]">
                    <img
                      src={getLogo(item.nativeCurrency.symbol)}
                      className="w-[16px] h-[16px] object-contain object-center"
                    />
                    <span>{item.name}</span>
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Container>
    </ThemeProvider>
  );
}
