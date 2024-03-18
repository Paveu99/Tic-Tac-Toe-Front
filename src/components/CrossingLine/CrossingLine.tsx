import '../styles/CrossingLine.scss';
import {useEffect, useRef} from "react";

interface Props {
    angle: string | number | undefined;
    xPosition: string | number | undefined;
    yPosition: string | number | undefined;
}

export const CrossingLine = (props: Props) => {
    const lineRefRight = useRef(null);
    const lineRefLeft = useRef(null);
    const lineRefVertical = useRef(null);
    const lineRefHorizontal = useRef(null);

    useEffect(() => {
        if (props.angle === 45) {
            const animation1__right = lineRefRight.current.querySelector('#animation1__right');
            const animation2__right = lineRefRight.current.querySelector('#animation2__right');
            const animation3__right = lineRefRight.current.querySelector('#animation3__right');
            const animation4__right = lineRefRight.current.querySelector('#animation4__right');
            animation1__right.beginElement();
            animation2__right.beginElement();
            animation3__right.beginElement();
            animation4__right.beginElement();
        } else if (props.angle === 135) {
            const animation1__left = lineRefLeft.current.querySelector('#animation1__left');
            const animation2__left = lineRefLeft.current.querySelector('#animation2__left');
            const animation3__left = lineRefLeft.current.querySelector('#animation3__left');
            const animation4__left = lineRefLeft.current.querySelector('#animation4__left');
            animation1__left.beginElement();
            animation2__left.beginElement();
            animation3__left.beginElement();
            animation4__left.beginElement();
        } else if (props.angle === 90) {
            const animation1__vertical = lineRefVertical.current.querySelector('#animation1__vertical');
            const animation2__vertical = lineRefVertical.current.querySelector('#animation2__vertical');
            animation1__vertical.beginElement();
            animation2__vertical.beginElement();
        } else if (props.angle === 0) {
            const animation1__horizontal = lineRefHorizontal.current.querySelector('#animation1__horizontal');
            const animation2__horizontal = lineRefHorizontal.current.querySelector('#animation2__horizontal');
            animation1__horizontal.beginElement();
            animation2__horizontal.beginElement();
        }

    }, [props.angle]);

    const rightLine = <svg className="animated-line-svg">
        <line
            ref={lineRefRight}
            x1="50%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="black"
            strokeWidth="10"
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
                id="animation1__right"
            />
            <animate
                attributeName="x2"
                from="50%"
                to="100%"
                dur="0.5s"
                begin="indefinite"
                fill="freeze"
                id="animation2__right"
            />
            <animate
                attributeName="y2"
                from="50%"
                to="0%"
                dur="0.5s"
                begin="indefinite"
                fill="freeze"
                id="animation3__right"
            />
            <animate
                attributeName="y1"
                from="50%"
                to="100%"
                dur="0.5s"
                begin="indefinite"
                fill="freeze"
                id="animation4__right"
            />
        </line>
    </svg>

    const leftLine = <svg className="animated-line-svg">
        <line
            ref={lineRefLeft}
            x1="50%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="black"
            strokeWidth="10"
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
                id="animation1__left"
            />
            <animate
                attributeName="x2"
                from="50%"
                to="100%"
                dur="0.5s"
                begin="indefinite"
                fill="freeze"
                id="animation2__left"
            />
            <animate
                attributeName="y2"
                from="50%"
                to="100%"
                dur="0.5s"
                begin="indefinite"
                fill="freeze"
                id="animation3__left"
            />
            <animate
                attributeName="y1"
                from="50%"
                to="0%"
                dur="0.5s"
                begin="indefinite"
                fill="freeze"
                id="animation4__left"
            />
        </line>
    </svg>

    const verticalLine = <svg className="animated-line-svg">
        <line
            ref={lineRefVertical}
            x1="50%"
            y1="50%"
            x2="50%"
            y2="50%"
            stroke="black"
            strokeWidth="10"
            strokeLinecap="round"
            className="animated-line"
        >
            <animate
                attributeName="y2"
                from="50%"
                to="0%"
                dur="0.5s"
                begin="indefinite"
                fill="freeze"
                id="animation2__vertical"
            />
            <animate
                attributeName="y1"
                from="50%"
                to="100%"
                dur="0.5s"
                begin="indefinite"
                fill="freeze"
                id="animation1__vertical"
            />
        </line>
    </svg>

    const horizontalLine = <svg className="animated-line-svg">
        <line
            ref={lineRefHorizontal}
            x1="50%"
            y1="33%"
            x2="50%"
            y2="33%"
            stroke="black"
            strokeWidth="10"
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
                id="animation1__horizontal"
            />
            <animate
                attributeName="x2"
                from="50%"
                to="100%"
                dur="0.5s"
                begin="indefinite"
                fill="freeze"
                id="animation2__horizontal"
            />
        </line>
    </svg>

    let svgElement;
    if (props.angle === 45) {
        svgElement = rightLine;
    } else if (props.angle === 135) {
        svgElement = leftLine;
    } else if (props.angle === 90) {
        svgElement = verticalLine;
    } else if (props.angle === 0) {
        svgElement = horizontalLine;
    } else {
        svgElement = null;
    }

    return (
        <div className="animated-line-container">
            {svgElement}
        </div>
    );
}