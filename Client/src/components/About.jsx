import salchis from '../images/salchis.jpg';


const About = () => {
    return (
        <div className='about'>
            <div>
                <h2>Mi integrador Rick and Morty</h2>
                <br />
                <p>Maira Zamer: 25 años, emprendedora coso lenceria femenina</p>
                <br />
                <p><ol className='not-style'>Me gusta:
                    <li>El mate🧉</li>
                    <li>Jueguitos🎮</li>
                    <li>Leer📚</li>
                    <li>Coser🧵</li>
                    <li>La musica🎵</li>
                </ol></p>
                <br />
                <p>Con mis salchis estamos trabajando y estudiando muy duro❤️</p>
            </div>
            <div>
                <img style={{ borderRadius: "50%", padding: "5%" }} src={salchis} width={400} height={400} />
            </div>
        </div>
    )
}


export default About;