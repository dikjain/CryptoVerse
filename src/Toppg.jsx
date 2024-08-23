import React, { useEffect, useMemo, useState } from 'react'

export default function Toppg() {

  const [spn1,setspn1] = useState("")
  const [spn2,setspn2] = useState("")
  let ranchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let random = ""
  let word = ""
  let intss = 0
  let timr = 75
  let prfmchng = 5

  function wrdgen(n){

    for (let i = 0; i < n; i++) {
      random = Math.floor(Math.random() *26)
      word += ranchars[random]
      
    }
   return word 
  }
  useEffect(() => {
    const inter = setInterval(() => {
      setspn1(wrdgen(6));
      word = "";
      setspn2(wrdgen(5));
      word = "";
      intss += 1;
      if (intss >= prfmchng) {
        clearInterval(inter);  // Correctly referencing the interval ID
      }
    },timr);
    
    setTimeout(()=>{setspn1("C" + wrdgen(5));word = "";setspn2(wrdgen(5));word = ""; },timr*(prfmchng+1))
    setTimeout(()=>{setspn1("CR" + wrdgen(4));word = "";setspn2(wrdgen(5));word = "";},timr*(prfmchng+2))
    setTimeout(()=>{setspn1("CRY" + wrdgen(3));word = "";setspn2(wrdgen(5));word = ""; },timr*(prfmchng+3))
    setTimeout(()=>{setspn1("CRYP" + wrdgen(2));word = "";setspn2(wrdgen(5));word = ""; },timr*(prfmchng+4))
    setTimeout(()=>{setspn1("CRYPT" + wrdgen(1));word = "";setspn2(wrdgen(5));word = ""; },timr*(prfmchng+5))
    setTimeout(()=>{setspn1("CRYPTO");word = "";setspn2(wrdgen(5));word = ""; },timr*(prfmchng+6))
    setTimeout(()=>{setspn2("V"+wrdgen(4));word = "";},timr*(prfmchng+7))
    setTimeout(()=>{setspn2("VE"+wrdgen(3));word = "";},timr*(prfmchng+8))
    setTimeout(()=>{setspn2("VER"+wrdgen(2));word = "";},timr*(prfmchng+9))
    setTimeout(()=>{setspn2("VERS"+wrdgen(1));word = "";},timr*(prfmchng+10))
    setTimeout(()=>{setspn2("VERSE");word = "";},timr*(prfmchng+11))

  
    return () => clearInterval(inter); // Clean up interval on component unmount
  }, []);





  return (
    <div className='Toppg relative w-full iiuu h-[35vh] nnn '>
      <img src='https://i.postimg.cc/QN7bNwvg/favicon.png' className='absolute logo h-[150px] left-[20vw] top-[40px] ii'></img>

        <div id="hding" className=' w-[60%] flex-col h-[80%]  nnn'>
            <div className='text-9xl mainhid flex  items-center justify-center font-[500] txt text-nowrap w-full '><span className='spn1'>{spn1}</span><span className='spn2'>{spn2}</span></div>
            {/* <div className='text-6xl font-[500] txt font-[fantasy]'>By Dikshit</div> */}
            <div className='text-3xl font-[500] mt-[60px] txt2 font-[sans-serif] sectxt'>sign-up to explore more</div>
        </div>

    </div>
  )
}
