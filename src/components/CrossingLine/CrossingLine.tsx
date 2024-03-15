import '../styles/CrossingLine.scss';
import {useEffect, useRef} from "react";

export const CrossingLine = () => {
    const lineRef = useRef(null);

    useEffect(() => {
        const animation1 = lineRef.current.querySelector('#animation1');
        const animation2 = lineRef.current.querySelector('#animation2');
        const animation3 = lineRef.current.querySelector('#animation3');
        const animation4 = lineRef.current.querySelector('#animation4');
        animation1.beginElement();
        animation2.beginElement();
        animation3.beginElement();
        animation4.beginElement();
    }, []);

    return (
        <div className="animated-line-container">
            <svg className="animated-line-svg">
                <line
                    ref={lineRef}
                    x1="50%"
                    y1="50%"
                    x2="50%"
                    y2="50%"
                    stroke="black"
                    strokeWidth="100"
                    strokeLinecap="round"
                    className="animated-line"
                >
                    <animate
                        attributeName="x1"
                        from="50%"
                        to="0%"
                        dur="0.5s"
                        begin="indefinite"
                        fill="freeze"
                        id="animation1"
                    />
                    <animate
                        attributeName="x2"
                        from="50%"
                        to="100%"
                        dur="0.5s"
                        begin="indefinite"
                        fill="freeze"
                        id="animation2"
                    />
                    <animate
                        attributeName="y2"
                        from="50%"
                        to="0%"
                        dur="0.5s"
                        begin="indefinite"
                        fill="freeze"
                        id="animation3"
                    />
                    <animate
                        attributeName="y1"
                        from="50%"
                        to="100%"
                        dur="0.5s"
                        begin="indefinite"
                        fill="freeze"
                        id="animation4"
                    />
                </line>
            </svg>
        </div>
    );
}