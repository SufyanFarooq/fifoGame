import React, { useState,useEffect } from "react";
import "./table.css";
import Web3 from 'web3';

import {abi, contract, tokenAbi, tokenContract} from '../../utilies/constant'
function ShowTable() {
  let [totalUser, setTotalUser]= useState([])
  const [account, setAccount] = useState("Connect Wallet");
  let [accountAd, setAccountAd]=useState();

  console.log(abi);
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,11,111,11,11,11];
  const contractOf = () => {
    let   newContract = new window.web3.eth.Contract(abi, contract);
       return newContract;
   }
   const tokenContractOf = () => {
    let   newContract = new window.web3.eth.Contract(tokenAbi, tokenContract);
       return newContract;
   }
   
   const viewBalance = async () => {
   try{
     let user= await contractOf().methods.totaluser().call();
     setTotalUser(user);
     console.log("total users",totalUser);

   }catch(error){
     console.log("error while get users", error);
   }
}
setInterval(() => {
  viewBalance()
}, 1000)
let accounts;
  const getAccounts = async () => {
    const web3 = window.web3;
    try {
      accounts = await web3.eth.getAccounts();
      return accounts;
    } catch (error) {
      console.log("Error while fetching acounts: ", error);
      return null;
    }
  };

  const loadWeb3 = async () => {
    let isConnected = false;
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        isConnected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        isConnected = true;
      } else {
        isConnected = false;
        console.log("Metamask is not installed, please install it on your browser to connect.");
      }
      if (isConnected === true) {
        let accounts = await getAccounts();
        setAccountAd(accounts[0])
        // accountAd = accounts[0];
        // accountAd = accounts[0];
        // let acc = accountAd.substring(0, 4) + "..." + accountAd.substring(accountAd.length - 4)
        // setAccount(acc);
        // console.log("account address", accountAd)

      }
    } catch (error) {
      console.log("Error while connecting metamask", error);
    }
  };

  // await contractOf().methods.stake(100).send({ from: accountAd });
  // await tokenContractOf().methods.approve(contract, 100).send({ from: accountAd });


  const depositeAmount=async()=>{
    alert("deposit")
    let web3 = window.Web3;
    
    try {
     
    
     
      await tokenContractOf().methods.approve(contract, 100).send({ from: accountAd })
      .on( "transationHash", async () => {
        console.log("contract of", await contractOf().methods);  
        await contractOf().methods.stake(100).send({ from: accountAd })
                  
                    
                 
              }).catch((e) => {
                 
                  console.log("response", e);
              });
      
    
  } catch (error) {
      console.log("Error while fetching acounts: ", error);

  }
    

  }

  useEffect(() => {

    loadWeb3();
  });
  return (
    <>
    <div className="tableData">
      <div className="tableContainer">
        <div className="tableHeader">
        User Address

        </div>
 <div className="tableInnerScrol">


        {arr.map((item)=>{
          return (
            <div className="tableInner">
           Mask
            </div>
          )
        })}
        </div>
       
      </div>
    </div>
    <div className="buttonSection ">

    <button className="btn btn-primary" onClick={depositeAmount}>Deposit</button>
    </div>

    </>
     
  );
}

export default ShowTable;
