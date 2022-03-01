import { NextPage } from "next";
import NavBar from "../../components/NavBar";
import React, { SyntheticEvent, useState } from "react";
import Head from "next/head";

const Index: NextPage = () => {
    const [setting, setSetting] = useState("");
    const [settingDat, setSettingDat] = useState("");

    const submitSettings = async (event: SyntheticEvent): Promise<void> => {
        event.preventDefault();

        const data = {
            setting: setting,
            settingDat: settingDat
        };

        const req: any = await fetch('/api/setting', {
            method: "POST",
            mode: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }) .then(res => res.json())
        .then(data => {
            const status = data['status'];

            switch (status) {
                case 'success':
                    alert('Settings saved successfully');
                    break;
                case 'nodir':
                    alert('Error: directory does not exist in home directory');
                    break;
                default:
                    alert('Error: An unknown error occured, this is most likely a bug');
            }
        })
    }

    return (
    <>
        <Head>
            <title>Settings</title>
        </Head>

        <div className="bg-darkprime">
            <div className="flex flex-col h-screen w-screen">
                <NavBar></NavBar>

                <div className="align-bottom flex flex-row flex-grow pl-16">
                    <div>
                        <form onSubmit={submitSettings}>
                            <label className="pt-4 text-lightprime text-3xl">Set a custom file path for your media</label>
                            <br></br>
                            <label className="text-lightprime text-xl">Note: Path MUST be a directory that Viomedia can access (ie: your home folder on Linux or MacOS or your user directory on Windows)
                            <br></br><br></br>Example: If my directory is ~/videos/media/example then I would input /videos/media/example</label>

                            <input
                            type="text"
                            onChange={(e) => {
                                setSettingDat(e.target.value);
                                setSetting('change-path');
                            }}
                            ></input>
                            <button className="bg-darksecond text-lightprime basis-1/12 border-2 border-lightsecond p-2" type="submit">Submit</button>
                        </form>
                    </div>

                    {/* <label className="pt-4 text-lightprime text-3xl">Set a custom file path for your media</label>
                    <br></br>
                    <label className="text-lightprime text-xl">Note: Path MUST be a directory that Viomedia can access (ie: your home folder on Linux or MacOS or your user directory on Windows)
                        <br></br><br></br>Example: If my directory is "~/videos/media/example" then I would input "/videos/media/example</label>
                    <input type="text" id="" className="ml-2"></input>
                    <button className="bg-darksecond text-lightprime basis-1/12 border-2 border-lightsecond p-2">Submit</button> */}
                </div>
            </div>
        </div>
    </>
    )
}

export default Index;