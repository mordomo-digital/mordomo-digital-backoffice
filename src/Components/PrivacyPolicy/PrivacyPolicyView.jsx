import React from 'react';

// Images
import icon from '../../assets/img/icon.png'
import { Collapse } from 'antd';

const { Panel } = Collapse;

const PrivacyPolicyView = (props) => {

    return (

        <div>

            <div
                style={{
                    background: 'white',
                    padding: '10px 10px 0px 10px',
                    clear: 'both',
                    height: '55px',
                }}
            >

                <img src={icon} alt='icon' style={{ 'float': 'left', borderRadius: '5px' }} width={30} />
                <div style={{ float: 'left', marginLeft: '10px' }}>
                    <div style={{ marginBottom: '-8px', fontWeight: 'bold' }}>Mordomo Digital</div>
                    <span style={{ fontSize: 10, color: 'grey' }}>Controle a rotina da sua casa na palma da mão</span>
                </div>

                <div style={{ clear: 'both' }} />
            </div>

            <div
                style={{
                    color: 'white',
                    margin: '40px 10px 10px 10px',
                }}
            >
                <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '0px' }}>Política de Privacidade</h1>
                <div style={{ color: 'white', textAlign: 'center', marginTop: '-5px' }}>Mordomo Digital</div>

                <div
                    style={{
                        maxWidth: '800px',
                        margin: 'auto',
                        marginTop: '20px',
                        textAlign: 'justify',
                    }}
                >

                    <Collapse accordion bordered={false}>

                        <Panel header={<b>Informações Gerais</b>} key="1">
                            <p>A presente Política de Privacidade contém informações sobre coleta, uso, armazenamento, tratamento e proteção dos dados pessoais dos usuários e visitantes do aplicativo Mordomo Digital, com a finalidade de demonstrar absoluta transparência quanto ao assunto e esclarecer a todos interessados sobre os tipos de dados que são coletados, os motivos da coleta e a forma como os usuários podem gerenciar ou excluir as suas informações pessoais.</p>
                            <p>Esta Política de Privacidade aplica-se a todos os usuários e visitantes do aplicativo Mordomo Digital e integra os Termos e Condições Gerais de Uso do aplicativo Mordomo Digital.</p>
                            <p>O presente documento foi elaborado em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei 13.709/18), o Marco Civil da Internet (Lei 12.965/14) (e o Regulamento da UE n. 2016/6790). Ainda, o documento poderá ser atualizado em decorrência de eventual atualização normativa, razão pela qual se convida o usuário a consultar periodicamente esta seção.</p>
                        </Panel>

                        <Panel header={<b>Como recolhemos os dados pessoais dos usuários</b>} key="2">
                            <p>Os dados pessoais do usuário e visitante são recolhidos pela plataforma da seguinte forma:</p>
                            <ul>
                                <li>Quando o usuário cria uma conta/perfil na plataforma: esses dados são os dados de identificação básicos, como e-mail e nome. A partir deles, podemos identificar o usuário e o visitante, além de garantir uma maior segurança e bem-estar às suas necessidade. Ficam cientes os usuários e visitantes de que seu perfil na plataforma estará acessível a todos demais usuários e visitantes da plataforma.</li>
                            </ul>
                        </Panel>

                        <Panel header={<b>Quais dados pessoais recolhemos</b>} key="3">
                            <p>Os dados pessoais do usuário são os seguintes:</p>
                            <ul>
                                <li>Dados para a criação da conta/perfil na plataforma: e-mail e nome.</li>
                            </ul>
                        </Panel>

                        <Panel header={<b>Para que finalidades utilizamos os dados pessoais do usuário</b>} key="4">
                            <p>Os dados pessoais do usuário coletados e armazenados pela plataforma tem por finalidade:</p>
                            <ul>
                                <li>Dados de cadastro: para permitir o acesso do usuário a determinados conteúdos da plataforma, exclusivo para usuários cadastrados.</li>
                            </ul>
                            <p>O tratamento de dados pessoais para finalidades não previstas nesta Política de Privacidade somente ocorrerá mediante comunicação prévia ao usuário, de modo que os direitos e obrigações aqui previstos permanecem aplicáveis.</p>
                        </Panel>

                        <Panel header={<b>Por quanto tempo os dados pessoais ficam armazenados</b>} key="5">
                            <p>Os dados pessoais do usuário e visitante são armazenados pela plataforma durante o período necessário para a prestação do serviço ou o cumprimento das finalidades previstas no presente documento, conforme o disposto no inciso I do artigo 15 da Lei 13.709/18.</p>
                            <p>Os dados podem ser removidos ou anonimizados a pedido do usuário, excetuando os casos em que a lei oferecer outro tratamento.</p>
                            <p>Ainda, os dados pessoais dos usuários apenas podem ser conservados após o término de seu tratamento nas seguintes hipóteses previstas no artigo 16 da referida lei:</p>
                            <ol type="I">
                                <li>cumprimento de obrigação legal ou regulatória pelo controlador;</li>
                                <li>estudo por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados pessoais;</li>
                                <li>transferência a terceiro, desde que respeitados os requisitos de tratamento de dados dispostos nesta Lei;</li>
                                <li>uso exclusivo do controlador, vedado seu acesso por terceiro, e desde que anonimizados os dados.</li>
                            </ol>
                        </Panel>

                        <Panel header={<b>Segurança dos dados pessoais armazenados</b>} key="6">
                            <p>A plataforma se compromete a aplicar as medidas técnicas e organizativas aptas a proteger os dados pessoais de acessos não autorizados e de situações de destruição, perda, alteração, comunicação ou difusão de tais dados.</p>
                            <p>Os dados relativas a cartões de crédito são criptografados usando a tecnologia "secure socket layer" (SSL) que garante a transmissão de dados de forma segura e confidencial, de modo que a transmissão dos dados entre o servidor e o usuário ocorre de maneira cifrada e encriptada.</p>
                            <p>A plataforma não se exime de responsabilidade por culpa exclusiva de terceiro, como em caso de ataque de hackers ou crackers, ou culpa exclusiva do usuário, como no caso em que ele mesmo transfere seus dados a terceiros. O site se compromete a comunicar o usuário em caso de alguma violação de segurança dos seus dados pessoais.</p>
                            <p>Os dados pessoais armazenados são tratados com confidencialidade, dentro dos limites legais. No entanto, podemos divulgar suas informações pessoais caso sejamos obrigados pela lei para fazê-lo ou se você violar nossos Termos de Serviço.</p>
                        </Panel>

                        <Panel header={<b>Compartilhamento dos dados</b>} key="7">
                            <p>O compartilhamento de dados do usuário ocorre apenas com os dados referentes a publicações realizadas pelo próprio usuário, tais ações são compartilhadas publicamente com os outros usuários.</p>
                            <p>Os dados do perfil do usuário são compartilhados publicamente em sistemas de busca e dentro da plataforma, sendo permitido ao usuário modificar tal configuração para que seu perfil não apareça nos resultados de busca de tais ferramentas.</p>
                        </Panel>

                        <Panel header={<b>Os dados pessoais armazenados serão transferidos a terceiros</b>} key="8">
                            <p>Os dados pessoais não podem ser compartilhados com terceiros.</p>
                        </Panel>

                        <Panel header={<b>Cookies ou dados de navegação</b>} key="9">
                            <p>Os cookies referem-se a arquivos de texto enviados pela plataforma ao computador do usuário e visitante e que nele ficam armazenados, com informações relacionadas à navegação no site. Tais informações são relacionadas aos dados de acesso como local e horário de acesso e são armazenadas pelo navegador do usuário e visitante para que o servidor da plataforma possa lê-las posteriormente a fim de personalizar os serviços da plataforma.</p>
                            <p>O usuário da plataforma manifesta conhecer e aceitar que pode ser utilizado um sistema de coleta de dados de navegação mediante à utilização de cookies.</p>
                            <p>O cookie persistente permanece no disco rígido do usuário e visitante depois que o navegador é fechado e será usado pelo navegador em visitas subsequentes ao site. Os cookies persistentes podem ser removidos seguindo as instruções do seu navegador. Já o cookie de sessão é temporário e desaparece depois que o navegador é fechado. É possível redefinir seu navegador da web para recusar todos os cookies, porém alguns recursos da plataforma podem não funcionar corretamente se a capacidade de aceitar cookies estiver desabilitada.</p>
                        </Panel>

                        <Panel header={<b>Consentimento</b>} key="10">
                            <p>Ao utilizar os serviços e fornecer as informações pessoais na plataforma, o usuário está consentindo com a presente Política de Privacidade.</p>
                            <p>O usuário, ao cadastrar-se, manifesta conhecer e pode exercitar seus direitos de cancelar seu cadastro, acessar e atualizar seus dados pessoais e garante a veracidade das informações por ele disponibilizadas.</p>
                        </Panel>

                        <Panel header={<b>Alteração dessa Política de Privacidade</b>} key="11">
                            <p>Reservamos o direito de modificar essa Política de Privacidade a qualquer momento, então, é recomendável que o usuário e visitante revise-a com frequência.</p>
                            <p>As alterações e esclarecimentos vão surtir efeito imediatamente após sua publicação na plataforma. Quando realizadas alterações os usuários serão notificados. Ao utilizar o serviço ou fornecer informações pessoais após eventuais modificações, o usuário e visitante demonstra sua concordância com as novas normas.</p>
                            <p>Diante da fusão ou venda da plataforma à outra empresa os dados dos usuários podem ser transferidas para os novos proprietários para que a permanência dos serviços oferecidos.</p>
                        </Panel>

                    </Collapse>
                </div>

                <div style={{ height: '50px' }} />
                <div style={{ color: 'grey', fontSize: 10, textAlign: 'center' }}>
                    Copyright 2021 Oasis Treinamentos e Soluções de Organização Ltda.
                </div>
                <div style={{ height: '20px' }} />
            </div>

        </div>

    )

};

export default PrivacyPolicyView;