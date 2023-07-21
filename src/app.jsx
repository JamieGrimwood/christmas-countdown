import { useEffect, useState } from 'preact/hooks';
import Snowfall from 'react-snowfall';

export function App() {
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

  return (
    <>
      <Snowfall />
      <div className="flier-snowman"><img src="/snowman.jpg" width="200" height="200" /></div>
      <div className="flier-snowman"><img src="/snowman.jpg" width="200" height="200" /></div>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold">Time until christmas:</h2>
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
        </div>
      </div>
    </>
  )
}
