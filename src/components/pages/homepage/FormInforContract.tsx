import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { setFormSC, useFormSC } from "~/store/createsc";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ConstructionIcon from "@mui/icons-material/Construction";
import web3 from "web3";

const FormInforContract = ({ setStep = (step: number) => {} }) => {
  const abi = useFormSC((store) => store.abi);
  const contractAddress = useFormSC((store) => store.contractAddress);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  function build() {
    let error = "";
    try {
      if (!web3.utils.isAddress(contractAddress)) {
        error = "The contract is invalid";
        return error;
      }
    } catch {}
    return error;
  }

  return (
    <div className="w-[460px] max-w-full mx-auto flex flex-col gap-[16px] mt-[64px]">
      <Input
        className="w-full text-gray-400"
        variant="faded"
        label="Contract Address"
        value={contractAddress}
        onChange={(e) => {
          setFormSC({
            contractAddress: web3.utils.toChecksumAddress(
              e.currentTarget.value
            ),
          });
        }}
      />
      <div className="flex flex-col gap-[8px] w-full">
        <label className="text-white font-bold text-[16px]">Attach ABI</label>
        <input
          ref={inputFileRef}
          type="file"
          className="opacity-0 w-0 h-0 absolute pointer-events-none"
          accept=".json"
          onChange={(event) => {
            if (event?.target?.files?.[0]) {
              const file = event?.target?.files?.[0]; // Get the selected file
              setFile(file);
              if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                  if (e?.target?.result) {
                    const contents = e.target.result as string;
                    const data = JSON.parse(contents);
                    setFormSC({ abi: data });
                  }
                };

                reader.readAsText(file); // Read the file as text
              }
            }
          }}
        />
        <Input
          className="w-full text-gray-400"
          variant="faded"
          readOnly
          startContent={<FileUploadIcon />}
          placeholder={file?.name ? file.name : "Upload file ABI"}
          onClick={() => {
            inputFileRef.current?.click();
          }}
        />
      </div>
      {!!abi && (
        <Textarea
          readOnly
          label="Content ABI raw"
          value={JSON.stringify(abi)}
        />
      )}
      <div className="flex items-center gap-[16px] w-full">
        <Button
          className="w-full"
          startContent={<ArrowBackIosIcon className="text-[14px]" />}
          onClick={() => {
            setStep(0);
          }}
        >
          Prev
        </Button>
        <Button
          className="w-full"
          endContent={<ConstructionIcon className="text-[14px]" />}
          onClick={build}
          isDisabled={!abi || !contractAddress}
        >
          Build
        </Button>
      </div>
    </div>
  );
};

export default FormInforContract;
