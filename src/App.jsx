import { useEffect, useState } from "react"
import Toppg from "./Toppg";
import Bottompg from "./Bottompg";
import Favpg from "./Favpg";

function App() {
  let [coin,setcoin] = useState([])
  let [curr,setcurr] = useState("USD")



  let aq = 0
  let [apiurl,setapiurl] = useState(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`)
  if(aq == 0) {
    

    useEffect(()=>{
      
      const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-HVjB7oSsdouhQRQKhuUcheCB'}
      };
      
      fetch(apiurl, options)
      .then(response => response.json())
      .then(response => setcoin(response))
      

      
    
  },[apiurl])


    const [showfav,setshowfav] = useState(true)
    

    const[getfav,setgetfav] = useState([])
    const getdata = (data) => {
      setgetfav(data)
    }
    const[getfavagain,setgetfavagain] = useState([])
    const getdataagain = (data) => {
      setgetfavagain(data)
    }


    const handleShowfav = () => {
      setshowfav(showfav=>!showfav)
      let temp = getfav
      console.log(temp);
    }

    const handlecur = (e) => {
      aq = 1
      setapiurl(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${e.target.textContent}`)
      setcurr(e.target.textContent)

    }




  return (
    <div className="main nnn flex-col relative text-white min-h-screen w-full">
      <div id="slider" className="absolute  top-[18%] left-[10%] bg-blue-800 boo p-1 rounded-xl">
        <div id="sldcont" className="relative justify-between h-[50px] flex items-center rounded-xl    w-[25vw]">
          <div className="slide w-[33.33%] h-full nnn rounded-xl text-4xl cursor-pointer font-[fantasy] relative z-[40]" onClick={handlecur}>USD</div>
          <div className="slide w-[33.33%] h-full nnn rounded-xl text-4xl cursor-pointer font-[fantasy] relative z-[40]" onClick={handlecur}>INR</div>
          <div className="slide w-[33.33%] h-full nnn rounded-xl text-4xl cursor-pointer font-[fantasy] relative z-[40]" onClick={handlecur}>EUR</div>
          <div className={` w-[33.33%] h-full nnn rounded-xl absolute leo bg-blue-500 ${curr == "EUR" ? "translate-x-[200%]" : curr == "INR" ? "translate-x-[100%]" : "translate-x-[0%]"} `} onClick={handlecur}></div>
        </div>
      </div>
    <Toppg></Toppg>
    {showfav ? <Bottompg currs={curr}  chng={getdata} favagain={getfavagain}  favshow={handleShowfav} coins={coin}></Bottompg>:<Favpg currs={curr} getfavs={getdataagain} favshow={handleShowfav} coins={coin}  favdata={getfav} />}
    
    </div>
  )
}

}
export default App
