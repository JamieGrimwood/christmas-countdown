import { useEffect, useRef, useState } from 'preact/hooks';
import Snowfall from 'react-snowfall';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import * as ackeeTracker from 'ackee-tracker';

import Elf from './Components/Elf';

export function App() {
    const songSelectionId = useRef("ab67616d0000b273a846d54ce684aff97bcaf255");
    const songSelectionName = useRef("Ronettes - Sleigh Bells (PhatCap! Trap Remix)");
    const song = useRef();
    const songId = useRef();
    const snowStorm = useRef(false);
    //const instance = useRef();

    const [showCookiePopup, setShowCookiePopup] = useState(false)
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [days, setDays] = useState(0);

    const getTime = () => {
        const countDownDate = new Date("Dec 25, 2024 00:00:00").getTime();
        const now = new Date().getTime();
        const timeleft = countDownDate - now;

        const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        if (seconds === 0) {
            document.getElementById('santa').classList.remove('flier-santa-nofly')
            document.getElementById('santa').classList.add('flier-santa')
            setTimeout(() => {
                document.getElementById('santa').classList.remove('flier-santa')
                document.getElementById('santa').classList.add('flier-santa-nofly')
            }, 15000)
        }

        return ({ seconds, minutes, hours, days })
    }

    useEffect(() => {
        const { seconds, minutes, hours, days } = getTime()
        setSeconds(seconds)
        setMinutes(minutes)
        setHours(hours)
        setDays(days)

        const acknowledged = localStorage.getItem("acknowledgedCookies")
        if (window.parent === window) if (acknowledged != "true") setShowCookiePopup(true)

        /*
        instance.current = ackeeTracker.create('https://ackee.jmgcoding.com', {
            ignoreOwnVisits: false,
            detailed: true
        })
        instance.current.record('3e60d19e-0c36-4b00-883b-0763e9a393d3')
        */

        const id = setInterval(() => {
            const { seconds, minutes, hours, days } = getTime()
            setSeconds(seconds)
            setMinutes(minutes)
            setHours(hours)
            setDays(days)
        }, 1000)

        return () => {
            clearInterval(id)
        }
    }, [])

    const onSongChange = (e) => {
        songSelectionId.current = e.target.value
        songSelectionName.current = e.target.options[e.target.selectedIndex].innerHTML
        setTimeout(() => {
            playMusic()
        }, 10)
    }

    const playMusic = (e) => {
        //instance.current.action('08801ee5-f436-4abe-97c5-a667ca267529', { key: 'Click', value: 1 })
        if (e) e.preventDefault()
        const audio = document.getElementById("audio")
        audio.src = `${songSelectionId.current}.mp3`
        audio.load()
        audio.currentTime = 0;
        audio.play()
        song.current = songSelectionName.current
        songId.current = songSelectionId.current
    }

    const stopMusic = (e) => {
        if (e) e.preventDefault()
        song.current = null
        songId.current = null
        const audio = document.getElementById("audio")
        audio.pause()
        audio.currentTime = 0;
    }

    useEffect(() => {
        const audio = document.getElementById("audio")
        audio.addEventListener("ended", function () {
            audio.currentTime = 0
            audio.src = ""
            song.current = null
            songId.current = null
        });
    }, [])

    const activateSnowStorm = () => {
        //instance.current.action('f178697c-0303-41c5-a14f-8822784fc5cc', { key: 'Click', value: 1 })
        if (snowStorm.current === false) {
            toast.success('SNOW BLIZZARD ACTIVATED!', {
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            snowStorm.current = true
            setTimeout(() => {
                snowStorm.current = false
            }, 6000)
        }
    }

    const acknowledgedCookies = () => {
        //instance.current.action('aa29eb3a-23c5-4fcc-91ee-641480c42f81', { key: 'Click', value: 1 })
        localStorage.setItem("acknowledgedCookies", "true")
        setShowCookiePopup(false)
    }

    return (
        <>
            <Snowfall />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: snowStorm.current ? 1 : 0 }}
                transition={{ duration: 3 }}
            >
                <Snowfall snowflakeCount={2000} />
            </motion.div>
            {/*
            <div className="fixed top-10 left-1/2 transform -translate-x-1/2 mt-4 z-50 card bg-neutral text-neutral-content">
                <div className="card-body">
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-red-500 to-yellow-500">
                        countdown.jmgcoding.com
                    </p>
                </div>
            </div>
            */}
            <ul class="lightrope">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            {showCookiePopup &&
                <div className="fixed bottom-10 right-10 z-50 card w-80 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-md">Cookies!</h2>
                        <p className="text-xs">By using this website, you accept that we use cookies to improve your experience, and make other people's better.</p>
                        <p className="text-xs underline font-bold">We are not using them to track you!</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-default btn-sm" onClick={() => acknowledgedCookies()}>Okay, cool!</button>
                        </div>
                    </div>
                </div>
            }
            <div id="santa" className="flier-santa-nofly"><img src="/santa.png" width="500" height="200" /></div>
            <div className="flier-snowman"><img src="/snowman.jpg" width="200" height="200" draggable="false" onClick={() => activateSnowStorm()} /></div>
            <div className="flier-snowman"><img src="/snowman.jpg" width="200" height="200" draggable="false" onClick={() => activateSnowStorm()} /></div>
            <Elf />
            <img src="tree.gif" width="250" height="250" className="fixed bottom-0 left-0 translate-y-4 hidden sm:block" />
            <img src="tree.gif" width="250" height="250" className="fixed bottom-0 right-0 -translate-x-3 translate-y-4 hidden sm:block" />
            <audio id="audio" style="display: none;" />
            <motion.div
                className="box"
                initial={{ y: -200 }}
                animate={{ y: song.current ? 0 : -210 }}
                transition={{ type: "spring" }}
            >
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2">
                    <div className="card w-96 bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <img src={song.current && `${songId.current}.jpeg`} width="80" height="80" className="rounded hidden sm:block" />
                            <h2 className="card-title">Currently Playing:</h2>
                            <p>{song.current}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
            <dialog id="music_modal" className="modal">
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h1 className="text-3xl font-bold text-center underline">Music</h1>
                    {song.current &&
                        <div className="text-center m-1">
                            <p>Currently Playing: {song.current}</p>
                        </div>
                    }
                    <div className="flex items-center form-control w-full">
                        <label className="label">
                            <span className="label-text">Pick a song</span>
                        </label>
                        <select onChange={onSongChange} className="select select-bordered">
                            <option value="ab67616d0000b273a846d54ce684aff97bcaf255" selected>Ronettes - Sleigh Bells (PhatCap! Trap Remix)</option>
                            <option value="ab67616d0000b273b6a828698993ac84d4f0b1de">Bobby Helms - Jingle Bells Rock</option>
                            <option value="ab67616d0000b273119e4094f07a8123b471ac1d">Michael Bublé - Frosty The Snowman (ft. The Puppini Sisters)</option>
                            <option value="ab67616d0000b273f2d2adaa21ad616df6241e7d">Wham! - Last Christmas</option>
                            <option value="ab67616d0000b2734246e3158421f5abb75abc4f">Mariah Carey - All I Want for Christmas Is You</option>
                            <option value="ab67616d0000b273ca1cbdfd5e824b2a4bf4a43e">Michael Bublé - Let It Snow!</option>
                        </select>
                    </div>
                    <div className="flex flex-row justify-center gap-4 mt-4">
                        <button onClick={playMusic} className="btn" disabled={song.current}>Play</button>
                        <button onClick={stopMusic} className="btn" disabled={!song.current}>Stop</button>
                    </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                    <button className="cursor-default">close</button>
                </form>
            </dialog>
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-cente gap-4">
                    <h2 className="text-4xl font-bold">Time until christmas</h2>
                    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className={`${days.toString().length === 3 ? "day-countdown" : "countdown"} font-mono text-5xl`}>
                                <span style={{ "--value": days }}></span>
                            </span>
                            days
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span style={{ "--value": hours }}></span>
                            </span>
                            hours
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span style={{ "--value": minutes }}></span>
                            </span>
                            min
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span style={{ "--value": seconds }}></span>
                            </span>
                            sec
                        </div>
                    </div>
                    {/*
                    <button onClick={() => { instance.current.action('59126862-ef2e-4b8d-8c1a-c1ac86e5dc65', { key: 'Click', value: 1 });  window.music_modal.showModal() }} className="btn w-fit">
                        Music Controls
                    </button>
                    */}
                </div>
            </div>
        </>
    )
}
