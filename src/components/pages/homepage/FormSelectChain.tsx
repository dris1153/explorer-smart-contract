import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image,
  Input,
} from "@nextui-org/react";
import { chains } from "~/core/config";
import getLogo from "~/utils/blockchain/getLogo";
import { setFormSC } from "~/store/createsc";
import { Chain } from "viem";

const FormSelectChain = ({ setStep = (step: number) => {} }) => {
  const [chain, setChain] = useState<Chain | undefined>(undefined);
  return (
    <div className="w-[460px] max-w-full mx-auto flex flex-col gap-[16px] mt-[64px]">
      <Autocomplete
        defaultItems={chains}
        variant="faded"
        label="Select chain"
        placeholder="Enter chain name"
        labelPlacement="inside"
        className="w-full text-white"
        onSelectionChange={(value) => {
          const chainInfor = chains.find(
            (item) => Number(item.id) === Number(value)
          );
          setChain(chainInfor);
        }}
      >
        {(chain) => (
          <AutocompleteItem key={chain.id} textValue={chain.name}>
            <div className="flex gap-2 items-center">
              <Image
                alt={chain.name}
                className="flex-shrink-0 !object-contain !object-center h-[36px] w-[36px]"
                src={getLogo(chain.nativeCurrency.symbol)}
              />
              <span className="text-white">{chain.name}</span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
      {!!chain && (
        <>
          <Input
            readOnly
            value={chain?.id?.toString()}
            className="w-full text-gray-400"
            variant="faded"
            label="Chain ID"
          />
          <Input
            readOnly
            value={chain?.rpcUrls?.default?.http?.[0]?.toString()}
            className="w-full text-gray-400"
            variant="faded"
            label="RpcUrl default"
          />
          <Button
            className="w-full"
            endContent={<ArrowForwardIosIcon className="text-[14px]" />}
            onClick={() => {
              setFormSC({ chainID: chain.id });
              setStep(1);
            }}
          >
            Next
          </Button>
        </>
      )}
    </div>
  );
};

export default FormSelectChain;
