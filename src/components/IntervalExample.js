import React, {useState, useEffect} from 'react'

function IntervalExample() {
    const [seconds, setSeconds] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setSeconds(seconds => seconds +1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="container">
            <p>{seconds} seconds have elapsed since mounting.</p>
        </div>
    );
}

export default IntervalExample;