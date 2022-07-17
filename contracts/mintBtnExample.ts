import { useState } from "react";
import { ethers } from "ethers";
import pathOr from "ramda/src/pathOr";

import { useUserContext } from "$contexts/UserProvider";
import { useSnackbar } from "$hooks/useSnackbar";
import { useContract } from "$hooks/useContract";
import { useModalContext } from "$components/Modal/context";

export const useMintHandler = () => {
  const { address } = useUserContext();
  const { setIsOpen } = useModalContext();
  const { showErrorSnackbar, showSuccessSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const contract = useContract();

  const mint = (uri: string) => async () => {
    if (!contract || !address) {
      setIsOpen(true);
    } else {
      setIsLoading(true);

      try {
        const tx = await contract.mint(address, uri, { value: ethers.utils.parseEther("0") });
        await tx.wait();

        showSuccessSnackbar("mintedSuccessfully");
      } catch (error) {
        console.log(error);
        showErrorSnackbar(pathOr("error", ["data", "message"], error));
      }

      setIsLoading(false);
    }
  };

  return {
    isLoading,
    mint,
  };
};