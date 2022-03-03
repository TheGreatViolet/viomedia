import { NextPage } from 'next'
import React from 'react'
import { NavBar } from '../../components/index' 
import Head from 'next/head'

const Index: NextPage = () => {
  return (
    <>
        <Head>
            <title>About</title>
        </Head>

        <div className='bg-darkprime'>
            <div className='flex flex-col h-screen w-screen'>
                <NavBar />

                <div className='align-bottom flex flex-grow flex-col'>
                    <div className='pl-4 pt-4'>
                        <p className='text-lightprime text-5xl'>Viomedia</p>
                        <p className='text-lightprime text-2xl'>Developed with &lt;3 by Violet Hayes <br />
                        And licensed under the GNU GPL 3.0</p>
                    </div>

                    <div className='pl-4 mt-10'>
                        <button className='bg-darksecond text-lightprime basis-1/12 border-2 border-lightsecond p-4'
                        onClick={() => {window.location.href = "https://github.com/TheGreatViolet/viomedia"}}>
                        GitHub Repo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Index;