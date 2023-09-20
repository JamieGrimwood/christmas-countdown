import { useEffect, useRef, useState } from 'preact/hooks';
import Snowfall from 'react-snowfall';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import Elf from './Components/Elf';

export function App() {
    const songSelectionId = useRef("ab67616d0000b273a846d54ce684aff97bcaf255");
    const songSelectionName = useRef("Ronettes - Sleigh Bells (PhatCap! Trap Remix)");
    const song = useRef();
    const songId = useRef();
    const snowflakeCount = useRef(150);

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [days, setDays] = useState(0);

    const getTime = () => {
        const countDownDate = new Date("Dec 25, 2023 00:00:00").getTime();
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
        if (snowflakeCount.current === 150) {
            toast.success('5 SECOND SNOW BLIZZARD ACTIVATED!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            snowflakeCount.current = 2000
            setTimeout(() => {
                snowflakeCount.current = 150
            }, 5000)
        }
    }

    return (
        <>
            <Snowfall snowflakeCount={snowflakeCount.current} />
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
            <div id="santa" className="flier-santa-nofly"><img src="/santa.png" width="500" height="200" /></div>
            <div className="flier-snowman"><img src="/snowman.jpg" width="200" height="200" draggable="false" /></div>
            <div className="flier-snowman"><img src="/snowman.jpg" width="200" height="200" draggable="false" /></div>
            <Elf />
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
                            <img src={`${songId.current}.jpeg`} width="80" height="80" className="rounded" />
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
                    <button onClick={() => window.music_modal.showModal()} className="btn w-fit">
                        Music Controls
                    </button>
                </div>
            </div>
        </>
    )
}
