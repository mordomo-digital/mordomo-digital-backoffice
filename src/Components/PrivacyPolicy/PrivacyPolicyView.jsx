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

                        <Panel header={<b>Disposições iniciais</b>} key="1">
                            <p>Esta Política de Privacidade abrange as informações sobre o Usuário que são coletadas quando nossos serviços são utilizados. Se você não concorda com esta política, não acesse ou use nossos serviços ou interaja com qualquer outro aspecto do nosso negócio. Coletamos as informações que você nos fornece, ao usar nossos serviços, bem como aquelas fornecidas por outras fontes.</p>
                            <p>Poderemos alterar esta Política de Privacidade a qualquer tempo, com ou sem aviso prévio. Postamos quaisquer alterações na Política de Privacidade nesta página e, se as alterações forem significativas, forneceremos um aviso mais proeminente adicionando um aviso nas páginas dos Serviços, telas de login ou enviando-lhe uma notificação por e-mail. Pedimos que periodicamente você acesse este documento, para que possa manter-se atualizado e se informar sobre qualquer alteração.</p>
                            <p>Por este documento, asseguramos e garantimos que todas as informações dos nossos Usuários não serão comercializadas ou divulgadas em nenhuma circunstância, salvo quando o compartilhamento se mostrar estritamente necessário, nos termos do item “3. Como compartilhamos informações que coletamos”. Seguimos todos os protocolos de segurança recomendados e não medimos esforços para preservá-los de qualquer desvio.</p>
                            <p>Suas informações serão armazenadas, processadas, acessadas, desde que seja respeitada a legislação brasileira, principalmente as disposições da Lei no 12.965/14 (Marco Civil da Internet) e do Decreto no 8.771/16.</p>
                            <p>Suas informações serão armazenadas, processadas, acessadas, desde que seja respeitada a legislação brasileira, principalmente as disposições da Lei no 12.965/14 (Marco Civil da Internet) e do Decreto no 8.771/16.</p>
                            <p>Nossos servidores são bem protegidos por políticas de segurança, assegurando a privacidade, autenticidade e inviolabilidade das informações, conforme determina o Marco Civil da Internet.</p>
                            <p>Os elementos e ferramentas dos mobiles (iOS e Android) são de nossa titularidade ou por nós licenciados, nos termos da legislação vigente. A utilização de qualquer elemento ou ferramenta dos Mobiles (iOS e Android) apenas poderá ser feita com nossa concordância expressa.</p>
                        </Panel>

                        <Panel header={<b>Informações que que coletamos sobre você</b>} key="2">
                            <ul>
                                <li>Informações da conta e do perfil: coletamos informações sobre você quando registra uma conta, cria ou modifica seu perfil, define preferências ou faz compras através dos nossos serviços. Você também tem a opção de adicionar um nome de exibição, foto de perfil e outros detalhes, os quais passam a integrar nossa base de dados.</li>
                                <li>Conteúdo que você fornece através da utilização dos serviços: coletamos e armazenamos o conteúdo que você posta, envia, recebe e compartilha. Este conteúdo inclui qualquer informação sobre você que você possa escolher incluir.</li>
                                <li>Informações que você fornece através de nossos canais de suporte: os serviços também incluem nosso suporte ao cliente, onde você pode optar por enviar informações sobre um problema que você está enfrentando com um serviço. Se você se designar como um contato técnico, abrir um bilhete de suporte, falar com um de nossos representantes diretamente ou de outra forma se envolver com nossa equipe de suporte, você será solicitado a fornecer informações de contato, um resumo do problema que você está enfrentando e qualquer outra documentação, capturas de tela ou informações que possam ser úteis para resolver o problema.</li>
                                <li>Informações que coletamos automaticamente quando você usa os serviços: acompanhamos certas informações sobre você quando visita e interage com qualquer um de nossos serviços. Essas informações incluem os recursos que você usa; os links em que você clica; o tipo, o tamanho e os nomes dos arquivos dos anexos que você carrega para os serviços; termos de pesquisa frequentemente usados.</li>
                                <li>Informações sobre dispositivos e conexão: coletamos informações sobre seu computador, telefone, tablet ou outros dispositivos que você usa para acessar os serviços. Essas informações do dispositivo incluem seu tipo de conexão e configurações quando você instala, acessa, atualiza ou usa nossos serviços. Também coletamos informações através do seu dispositivo sobre seu sistema operacional, tipo de navegador, endereço IP, URLs de páginas de referring/exit, identificadores de dispositivos e dados de colisão. A quantidade dessas informações que coletamos depende do tipo e das configurações do dispositivo que você usa para acessar os serviços. Os administradores de serviços de servidor e data center podem desativar a coleta dessas informações através das configurações do administrador ou impedir que essas informações sejam compartilhadas conosco bloqueando a transmissão no nível da rede local.</li>
                                <li>Informações que recebemos de outras fontes: eventualmente, também receberemos informações sobre você a partir de serviços de terceiros, plataformas de mídia social, bancos de dados públicos e de nossos parceiros de negócios e canais. Podemos combinar essas informações com informações que coletamos através de outros meios descritos acima. Isso nos ajuda a atualizar e melhorar nossos registros, identificar novos clientes, criar publicidade mais personalizada e sugerir serviços que possam ser de seu interesse.</li>
                                <li>Outros serviços que você vincula à sua conta: recebemos informações sobre você quando um serviço de terceiros é vinculado aos nossos serviços. Por exemplo, se você criar uma conta ou entrar nos serviços usando suas credenciais do Google+, receberemos seu nome e endereço de e-mail conforme permitido pelas configurações do perfil do Google+ para autenticá- lo.</li>
                                <li>Outros Parceiros: recebemos informações sobre você e suas atividades dentro e fora dos serviços de parceiros de terceiros, como publicidade e parceiros de pesquisa de mercado que nos fornecem informações sobre seu interesse e engajamento com nossos serviços e anúncios online.</li>
                                <li>Provedores de terceiros : Podemos receber informações sobre você de provedores terceirizados de informações comerciais e fontes disponíveis publicamente (como plataformas de mídia social), incluindo endereços de correio físico, títulos de trabalho, endereços de e-mail, números de telefone, dados de intenção (ou dados de comportamento do Usuário), endereços IP e perfis de mídia social, para fins de publicidade direcionada de produtos que possam lhe interessar, fornecendo comunicações personalizadas, promoção de eventos e perfil.</li>
                            </ul>
                        </Panel>

                        <Panel header={<b>Como usamos as informações que coletamos</b>} key="3">
                            <ul>
                                <li>Usamos informações sobre você para personalizar os serviços oferecidos, processar transações, autenticar quando você fizer login, fornecer suporte ao cliente e operar, manter e melhorar os serviços.</li>
                                <li>Para pesquisa e desenvolvimento: estamos sempre procurando maneiras de tornar nossos serviços mais inteligentes, rápidos, seguros, integrados e úteis. Usamos informações e aprendizados coletivos (incluindo feedback) sobre como as pessoas usam nossos serviços para solucionar problemas, identificar tendências, uso, padrões de atividade e áreas de integração e para melhorar nossos serviços e desenvolver novos produtos, recursos e tecnologias que beneficiem nossos Usuários e o público. Analisamos e agregamos automaticamente termos de pesquisa usados com frequência para melhorar a precisão e a relevância dos tópicos sugeridos que preenchem automaticamente quando você usa o recurso de pesquisa. Em alguns casos, aplicamos esses aprendizados em nossos serviços para melhorar e desenvolver recursos semelhantes, para integrar melhor os serviços que você usa ou para fornecer-lhe insights com base em como outros usam nossos serviços. Também testamos e analisamos certos novos recursos com alguns Usuários antes de lançar o recurso para todos os Usuários.</li>
                                <li>Para comunicar com você sobre os serviços: usamos suas informações de contato para enviar comunicações transacionais via e-mail e dentro dos serviços, incluindo a confirmação de suas compras, lembrando-o de expirações de assinatura, respondendo a seus comentários, perguntas e solicitações, fornecendo suporte ao cliente e enviando-lhe avisos técnicos, atualizações, alertas de segurança e mensagens administrativas. Também fornecemos comunicações personalizadas com base em sua atividade e interações conosco</li>
                                <li>Para comercializar, promover e impulsionar o engajamento com os serviços: usamos suas informações de contato e informações sobre como você usa os serviços para enviar comunicações promocionais que podem ser de interesse específico para você, inclusive por e-mail e exibindo anúncios do Mordomo Digital em sites e aplicativos de outras empresas</li>
                                <li>Suporte ao cliente: usamos suas informações para resolver problemas técnicos que você encontra, para responder aos seus pedidos de assistência, para analisar as informações de acidentes e para reparar e melhorar os serviços. Quando você nos dá permissão expressa para fazê-lo, compartilhamos informações com um especialista de terceiros com o propósito de responder a solicitações relacionadas ao suporte.</li>
                                <li>Para sua segurança: usamos informações sobre você e seu uso dos serviços para verificar contas e atividades, detectar, prevenir e responder a incidentes de segurança potenciais ou reais e monitorar e proteger contra outras atividades maliciosas, enganosas, fraudulentas ou ilegais, incluindo violações das políticas de uso e privacidade.</li>
                                <li>Para proteger nossos legítimos interesses comerciais e direitos legais: quando exigido por lei ou onde acreditamos ser necessário proteger nossos direitos legais, interesses e interesses de terceiros, usamos informações sobre você em relação a reivindicações legais, conformidade, normas e auditorias e divulgações relacionadas com a aquisição, fusão ou venda de um negócio.</li>
                                <li>Com o seu consentimento: usamos informações sobre você, mediante consentimento prévio, para algum outro propósito específico não listado acima. Por exemplo, podemos publicar depoimentos ou contar histórias de clientes em destaque para promover os serviços, com sua permissão.</li>
                            </ul>
                        </Panel>

                        <Panel header={<b>Como compartilhamos informações que coletamos</b>} key="4">
                            <ul>
                                <li>Provedores de serviços: trabalhamos com provedores de serviços de terceiros para fornecer desenvolvimento de sites e aplicativos, hospedagem, manutenção, backup, armazenamento, infraestrutura virtual, processamento de pagamentos, análise e outros serviços para nós, o que pode exigir que eles acessem ou usem informações sobre você. Se um provedor de serviços precisar acessar informações sobre você para executar serviços em nosso nome, eles o fazem sob instruções atentas de nós, incluindo procedimentos apropriados de segurança e confidencialidade projetados para proteger suas informações.</li>
                                <li>Compartilhamento com terceiros: compartilhamos informações com terceiros que nos ajudam a operar, fornecer, melhorar, integrar, personalizar, apoiar e comercializar nossos serviços.</li>
                                <li>Compartilhamento com empresas afiliadas: compartilhamos informações que coletamos com empresas afiliadas e, em alguns casos, com potenciais afiliados. As empresas afiliadas são empresas próprias ou operadas por nós. As proteções desta política de privacidade se aplicam às informações que compartilhamos nestas circunstâncias.</li>
                                <li>Venda das informações: Não vendemos, sob hipótese alguma, informações sobre você para anunciantes ou outros terceiros.</li>
                            </ul>
                        </Panel>

                        <Panel header={<b>Como armazenamos e protegemos informações que coletamos</b>} key="5">
                            <ul>
                                <li>Os dados pessoais que você informar serão criptografados ao serem armazenados em nosso banco de dados, que é reservado e com acesso restrito. Nossos servidores são bem protegidos por políticas de segurança, assegurando a privacidade, autenticidade e inviolabilidade das informações.</li>
                                <li>Embora implementemos salvaguardas projetadas para proteger suas informações, nenhum sistema de segurança é impenetrável e devido à natureza inerente da Internet, não podemos garantir que as informações durante a transmissão pela Internet ou enquanto armazenadas em nossos sistemas ou de outra forma sob nossos cuidados, estejam absolutamente seguras de intrusão por outros.</li>
                                <li>Mantemos as informações coletadas por tempo razoável, que pode mudar de acordo com o tipo da informação. A partir de certo tempo, vamos excluir ou desidentificar suas informações ou, se isso não for possível (por exemplo, porque as informações foram armazenadas em arquivos de backup), então armazenaremos suas informações com segurança e as isolaremos de qualquer uso adicional até que a exclusão seja possível.</li>
                                <li>Informações da conta: retemos as informações da sua conta enquanto ela estiver ativa e um período razoável depois disso, possibilitando a reativação da conta caso você decida voltar a utilizar os serviços. Também mantemos algumas de suas informações, conforme necessário, para cumprir nossas obrigações legais, para resolver disputas, para fazer cumprir nossos acordos, apoiar operações comerciais e continuar a desenvolver e melhorar nossos serviços. Quando retemos informações para melhoria e desenvolvimento de serviços, tomamos medidas para eliminar informações que diretamente o identificam, e só usamos as informações para descobrir insights coletivos sobre o uso de nossos serviços, não para analisar especificamente características pessoais sobre você.</li>
                                <li>Informações de marketing: se você optou por receber e-mails de marketing de nós, reteremos informações sobre suas preferências de marketing por um período razoável de tempo a partir da data em que você manifestou interesse pela última vez em nossos serviços, como quando você abriu um e-mail nosso pela última vez ou deixou de usar sua conta.</li>
                            </ul>
                        </Panel>

                        <Panel header={<b>Como acessar e controlar suas informações</b>} key="6">
                            <ul>
                                <li>Você tem o direito de solicitar, através do e-mail suportemordomodigital@gmail.com, uma cópia de suas informações, de se opor ao uso de suas informações (inclusive para fins de marketing), solicitar a exclusão ou restrição de suas informações ou solicitar suas informações em um formato eletrônico estruturado.</li>
                                <li>Acesso e atualização das suas informações: você pode atualizar suas informações de perfil dentro das configurações do seu perfil e modificar o conteúdo que contenha informações sobre você usando as ferramentas de edição associadas a esse conteúdo.</li>
                                <li>Exclusão de informações: nossos serviços e documentação relacionada dão a você a capacidade de excluir a maioria das informações. Por favor, note, no entanto, que podemos precisar reter certas informações para fins de manutenção de registros, para concluir transações ou para cumprir com nossas obrigações legais.</li>
                                <li>Solicite que paremos de usar suas informações: em alguns casos, você pode nos pedir para parar de acessar, armazenar, usar e processar suas informações onde você acredita que não temos os direitos apropriados para fazê-lo. Por exemplo, se você acredita que uma conta de serviços foi criada para você sem a sua permissão ou você não é mais um Usuário ativo, você pode solicitar que excluamos sua conta conforme previsto nesta política. Quando você nos deu o consentimento para usar suas informações para um propósito limitado, você pode entrar em contato conosco para retirar esse consentimento, mas isso não afetará qualquer processamento que já tenha ocorrido no momento. Você também pode optar pelo nosso uso de suas informações para fins de marketing entrando em contato conosco, através do e-mail suportemordomodigital@gmail.com. Quando você faz tais solicitações, podemos precisar de tempo para investigar e facilitar sua solicitação. Se houver atraso ou disputa sobre se temos o direito de continuar usando suas informações, restringiremos qualquer uso adicional de suas informações até que a solicitação seja honrada ou a disputa seja resolvida</li>
                                <li>Desative sua conta: se você não deseja mais usar nossos serviços poderá desativar sua conta nas configurações da conta. Por favor, esteja ciente de que desativar sua conta não necessariamente exclui todas suas informações do nosso banco de dados.</li>
                            </ul>
                        </Panel>

                        <Panel header={<b>Disposições finais</b>} key="7">
                            <p>Os serviços não são direcionados àqueles com idade abaixo da faixa etária indicada na plataforma de download do aplicativo. Não coletamos informações pessoais conscientemente destas pessoas. Se tomarmos conhecimento de que uma pessoa com idade abaixo da faixa etária indicada nos forneceu informações pessoais, tomaremos medidas para excluir essas informações. Se você tomar conhecimento, por favor entre em contato com a equipe de suporte apropriada.</p>
                            <p>Em matérias não regulamentadas pela Política de Privacidade, aplicam-se as disposições da lei brasileira geralmente aplicável, em especial o Código Civil e as leis relacionadas à prestação de serviços digitais e proteção dos dados.</p>
                            <p>Fica eleito o Foro da Comarca de Maceió para dirimir questões que porventura se originem do presente contrato, com renúncia de qualquer outro, por mais privilegiado que seja.</p>
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