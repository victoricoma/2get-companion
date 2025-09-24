import anuncio1 from "/aguadecheiro.png";
import anuncio2 from "/atuia.png";
import anuncio3 from "/babykids.png";
import anuncio4 from "/barralimpa.png";
import anuncio5 from "/bussola.png";
import anuncio6 from "/chaveiromatao.png";
import anuncio7 from "/ferrari.png";
import anuncio8 from "/kelvinland.png";
import anuncio9 from "/mariaflor.png";
import anuncio10 from "/naildesigner.png";
import anuncio11 from "/oficinadamoda.png";
import anuncio12 from "/oliveira.png";
import anuncio13 from "/outlet.png";
import anuncio14 from "/pricanetas.png";
import anuncio15 from "/sincronia.png";
import anuncio16 from "/tamiresmoraes.png";
import anuncio18 from "/anuncioana.png";

import Carousel from 'react-bootstrap/Carousel';

export default function Carrossel() {
    return (
        <>
            <Carousel data-bs-theme="dark" className="p-2">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio1}
                        alt="First slide"
                    />
                </Carousel.Item>
                
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio2}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio3}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio4}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio5}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio6}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio7}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio8}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio9}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio10}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio11}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio12}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio13}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio14}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio15}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio16}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={anuncio18}
                        alt="First slide"
                    />
                </Carousel.Item>

            </Carousel>
        </>
    );
}