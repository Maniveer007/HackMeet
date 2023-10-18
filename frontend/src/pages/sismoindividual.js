import React from 'react'

import {
  SismoConnectButton,
  AuthType,
  ClaimType
  // SismoConnect,
} from "@sismo-core/sismo-connect-react";
const Sismoindividual = () => {

  const config={
    appId: "0xaf9d0660f18b0feee94fefe6a747428b", // replace with your appId
    vault: {
      // For development purposes insert the Data Sources that you want to impersonate here
      // Never use this in production
      impersonate: [
       
      ],
    },
    // displayRawResponse: true,
  }

  return (
    <SismoConnectButton
      
      auths={[
        // { authType: AuthType.GITHUB },{ authType: AuthType.VAULT }
        { authType: AuthType.EVM_ACCOUNT }]}
   
      config={config}
      claims={[
    
        // { groupId: "0x1cde61966decb8600dfd0749bd371f12", value: 15, claimType: ClaimType.GTE },
        {
          // claim on Stand with Crypto NFT Minters Data Group membership: https://factory.sismo.io/groups-explorer?search=0xfae674b6cba3ff2f8ce2114defb200b1
          // Data Group members          = minters of the Stand with Crypto NFT
          // value for each group member = number of NFT minted
          // request user to prove membership in the group with value = 10
          groupId: "0x3de594b4e6ba9b31d36d3500531a41a7",
          claimType: ClaimType.EQ,
         // dhadrin.sismo.eth minted exactly 10, eligible
        }

  
      ]} 
      // request message signature from users.
      signature={{ message: "I vote Yes to Privacy:::" }}
      // retrieve the Sismo Connect Reponse from the user's Sismo data vault
      onResponse={async (response) => {

        console.log(response);
        // navigate("/you-are-done")
     
      }}
    
      
    />
  )
}

export default Sismoindividual