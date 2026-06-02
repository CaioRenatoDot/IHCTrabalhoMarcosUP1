import LegalPageLayout from '../components/legal/LegalPageLayout.jsx'

const chips = ['Projeto acadêmico de IHC', 'Uso educativo e informativo', 'Não substitui consulta médica']

function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <LegalPageLayout
        title="Termos de Uso"
        subtitle="Conheça as regras de uso da plataforma RiskCare, seus limites e as responsabilidades de quem acessa o sistema."
        chips={chips}
        updatedLabel="Atualizado: Junho de 2026"
        summaryText="O RiskCare é um projeto acadêmico voltado à conscientização sobre o câncer de mama. Os resultados exibidos são estimativas orientativas, baseadas nas informações fornecidas pelo usuário e em referências científicas e públicas."
        calloutTitle="Aviso importante"
        calloutText="O RiskCare não realiza diagnóstico médico. Em caso de sintomas, dúvidas ou preocupação com a saúde, procure atendimento profissional."
      >
        <section className="legal-card">
          <span className="legal-card-num">1</span>
          <h2>Introdução</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            Estes Termos de Uso regulam a utilização da plataforma RiskCare. Ao acessar ou
            utilizar o sistema, você concorda com as condições aqui descritas.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">2</span>
          <h2>Natureza do projeto e finalidade</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            O RiskCare é um projeto acadêmico desenvolvido no contexto da disciplina de
            Interação Humano-Computador. Ele foi criado para fins educativos, informativos e de
            conscientização, não se tratando de um produto comercial nem de um serviço de saúde
            regulamentado.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">3</span>
          <h2>Não substitui consulta médica</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            As informações e os resultados apresentados pela plataforma têm caráter
            exclusivamente informativo e educativo. Eles não constituem diagnóstico, prognóstico,
            prescrição ou recomendação médica de qualquer natureza.
          </p>
          <p>
            Em situações de dúvida, sintoma ou urgência, a orientação adequada é buscar
            atendimento com profissional de saúde qualificado.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">4</span>
          <h2>Uso permitido e responsabilidade do usuário</h2>
          <div className="legal-divider" />
          <p className="no-indent">Ao utilizar a plataforma, você assume a responsabilidade por:</p>
          <ul className="legal-list">
            <li>Fornecer informações verdadeiras, completas e conscientes.</li>
            <li>Não utilizar a plataforma como substituta de atendimento clínico, psicológico ou de emergência.</li>
            <li>Não compartilhar credenciais de acesso com terceiros, quando houver cadastro.</li>
            <li>Não tomar decisões médicas com base exclusiva nos resultados gerados pela plataforma.</li>
          </ul>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">5</span>
          <h2>Limitação de responsabilidade</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            O RiskCare, seus mantenedores e participantes não se responsabilizam por decisões,
            ações ou omissões baseadas no uso da plataforma. O sistema é fornecido "como está",
            sem garantias de precisão, disponibilidade contínua ou adequação a propósitos
            específicos.
          </p>
          <p>
            Os resultados podem variar conforme a qualidade das informações inseridas e as
            limitações das bases de referência utilizadas no projeto.
          </p>
        </section>

        <section className="legal-card">
          <span className="legal-card-num">6</span>
          <h2>Alterações destes termos</h2>
          <div className="legal-divider" />
          <p className="no-indent">
            Estes Termos de Uso poderão ser alterados periodicamente para refletir mudanças no
            projeto, ajustes de funcionamento ou exigências acadêmicas. A versão mais recente
            estará sempre disponível dentro da plataforma.
          </p>
          <p>
            O uso contínuo da plataforma após a publicação da nova versão indica concordância com
            os termos atualizados.
          </p>
        </section>
      </LegalPageLayout>
    </main>
  )
}

export default TermsPage
