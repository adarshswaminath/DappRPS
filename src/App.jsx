import { useContract, useContractWrite,ConnectWallet,useAddress } from '@thirdweb-dev/react';
import { useState,useEffect } from 'react'
import './styles/style.css'
import Swal from "sweetalert"


function App() {
  let address = useAddress()
  // states
  // disable icons 
  const [isDisable,setIsDisable] = useState(false)
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
  


  //   contract setup
  const { contract } = useContract("0x33477b6E5E279ec1D947330dc8D748f35164ADb7");
  const { mutateAsync: Transfer } = useContractWrite(contract, "Transfer")
  // contract call 
  const call = async () => {
    try {
      const data = await Transfer([ address ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
  // function for waiting 
  const delay = ms => new Promise(res => setTimeout(res,ms))
  // gaming function for the @user
  const Playgame = async(e) => {
    let values = ["paper", "scissor", "stone"];
    let randomNum = Math.floor(Math.random() * values.length);
    let computerSelection = values[randomNum];
    setRandValue(computerSelection);
    if (computerSelection === e) {
      setScore((prevScore) => prevScore + 1);
    }
    setAttempts((prevAttempts) => prevAttempts + 1);
    if (attempts >= 4) {
      setMsg(`You Failed Try Again`)
      setScore(0);
      setAttempts(0);
      window.location.reload()

    }
    // setting difficulty
    if (score == 1) {
      // disable click buttons
      setIsDisable(current => !current)
      setMsg(`Your Score ${score} \n You Win Price 🎉`)
      call()
      await delay(5000)
      setMsg("Just A minute You will\n recieve your Price")
    }
  };

  // function will called @user connect the wallet
  const handleWalletConnect = () => {
    setWalletConnected(true)
  }

  useEffect(() => {
    Swal(
      "Hello User",
      "✋ Welcome to DappRPS \n✋ You can earn GoerliETH By Playing Stone Paper Scissor Game \n ✋ First You should connect your wallet \n ✋ This game have difficulty 3/3 \n ✋ To win price you should have 5 points then automaticaly ETH will Transfer to your account"
    )
  },[])


  return (
    <div className="App">
        <div>
          <div className="navbar flex justify-between p-4">
            {/* <NFT/> */}
            <ConnectWallet className='px-4 py-2'/>
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

            <div className="grid" 
              style={{
                opacity : isDisable ? 0 : ""
              }}
            >
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
    
    </div>
  );
}

export default App;
