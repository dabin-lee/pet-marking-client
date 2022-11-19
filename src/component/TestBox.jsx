import React from 'react'
import { useState, useEffect } from 'react'

function TestBox() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log("useEffect 실행! ", count);
    });

    console.log("렌더 이전 실행!");

    const clickHandler = () => {
        setCount(count + 1);
        console.log("카운터 + 1 ", count);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={clickHandler}> + </button>
        </div>
    )
}

export default TestBox