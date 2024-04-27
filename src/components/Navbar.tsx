import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import moment from 'moment'

//apis
import {getSearchLocations} from '../api/getSearchLocations'

//icons
import {FiSearch} from 'react-icons/fi'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {HiOutlineUser} from 'react-icons/hi'
import {AiOutlineBars} from 'react-icons/ai'
import {BsFillBookmarkPlusFill, BsFillBookmarkCheckFill} from 'react-icons/bs'

const Navbar = ({side, setSide}) => {
  const [searchbox, setSearchbox] = useState(false)
  const [search, setSearch] = useState('')
  
  const {isLoading, data:locations, isError, error, refetch} = useQuery('search-locations',()=> getSearchLocations(search),
  {
    refetchOnWindowFocus: false,
    enabled: false,
  })

  useEffect(()=>{
    
    const timer = setTimeout(() => {
      if(search.length>0){
        refetch()
      }
    }, 500)

    return () => clearTimeout(timer)
  },[search])

  const saveLocation = (city,country) =>{
    const savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || []
    let status = false
    if(savedLocations.length >0){
      savedLocations.forEach(location=>{
        if(location.city === city){
          status = true
        }

      })
    }
    if(status === false){
      savedLocations.push({
      city: city,
      country: country
    })
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations))
    refetch()
    }
    
  }
  
  const checkSaved = (city) =>{
    const savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || []
    let status = false
    if(savedLocations.length >0){
      savedLocations.forEach(location=>{
        if(location.city === city){
          status = true
        }

      })
    }
    return status
  }

  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b bg-white border-slate-100/70 sticky z-50 top-0'>
        <div className='mr-12 flex items-center '>
            <button onClick={()=>setSide(!side)} className='hidden md:block mr-4 p-2 w-10 h-10 rounded-md active:text-sky-500 active:bg-sky-200 bg-sky-100 text-sky-400 text-2xl font-bold'><AiOutlineBars /></button>
            <div>
            <h1 className='text-lg font-bold'>{moment().format('MMMM YYYY')}</h1>
            <p className='text-sm font-semibold text-gray-400'>{moment().format('dddd')}, {moment().format('MMM DD YYYY')}</p>

            </div>
        </div>
        <div className='flex items-center mt-2 md:mt-0 py-1 px-4 bg-gray-100 rounded-md text-gray-500 flex-grow relative'>
            <span className='text-xl mr-1'>
            <FiSearch />

            </span>
            <input onChange={(e)=>{
              setSearch(e.target.value)              
              }} className='py-1 px-2 bg-inherit outline-none flex-grow' type="search" value={search} placeholder='Search Location Here' />
            <div className={`${search.length>0 ? 'grid' : 'hidden'} gap-2 absolute left-0 bottom-[-.5rem] translate-y-[100%] bg-gray-100 border border-white w-full rounded-md p-2 max-h-80 overflow-y-hidden hover:overflow-y-scroll `}>
              {locations && locations.length>0 && locations.map(location=>(
                <div key={location.id} className='flex items-center justify-between bg-white rounded-md py-2 px-4'>
                <div className='font-semibold'>
                  <h2 className=''>{location.name}</h2>
                <p className='text-sm text-gray-400'>{location.country}</p>
                </div>
                <div className='flex items-center'>
                  {checkSaved(location.name)? (
                    <button className='flex items-center py-2 px-4 text-gray-100 rounded-md gap-2 bg-sky-300 '
                    >Saved <BsFillBookmarkCheckFill /></button>
                  ):(
                    <button className='flex items-center py-2 px-4 text-gray-100 rounded-md gap-2 bg-sky-400 hover:bg-sky-500'
                   onClick={()=>saveLocation(location.name, location.country)}><BsFillBookmarkPlusFill /> Save</button>
                  )}
                </div>
              </div>
              ))}
              
            </div>
        </div>
        <div className='text-xl text-gray-500 hidden md:flex items-center  mx-4'>
            <button className='flex items-center justify-center p-2 w-10 h-10 rounded-md mr-4 bg-gray-100 hover:bg-sky-100 hover:text-sky-400'><IoMdNotificationsOutline /></button>
            <button className='flex items-center justify-center p-2 w-10 h-10 rounded-md bg-gray-100 hover:bg-sky-100 hover:text-sky-400'><HiOutlineUser /></button>
        </div>
    </div>
  )
}

export default Navbar