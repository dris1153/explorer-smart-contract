"use client";

import { Container, createTheme } from "@mui/material";

import { useState } from "react";
import { Chain } from "viem";
import StepCreateSC from "~/components/pages/homepage/StepCreateSC";

import FormSelectChain from "~/components/pages/homepage/FormSelectChain";
import FormInforContract from "~/components/pages/homepage/FormInforContract";
import { cn } from "~/utils/base";

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function HomeContainer() {
  const [step, setStep] = useState(0);

  return (
    <Container className="pt-[40px]">
      <StepCreateSC step={step} />
      <div
        className={cn("w-full", {
          ["hidden"]: step !== 0,
        })}
      >
        <FormSelectChain setStep={setStep} />
      </div>
      <div
        className={cn("w-full", {
          ["hidden"]: step !== 1,
        })}
      >
        <FormInforContract setStep={setStep} />
      </div>
    </Container>
  );
}
