function NavBar(): JSX.Element {
    return (
        <>
            <div className='flex-none align-top h-15 w-screen bg-accent shadow'>
                <div className='flex flex-row content-center gap-4'>
                    <div className='flex-grow block'>
                        <button className="text-lightprime p-4" 
                        onClick={() => {document.location = '/'}}>Home</button>
                        <button className="text-lightprime p-4" 
                        onClick={() => {document.location = '/settings'}}>Settings</button>
                    </div>

                    <div className="">
                        <button className="justify-end bg-darksecond text-lightprime basis-1/12 border-2 border-lightsecond p-4"
                        onClick={() => {location.reload();}}>Refresh</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar;