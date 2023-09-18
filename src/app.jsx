import { useEffect, useState } from 'preact/hooks';
import Snowfall from 'react-snowfall';
import { motion } from 'framer-motion';

export function App() {
    const [songSelectionId, setSongSelectionId] = useState("ab67616d0000b273a846d54ce684aff97bcaf255");
    const [songSelectionName, setSongSelectionName] = useState("Ronettes - Sleigh Bells (PhatCap! Trap Remix)");
    const [song, setSong] = useState();

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
        setSongSelectionId(e.target.value)
        setSongSelectionName(e.target.options[e.target.selectedIndex].innerHTML)
    }

    const playMusic = (e) => {
        e.preventDefault()
        setSong(songSelectionName)
        const audio = document.getElementById("audio")
        audio.src = `${songSelectionId}.mp3`
        audio.load()
        audio.play()
        setSong(songSelectionName)
    }

    const stopMusic = (e) => {
        e.preventDefault()
        setSong(null)
        const audio = document.getElementById("audio")
        audio.pause()
        audio.currentTime = 0;
    }

    useEffect(() => {
        const audio = document.getElementById("audio")
        audio.addEventListener("ended", function () {
            audio.currentTime = 0
            audio.src = ""
            setSong(null)
        });

        let played = false
        const events = ["click"]
        events.forEach((eventName) => {
            window.addEventListener(eventName, () => {
                if (!played) {
                    try {
                        const e = {
                            preventDefault: () => null
                        }
                        playMusic(e)
                        played = true;
                    } catch (e) {
                        console.warn(e.message);
                    }
                }
            });
        });
    }, [])

    return (
        <>
            <Snowfall />
            <div className="flier-snowman"><img src="/snowman.jpg" width="200" height="200" /></div>
            <div className="flier-snowman"><img src="/snowman.jpg" width="200" height="200" /></div>
            <audio id="audio" style="display: none;" />
            <motion.div
                className="box"
                initial={{ y: -200 }}
                animate={{ y: song ? 0 : -200 }}
                transition={{ type: "spring" }}
            >
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2">
                    <div className="card w-96 bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Currently Playing:</h2>
                            <p>{song}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
            <dialog id="music_modal" className="modal">
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h1 className="text-3xl font-bold text-center underline">Music</h1>
                    {song &&
                        <div className="text-center m-1">
                            <p>Currently Playing: {song}</p>
                        </div>
                    }
                    <div className="flex items-center form-control w-full">
                        <label className="label">
                            <span className="label-text">Pick a song</span>
                        </label>
                        <select onChange={onSongChange} className="select select-bordered">
                            <option value="ab67616d0000b273a846d54ce684aff97bcaf255">Ronettes - Sleigh Bells (PhatCap! Trap Remix)</option>
                        </select>
                    </div>
                    <div className="flex flex-row justify-center gap-4 mt-4">
                        <button onClick={playMusic} className="btn" disabled={song}>Play</button>
                        <button onClick={stopMusic} className="btn" disabled={!song}>Stop</button>
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
