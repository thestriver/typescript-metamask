import { useEffect, useState } from "react";
//import { Contract, providers } from "ethers";
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const [isWalletInstalled, setIsWalletInstalled] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  

  useEffect(() => {
    if((window as any).ethereum){
      //check if Metamask wallet is installed
      setIsWalletInstalled(true);
    }
  },[]);

  async function connectWallet(): Promise<void> {
    //to get around type checking
    (window as any).ethereum
      .request({
          method: "eth_requestAccounts",
      })
      .then((accounts : any) => {
          setAccount(accounts[0]);
      })
      .catch((error: any) => {
          alert(`Something went wrong: ${error}`);
      });
  }

  if (account === null) {
    return (
      <div className="App App-header">
        { 
          isWalletInstalled ? (
            <div>
              <img src={logo} className="App-logo" alt="logo" />
              <button onClick={connectWallet}>Connect Your Metamask Wallet</button>
            </div>
          ) : (
            <p>Install Your Metamask wallet</p>
          )
        }

      </div>
    );
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ETH wallet connected as: {account}
        </p>
      </header>
    </div>
  );
}

export default App;


