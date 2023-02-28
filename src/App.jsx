import { ConnectWallet, useContract, useContractWrite, useAddress, Web3Button } from '@thirdweb-dev/react';
import { useState } from 'react'
import './styles/style.css'

function App() {
  const [value, setValue] = useState("");
  const [randValue, setRandValue] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [msg, setMsg] = useState("")
  const [status,setStatus] = useState("")
  const [walletConnected, setWalletConnected] = useState(false)

  const address = useAddress()
  console.log(address);
  //   contract setup
  const { contract, isLoading } = useContract("0x33477b6E5E279ec1D947330dc8D748f35164ADb7");
  const { mutateAsync: Transfer } = useContractWrite(contract, "Transfer")
  // gaming function
  const game = (e) => {
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
    if(score ==2){
        setStatus("You won the price")
    }
  };

  // function will called @user connect the wallet
  const handleWalletConnect = () => {
    setWalletConnected(true)
  }

  return (
    <div className="App">
      {walletConnected ? (
        <div>
          <div className='mt-4 text-2xl'>{msg}</div>
      <div className="text-4xl mb-4">{randValue}</div>
      <div className="text2xl mb-2">{score}</div>
      <div className="text2xl mb-2">{status}</div>
      <div className="card flex gap-3">
        <button
          className="btn p-2 px-4 py-3 bg-slate-400 text-2xl"
          onClick={() => game("stone")}
        >
          ✊
        </button>
        <button
          className="btn p-2 px-4 py-3 bg-slate-400 text-2xl"
          onClick={() => game("paper")}
        >
          ✋
        </button>
        <button
          className="btn p-2 px-4 py-3 bg-slate-400 text-2xl"
          onClick={() => game("scissor")}
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
      ): (
        <div className='pt-4'>
        <ConnectWallet
          action={handleWalletConnect}
        />
      </div>
      )} 
    </div>
  );
}

export default App;
