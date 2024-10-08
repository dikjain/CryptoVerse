import React from 'react'
import { useEffect,useState } from 'react';
import Dropsvg from './Dropsvg';

export default function Favpg({favdata,favshow,coins,getfavs,currs}){
  let ppp = 6;
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
        <div id="pgicont" className='absolute left-[50%] text-center  z-[10] w-[400px] min-h-[40px] translate-x-[-50%] bottom-[25px] nnn'>
        {pgsnum.map((ll)=>{
          return <div key={ll} id={`pgbox${ll}`} onClick={handlepg} className={`${pg===ll ? "bg-green-600 ":" bg-gray-600 "} pgbox mx-[2px] rounded-full overflow-hiddentext-center nnn `}>{ll}</div>
        })}
      </div>
        <button onClick={favshow} className='favss favbtn absolute h-[40px] w-[160px] rounded-xl px-5  py-2 top-[-90px] right-[20%] bg-blue-500'>Favourites</button>
        {trimcoin.map((q)=>{return <div className={`h-[90px] favitms my-5  lllk relative overflow-hidden ${Number(coins[q-1].price_change_percentage_24h)>=0? "so":"to"}   w-full rounded-xl`}>
          <div id='tophold' className=' flex items-center justify-around h-[90px] w-full relative'>
          <img src={coins[q-1].image} className='imgx mx-1 h-[100%]'></img>
          <div id="vm"  className='absolute bottom-0 '><Dropsvg></Dropsvg></div>
          <div className='text-3xl font-[400]  txt2'>{coins[q-1].name}({coins[q-1].symbol})</div>
          <div className='text-xl font-[400]'>{currs == "EUR" ? "€" : currs == "INR" ? "₹" : "$"}{coins[q-1].current_price}</div>
          </div>
          <div id='btmhold' className='w-full h-[90px]  absolute top-[90px] flex flex-col'>
          <div id="btmhold1" className='w-full h-fit relative flex items-center justify-around'>
          <div className='text-xl relative z-[100] font-[400]'>24hr change:</div>
          <div className='text-xl relative z-[100] font-[400]'>{coins[q-1].price_change_percentage_24h}%</div>
          </div>
          <div id="btmhold2"  className='w-full h-fit relative flex items-center justify-around'>
          <div className='text-xl relative z-[100] font-[400]'>Market Cap:</div>
          <div className='text-xl relative z-[100] font-[400]'>{currs == "EUR" ? "€" : currs == "INR" ? "₹" : "$"}{coins[q-1].market_cap}</div>
          </div>
          <div id="btmhold3"  className='w-full h-fit relative flex items-center justify-around'>
          <div className='text-xl relative z-[100] font-[400]'>Total Volume:</div>
          <div className='text-xl relative z-[100] font-[400]'>{currs == "EUR" ? "€" : currs == "INR" ? "₹" : "$"}{coins[q-1].total_volume}</div>
          </div>
          </div>
        </div>
      })}
    </div>
  )
}
