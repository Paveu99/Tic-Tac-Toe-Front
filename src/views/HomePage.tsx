import '../components/styles/HomePage.scss';

export const HomePage = () => {
    return <div className='container projects'>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <img className="img-for-title" src="public/circle-x.svg" alt=""/>
            <h1 className="title-of-app">Tic tac toe</h1>
            <p className="desc-of-app">
                Enjoy the timeless fun of TicTacToe with friends on the same device! Track your games, view your stats,
                and relive every victory with TicTacToe Duo.
                <div className="grid-title">
                    <div className="grid-title__item">
                        <strong>Two-Player Fun:</strong><p>Play head-to-head with a friend on the same phone, anytime, anywhere.</p>
                    </div>
                    <div className="grid-title__item">
                        <strong>Sleek Design:</strong>
                        <p>Enjoy a user-friendly interface that makes playing easy and enjoyable
                            for all ages.</p>
                    </div>
                    <div className="grid-title__item">
                        <strong>Game History:</strong>
                        <p>Every match is recorded in our in-app database, allowing you to review
                            past games and analyze your performance.</p>
                    </div>
                    <div className="grid-title__item">
                        <strong>Score Tracking: </strong>
                        <p>Keep track of your wins and losses, and see who truly reigns supreme in your
                            TicTacToe battles.</p>
                    </div>
                </div>
            </p>
        </div>
        <div className="overlay"></div>
    </div>
}