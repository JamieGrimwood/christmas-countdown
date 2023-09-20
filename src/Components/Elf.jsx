import { useEffect, useRef } from 'preact/hooks';
import { motion } from 'framer-motion';

export default function Elf() {
    const show = useRef(false);
    const key = useRef(0);

    const countdown = () => {
        show.current = false
        console.log(1)
        const time = (Math.floor(Math.random() * 10) + 1) * 1000
        console.log(time)
        setTimeout(() => {
            key.current = key.current + 1
            console.log(key.current)
            show.current = true
            setTimeout(() => {
                countdown()
            }, (window.innerWidth / 100) * 1000)
        }, time)
    }

    useEffect(() => {
        countdown()
    }, [])

    return (
        <motion.div
            className="box"
            initial={{ x: 100 }}
            animate={{ x: show.current ? -window.innerWidth : 100 }}
            transition={{ duration: window.innerWidth / 100, ease: "linear" }}
            style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
            }}
            key={key}
        >
            <img src="elf-walking.gif" width="100" height="100" />
        </motion.div>
    )
}
