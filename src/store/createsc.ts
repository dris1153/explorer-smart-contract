import { create } from "zustand";

type FormSCType = {
  chainID: number;
  contractAddress: string;
  abi: object | undefined;
};

export const useFormSC = create<FormSCType>((set) => ({
  chainID: 0,
  contractAddress: "",
  abi: undefined,
}));

export function setFormSC<T extends keyof FormSCType>(x: Pick<FormSCType, T>) {
  useFormSC.setState(x);
}
