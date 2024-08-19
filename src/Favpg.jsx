import React from 'react'
import { useEffect,useState } from 'react';

export default function Favpg({favdata,favshow,coins,getfavs,currs}){
  let ppp = 5;
  const [pg,crntpg] = useState(1)
  const [lst,setlst] = useState(pg*ppp)  
  const [fst,setfst] = useState(pg*ppp -ppp)  
  let trimcoin = favdata.slice(fst,lst)
  let pgsnum = [1]
  for(let i=1;i<favdata.length/ppp;i++){
    pgsnum.push(i+1)
  }
  
  const handlepg = (e) => {
    crntpg(Number(e.target.textContent));
  }
  useEffect(()=>{
    setlst(pg*ppp) 
    setfst(pg*ppp -ppp) 
    trimcoin = favdata.slice(fst,lst)
  },[pg])

  getfavs(favdata)

  return (
    <div className='w-full h-[100vh] relative   gap-10 px-[200px] favgp'>
        <div id="pgicont" className='absolute left-[50%] text-center  w-[400px] min-h-[40px] translate-x-[-50%] bottom-[40px] nnn'>
        {pgsnum.map((ll)=>{
          return <div key={ll} id={`pgbox${ll}`} onClick={handlepg} className={`${pg===ll ? "bg-green-600 ":" bg-gray-600 "} pgbox mx-[2px] rounded-full overflow-hiddentext-center nnn `}>{ll}</div>
        })}
      </div>
        <button onClick={favshow} className='favss favbtn absolute h-[40px] w-[160px] rounded-xl px-5  py-2 top-[-90px] right-[20%] bg-blue-500'>Favourites</button>
        {trimcoin.map((q)=>{return <div className={`h-[200px] my-5   ${Number(coins[q-1].price_change_percentage_24h)>=0? "so":"to"}  bg-black flex items-center justify-center w-full rounded-xl`}>
          <img src={coins[q-1].image} className='imgx  h-[250px]'></img>
          <div className='text-3xl font-[400]'>{coins[q-1].name}({coins[q-1].symbol})</div>
          <div className='text-xl font-[400]'>{currs == "EUR" ? "€" : currs == "INR" ? "₹" : "$"}{coins[q-1].current_price}</div>
          <div className='text-xl font-[400]'>{coins[q-1].price_change_percentage_24h}%</div>
          <div className='text-xl font-[400]'>{currs == "EUR" ? "€" : currs == "INR" ? "₹" : "$"}{coins[q-1].market_cap}</div>
          <div className='text-xl font-[400]'>{currs == "EUR" ? "€" : currs == "INR" ? "₹" : "$"}{coins[q-1].total_volume}</div>
        </div>})}
    </div>
  )
}
