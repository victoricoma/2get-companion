
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const textos = [
    {
        titulos: "Aprenda Fluxos de IAS",
        textos: "Transforme processos com fluxos de IA e aumente sua produtividade!"
    },
    {
        titulos: "Artigos de Treinamento para Empresas",
        textos: "Conteúdos práticos para treinar sua equipe e impulsionar resultados."
    },
    {
        titulos: "Consultoria de Dados e Inteligência",
        textos: "Decisões seguras com consultoria em dados e inteligência de negócios."
    },
    {
        titulos: "Engenharia de Dados com Cases de Sucesso",
        textos: "Use engenharia de dados e IA para otimizar estratégias e gerar valor."
    },
]
export default function SiteIcoma() {
    return (
        <>
            <Row xs={1} md={2} className="g-2">
                {Array.from({ length: 4 }).map((_cardsite, idx) => (
                    <Col key={idx}>
                        <Card>
                            <Card.Img variant="top" src={`/site${idx+1}.png`} />
                            <Card.Body>
                                <Card.Text>
                                    <a href="https://icoma.com.br/" target="_blank" rel="noreferrer" className='text-decoration-none text-light'><strong>{textos[idx].titulos}</strong><br /></a>
                                    {textos[idx].textos}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}