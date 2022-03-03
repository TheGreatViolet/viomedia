import next, { NextPage } from 'next';
import React, { useState } from 'react';
import * as filereader from '../functions/files';
import { address } from "ip";
import { NavBar } from '../components/';
import Head from 'next/head';

interface Props {
    filelist: Array<string>;
    ipaddr: string;
}

const Index: NextPage<Props> = ({ filelist, ipaddr }) => {
    let [activeMedia , setMedia] = useState(<></>)

    return (
        <>
            <Head>
                <title>Viomedia</title>
            </Head>

            <div className='bg-darkprime'>
                <div className='flex flex-col h-screen w-screen'>
                    <NavBar></NavBar>

                    <div className='align-bottom flex flex-grow'>
                        <div className='px-4 bg-darksecond w-1/5'>
                            <ul>
                                {filelist.map((file: string, index: any): JSX.Element => {
                                    return <button className='text-lightprime' key={ index } onClick={() => {
                                        const splitarray = file.split('.');
                                        const fileExt = splitarray[1];
                                        
                                        switch (fileExt) {
                                            case "mp4": case "webm": case "ogg":
                                                setMedia((
                                                    <video controls>
                                                        <source src={`/media/${file}`} type={`video/${fileExt}`}></source>
                                                    </video>
                                                ))
                                                break

                                            case "apng": case "gif": case "ico": case "cur": case "jpg": case "jpeg": case "png": case "svg":                        
                                                setMedia(
                                                    <img src={`/media/${file}`}></img>
                                                )
                                                break

                                            case "mp3": case "wav":
                                                let typetag;
                                                if (fileExt === 'mp3') {typetag = 'audio/mpeg';} else typetag = `audio/${fileExt}`;
                                                setMedia(
                                                    <audio controls>
                                                        <source src={`/media/${file}`} type={typetag}></source>
                                                    </audio>
                                                )
                                                break

                                            default:
                                                break
                                        }
                                    }}>{ file }</button>
                                })}
                            </ul>
                        </div>

                        <div id='media-area' className='w-4/5'>{ activeMedia }</div>
                    </div>
                </div>
            </div>
        </>     
    )
}    

Index.getInitialProps = async () => {
    filereader.checkOptions();
    filereader.refreshFileList();
    const filelist: Array<string> = filereader.loadFileList();
    const ipaddr: string = address();
    return { filelist, ipaddr }
}

export default Index;