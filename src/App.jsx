import { ConnectWallet, useContract, useContractWrite } from '@thirdweb-dev/react';
import { useState } from 'react'
import './styles/style.css'


function App() {

  // states
  // computer generated game value 
  const [randValue, setRandValue] = useState("");
  // score of the user
  const [score, setScore] = useState(0);
  // attempts of user
  const [attempts, setAttempts] = useState(0);
  // msg to the user about the score
  const [msg, setMsg] = useState("")
  // win or loss 
  const [status, setStatus] = useState("")
  // check the wallet connected or not
  const [walletConnected, setWalletConnected] = useState(false)
  // set wallet address
  const [address, setAddress] = useState("")


  //   contract setup
  const { contract, isLoading } = useContract("0x33477b6E5E279ec1D947330dc8D748f35164ADb7");
  const { mutateAsync: Transfer } = useContractWrite(contract, "Transfer")

  // gaming function for the @user
  const Playgame = (e) => {
    let values = ["paper", "scissor", "stone"];
    let randomNum = Math.floor(Math.random() * values.length);
    let computerSelection = values[randomNum];
    setRandValue(computerSelection);
    if (computerSelection === e) {
      setScore((prevScore) => prevScore + 1);
    }
    setAttempts((prevAttempts) => prevAttempts + 1);
    if (attempts >= 4) {
      setMsg(`You  Score is ${score}`)
      setScore(0);
      setAttempts(0);

    }
    if (score == 2) {
      setStatus("You won the price")
    }
  };

  // function will called @user connect the wallet
  const handleWalletConnect = () => {
    setWalletConnected(true)
  }

  const ConnectWallet = async () => {
    // const {ethereum} = window;
    if (!ethereum) {
      alert("Install Metamask Please")
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    })
    setAddress(accounts[0])
    handleWalletConnect()
  }


  return (
    <div className="App">
      {walletConnected ? (
        <div>
          <div className="navbar flex justify-between p-4">
            <h2 className="text-2xl">Logo</h2>
            <button className='px-4 py-3 bg-pink-600'>{address.slice(0,4)}...{address.slice(38,42)}</button>
          </div>
          {/* body of the game */}
          <div className="h-screen flex items-center justify-center">
            {/* user msg */}
           <div className="grid">
           <div className="grid text-center">
           <div className="text-2xl mb-2">{status}</div>
              <div className="text-4xl">{randValue}</div>
              <div className='mt-4 text-2xl'>{msg}</div>
              <div className="text2xl mb-2">{score}</div>
            </div>

            <div className="grid">
              <div className="card flex gap-3">
                <button
                  className="btn p-2 px-4 py-3 bg-slate-400 text-2xl"
                  onClick={() => Playgame("stone")}
                >
                  ✊
                </button>
                <button
                  className="btn p-2 px-4 py-3 bg-slate-400 text-2xl"
                  onClick={() => Playgame("paper")}
                >
                  ✋
                </button>
                <button
                  className="btn p-2 px-4 py-3 bg-slate-400 text-2xl"
                  onClick={() => Playgame("scissor")}
                >
                  ✌️
                </button>
              </div>
              <div className="flex gap-7">
                <span>Stone</span>
                <span>Paper</span>
                <span>Scissor</span>
              </div>
            </div>
           </div>
          </div>
        </div>
      ) : (
        <div className='pt-4 h-screen flex items-center justify-center'>
          {/* button to connect wallet */}
          <button onClick={ConnectWallet} className='px-4 py-3'>Connect</button>
        </div>
      )}
    </div>
  );
}

export default App;
