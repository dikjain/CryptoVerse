import { useEffect, useRef, useState } from "react"
import Toppg from "./Toppg";
import Bottompg from "./Bottompg";
import Favpg from "./Favpg";
import gsap from 'gsap';
import Search from "./Search";



function App() {
  let [coin,setcoin] = useState([])
  let [savedata,setsavedata] = useState([])
  let [curr,setcurr] = useState("USD")
  const [searchtext,setsearchtext] =useState("")

  const searching = useRef()

  useEffect(() => {
    // Target the element with class "coinns"
    let teen = gsap.from(".coinns", {
      opacity: 0,
      duration: 1, 
      stagger:0.075,
      y:40,
      ease: "power3.inOut",
    });



    return ()=>teen.revert()
  }, [coin]); 

  useEffect(() => {
    gsap.from("#slider", {
      opacity: 0,
      duration: 1, 
      x:-100,
      ease: "power3.inOut",
    });
     gsap.from(".favbtn", {
      opacity: 0,
      duration: 1, 
      x:100,
      ease: "power3.inOut",
    });
     gsap.from(".logo", {
      opacity: 0,
      duration: 1, 
      ease: "power3.inOut",
    });
     gsap.from(".mainhid", {
      opacity: 0,
      duration: 1, 
      ease: "power3.inOut",
    });
     gsap.from(".main", {
      duration: 1, 
      ease: "power3.inOut",
    });
  },[])



  
  
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
      setsavedata(coin)

    
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
    }

    const handlecur = (e) => {
      aq = 1
      setapiurl(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${e.target.textContent}`)
      setcurr(e.target.textContent)

    }
    

    const [pg,crntpg] = useState(1)



    const handlesearch = (e)=>{
      setsearchtext(e.target.value)
    }
    useEffect(()=>{
      if (searchtext.length <1 || searchtext == " "|| searchtext == "") {
        setcoin(savedata)
        crntpg(1)  
        
      }else{
        let tryingsearch = savedata.filter((q)=>String(q.id).toLowerCase().startsWith(searchtext));
        setcoin(tryingsearch)
        crntpg(1)  
        
      }
    },[searchtext])

    const [searchvis,setsearchvis] = useState(true)

    const showsearch = ()=>{
      if(!searchvis){ 
        searching.current.style.width = "0vw";
        searching.current.style.transform = "translateX(-40px) translateY(1vh)";
        setsearchvis(true)
      }else{
        searching.current.style.width = "50vw";
        searching.current.style.transform = "translateX(-25vw) translateY(1vh)";
        setsearchvis(false)

      }

    }
    

  return (
    <div className="main nnn flex-col relative text-white min-h-screen w-full">
      <input ref={searching} type="text" placeholder="Search" value={searchtext} onChange={handlesearch} className="py-2 px-5 rounded-full inptfld text-black absolute top-[1.5vh] opacity-1 z-[2000]" />
      <div className=" absolute top-0 right-0 z-[400000]" onClick={showsearch}><Search /></div>
      <div id="slider" className="absolute  top-[18%] left-[10%] bg-blue-800 boo p-1 rounded-xl">
        <div id="sldcont" className="relative justify-between h-[50px] flex items-center rounded-xl    w-[25vw]">
          <div className="slide w-[33.33%] h-full nnn rounded-xl text-4xl cursor-pointer font-[Squada One] lllk font-extrabold relative z-[40]" onClick={handlecur}>USD</div>
          <div className="slide w-[33.33%] h-full nnn rounded-xl text-4xl cursor-pointer font-[Squada One] lllk font-extrabold relative z-[40]" onClick={handlecur}>INR</div>
          <div className="slide w-[33.33%] h-full nnn rounded-xl text-4xl cursor-pointer font-[Squada One] lllk font-extrabold relative z-[40]" onClick={handlecur}>EUR</div>
          <div className={` w-[33.33%] h-full nnn rounded-xl absolute leo bg-blue-500 ${curr == "EUR" ? "translate-x-[200%]" : curr == "INR" ? "translate-x-[100%]" : "translate-x-[0%]"} `} onClick={handlecur}></div>
        </div>
      </div>
    <Toppg></Toppg>
    {showfav ? <Bottompg currs={curr} pg={pg} searchtext={searchtext}  crntpg={crntpg} chng={getdata} favagain={getfavagain}  favshow={handleShowfav} coins={coin}></Bottompg>:<Favpg currs={curr} getfavs={getdataagain} favshow={handleShowfav} coins={coin}  favdata={getfav} />}
    
    </div>
  )
}

}
export default App
