import * as LitJsSdk from "@lit-protocol/lit-node-client";

const uselit=async({hash,NFTaddress})=>{
    const client = new LitJsSdk.LitNodeClient();
    const chain="mumbai"
    // const address=await signer.getAddress();

    try {
      await client.connect();
    } catch (error) {
      console.log(error);
    }
    // const evmContractConditions = [
    //     {
    //       contractAddress: `${NFTaddress}`,
    //       functionName: "balanceOf",
    //       functionParams: [":userAddress"],
    //       functionAbi: {
    //         type: "function",
    //         stateMutability: "view",
    //         outputs: [
    //           {
    //             type: "uint256",
    //             name: "",
    //             internalType: "uint256",
    //           },
    //         ],
    //         name: "balanceOf",
    //         inputs: [
    //           {
    //             type: "address",
    //             name: "account",
    //             internalType: "address",
    //           },
    //         ],
    //       },
    //       chain,
    //       returnValueTest: {
    //         key: "",
    //         comparator: ">",
    //         value: "0",
    //       },
    //     },
    //   ];
    // accessControlConditions

    const accessControlConditions = [
      {
        contractAddress: `${NFTaddress}`,
        standardContractType: 'ERC721',
        chain,
        method: 'balanceOf',
        parameters: [
          ':userAddress'
        ],
        returnValueTest: {
          comparator: '>',
          value: '0'
        }
      }
    ]
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain:"mumbai" });
const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
  `${hash}`
);
const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};
const encryptedDescriptionString = await blobToBase64(encryptedString);
console.log(encryptedDescriptionString);
const encryptedSymmetricKey = await window.litNodeClient.saveEncryptionKey({
  accessControlConditions,
  symmetricKey,
  authSig,
  chain,
});
const toDecrypt=LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
console.log(typeof(toDecrypt));
console.log(toDecrypt);
return({toDecrypt,encryptedDescriptionString})

}
export default uselit;