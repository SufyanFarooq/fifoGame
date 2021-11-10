import React,{useEffect, useState} from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from '../../assests/newLogo.png'
import Web3 from 'web3';


function Header() {
  let accountAd;
  const [account, setAccount] = useState("Connect Wallet");

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
        accountAd = accounts[0];
        accountAd = accounts[0];
        let acc = accountAd.substring(0, 4) + "..." + accountAd.substring(accountAd.length - 4)
        setAccount(acc);

      }
    } catch (error) {
      console.log("Error while connecting metamask", error);
    }
  };

  useEffect(() => {
 
    loadWeb3();
  });
  return (
    <>
<Navbar style={{background:"#12102d"}}>
  <Container>
    <Navbar.Brand href="#home">
      <img src={logo} 
      width="120px"
      // height="80px"
/>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
       <button className="btn btn-primary" >{account}</button>
      </Navbar.Text>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </>
  );
}

export default Header;
