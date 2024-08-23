import React, { useEffect, useState } from 'react'
import Msvg from './Msvg.jsx'


export default function Bottompg({coins,chng,favshow,favagain,currs}) {
  let ppp = 10
  const [pg,crntpg] = useState(1)
  const [retcol,setretcol] = useState([...favagain],[])
  const [lst,setlst] = useState(pg*ppp)  
  const [fst,setfst] = useState(pg*ppp -ppp)  
  let trimcoin = coins.slice(fst,lst)
let qqlli = 0
  //gsaphook




  
  let pgsnum = []
  for(let i=1;i<=coins.length/ppp;i++){
    pgsnum.push(i)
  }

  const handlefav =(name)=>{
    if (retcol.includes(name.market_cap_rank)){
      setretcol(retcol.filter(item => item!== name.market_cap_rank))
    }else{
      setretcol([...retcol,name.market_cap_rank])
    }
  }

  useEffect(()=>{
    chng(retcol)
  },[retcol])


  const formater = (num) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(num)
  }
  

  
  const handlepg = (e) => {
    crntpg(Number(e.target.textContent));
  }
  useEffect(()=>{
    setlst(pg*ppp) 
    setfst(pg*ppp -ppp) 
    trimcoin = coins.slice(fst,lst)
  },[pg])



  return (
    
    <div className=' w-full h-[100vh] relative  px-[200px] Bottompg'>
      <button onClick={favshow} className='favbtn absolute h-[40px] w-[160px] rounded-xl px-5 py-2 top-[-90px] right-[20%] bg-gray-600'>Favourites</button>
      
      <div id="pgicont" className='absolute left-[50%] text-center z-[10] w-[400px] min-h-[40px] translate-x-[-50%] bottom-[25px] nnn'>
        {pgsnum.map((ll)=>{
          return <div key={ll} id={`pgbox${ll}`} onClick={handlepg} className={`${pg===ll ? "bg-green-600 ":" bg-gray-600 "} pgbox mx-[2px] rounded-full overflow-hiddentext-center nnn `}>{ll}</div>
        })}
      </div>
        <div className={`w-full overflow-hidden h-[7vh] px-10 py-2  my-[10px] flex justify-between items-center`}>
          <h1 className='relative left-[0vw]'>Name</h1>
          <h1 className='relative left-[5vw]'>Curent Value</h1>
          <h1 className='relative markcap left-[5vw]'>Market-Cap</h1>
          <h1 className='relative right-[-20px]'>24hr Change</h1>
        </div>
        {/* ${coin.market_cap_rank<=10 ? 'coinns' :"pppppo"} */}
      {trimcoin.map((coin,i) => (
        <div key={coin.id} className={`${Number(coin.price_change_percentage_24h)>=0? "go":"lo"}   w-full overflow-hidden h-[7vh] px-10 py-2 my-[10px] flex justify-between items-center`}>
          <div id="details" className='flex relative overflow-visible items-center justify-between h-full w-[20%]'>
            <div onClick={()=>handlefav(coin)} className='absolute left-[-45px]'>< Msvg col={retcol.includes(coin.market_cap_rank)?"yellow":"white"}/></div>
            <img src={coin.image} className='imgx absolute h-[110%]'></img>
            <div className='qqss translate-x-[90px]'>{coin.name}<div className='symbol'>({coin.symbol})</div></div>
          </div>
          <div>{`${currs == "EUR" ? "€" : currs == "INR" ? "₹" : "$"}`}{String(coin.current_price).length >6 ? formater(String(coin.current_price).slice(0,7)) : formater(coin.current_price)}</div>
          <div className='coincap'>{`${currs == "EUR" ? "€" : currs == "INR" ? "₹" : "$"}`}{formater(String(coin.market_cap))}</div>
          <div className={Number(coin.price_change_percentage_24h)>0 ? `text-green-500`:`text-red-500`}>{Number(coin.price_change_percentage_24h)>0 ?  String(coin.price_change_percentage_24h).slice(0,4):String(coin.price_change_percentage_24h).slice(0,5)}</div>
        </div>
      ))}
    </div>
  )
}
