import LegalPageLayout from '../components/legal/LegalPageLayout.jsx'

const chips = ['Privacidade e proteção de dados', 'Uso acadêmico e educativo', 'Transparência no tratamento']

function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <LegalPageLayout
        title="Política de Privacidade"
        subtitle="Entenda quais dados podem ser coletados no RiskCare, como eles podem ser usados e quais cuidados são adotados para proteger suas informações."
        chips={chips}
        updatedLabel="Atualizado: Junho de 2026"
        summaryText="A privacidade é parte central do projeto. O RiskCare busca coletar apenas o necessário para funcionar, melhorar a experiência e gerar avaliações orientativas, sempre com transparência, segurança e respeito à LGPD."
        calloutTitle="Aviso importante"
        calloutText="O RiskCare não realiza diagnóstico médico. Algumas respostas podem envolver dados relacionados à saúde e, por isso, são tratadas com cuidado reforçado e apenas para a finalidade informada."
      >
        <section className="legal-card">
          <span className="legal-card-num">1</span>
          <h2>Introdução</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            O RiskCare valoriza a privacidade e a proteção dos dados dos usuários. Esta Política
            explica quais informações podem ser coletadas, como são utilizadas e quais medidas são
            adotadas para protegê-las.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">2</span>
          <h2>Dados que podem ser coletados</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            Dependendo das funcionalidades implementadas, o RiskCare poderá coletar apenas os
            dados necessários para autenticação, avaliação e melhoria da plataforma:
          </p>
          <div className="legal-subsection">
            <h3>Dados de cadastro</h3>
            <ul className="legal-list">
              <li>Nome.</li>
              <li>E-mail.</li>
              <li>Senha cadastrada pelo usuário.</li>
            </ul>
          </div>
          <div className="legal-subsection">
            <h3>Dados de utilização</h3>
            <ul className="legal-list">
              <li>Respostas fornecidas em questionários.</li>
              <li>Informações relacionadas a fatores de risco e hábitos de saúde.</li>
              <li>Histórico de avaliações realizadas.</li>
              <li>Informações básicas de perfil.</li>
            </ul>
          </div>
          <div className="legal-subsection">
            <h3>Dados técnicos</h3>
            <ul className="legal-list">
              <li>Informações de navegação e desempenho da aplicação.</li>
              <li>Registros mínimos de segurança e funcionamento, quando necessários.</li>
            </ul>
          </div>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">3</span>
          <h2>Finalidade do tratamento</h2>
          <div className="legal-divider" />
          <p className="no-indent">Os dados podem ser utilizados para:</p>
          <ul className="legal-list">
            <li>Permitir o funcionamento da plataforma.</li>
            <li>Gerar avaliações orientativas de risco.</li>
            <li>Armazenar o histórico do usuário, quando aplicável.</li>
            <li>Melhorar a experiência de uso.</li>
            <li>Corrigir falhas e aprimorar funcionalidades.</li>
            <li>Apoiar atividades acadêmicas relacionadas ao projeto.</li>
          </ul>
          <p className="no-indent">
            Os dados não são utilizados para realizar diagnósticos médicos nem para fins de
            comercialização.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">4</span>
          <h2>Base legal, dados sensíveis e transparência</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            As informações fornecidas são utilizadas exclusivamente para as finalidades descritas
            nesta política. Quando houver autenticação ou salvamento de histórico, os dados podem
            permanecer associados à conta do usuário enquanto forem necessários para o
            funcionamento da plataforma.
          </p>
          <p className="no-indent">
            Respostas de questionários e informações sobre fatores de risco podem se enquadrar
            como dados pessoais sensíveis relacionados à saúde, conforme a LGPD. Por isso, o
            tratamento é limitado ao mínimo necessário, com transparência sobre a finalidade e
            com a base legal aplicável em cada caso.
          </p>
          <p className="no-indent">
            Quando aplicável, medidas razoáveis de segurança são adotadas para reduzir riscos de
            acesso não autorizado, alteração indevida, divulgação indevida ou perda de
            informações.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">5</span>
          <h2>Uso, retenção e compartilhamento</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            Os dados são utilizados exclusivamente para as finalidades descritas nesta política e
            não são comercializados.
          </p>
          <p className="no-indent">
            Caso serviços externos sejam utilizados para hospedagem, autenticação, armazenamento
            ou monitoramento, poderão ocorrer tratamentos necessários para a operação da
            plataforma, sempre observando requisitos de segurança adequados e o mínimo necessário
            para a prestação do serviço.
          </p>
          <p className="no-indent">
            Os dados poderão permanecer armazenados enquanto forem necessários para o
            funcionamento da plataforma, para o atendimento de obrigações aplicáveis ou para fins
            acadêmicos legítimos relacionados ao projeto.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">6</span>
          <h2>Direitos do titular</h2>
          <div className="legal-divider" />
          <p className="no-indent">Quando aplicável, o usuário poderá solicitar:</p>
          <ul className="legal-list">
            <li>Confirmação da existência de tratamento.</li>
            <li>Acesso aos seus dados.</li>
            <li>Correção de informações incorretas.</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.</li>
            <li>Informações sobre compartilhamento.</li>
            <li>Revogação do consentimento, quando essa for a base legal aplicável.</li>
            <li>Revisão de decisões automatizadas, quando houver e for cabível.</li>
          </ul>
          <p className="no-indent">
            Essas funcionalidades poderão ser disponibilizadas conforme a evolução do projeto e a
            necessidade operacional da plataforma.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">7</span>
          <h2>Segurança e retenção dos dados</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            São adotadas medidas razoáveis de segurança para reduzir riscos de acesso não
            autorizado, alteração indevida, divulgação não autorizada e perda ou destruição
            acidental.
          </p>
          <p className="no-indent">
            Quando os dados não forem mais necessários, eles poderão ser excluídos ou anonimizados
            quando tecnicamente possível e dentro dos limites do projeto.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">8</span>
          <h2>Cookies e dados técnicos</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            A plataforma poderá utilizar recursos técnicos estritamente necessários ao seu
            funcionamento, como dados de navegação, sessão ou preferências básicas de interface,
            quando aplicável.
          </p>
          <p className="no-indent">
            Quando houver uso de recursos técnicos adicionais, eles serão informados de forma
            clara e compatível com a finalidade do projeto.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">9</span>
          <h2>Atualizações desta política</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            Esta Política de Privacidade poderá ser atualizada periodicamente para acompanhar
            melhorias do sistema, exigências acadêmicas ou ajustes de funcionamento.
          </p>
          <p className="no-indent">A versão mais recente estará sempre disponível dentro da plataforma.</p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">10</span>
          <h2>Contato</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento de dados
            realizado pelo RiskCare, o usuário poderá entrar em contato pelos canais oficiais
            disponibilizados pela equipe responsável pelo projeto.
          </p>
        </section>
      </LegalPageLayout>
    </main>
  )
}

export default PrivacyPage
