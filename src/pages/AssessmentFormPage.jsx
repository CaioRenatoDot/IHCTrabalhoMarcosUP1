import { useState } from 'react'
import '../styles/assessment-form.css'

const steps = ['Perfil', 'Histórico', 'Sintomas', 'Hormonal', 'Estilo de vida']

const symptomItems = [
  'Nódulo ou caroço palpável',
  'Mudança no formato ou tamanho',
  'Saída de líquido pelo mamilo',
  'Vermelhidão ou descamação na pele',
  'Dor persistente em uma área específica',
  'Nenhuma das opções acima',
]

const brazilianStates = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

const initialFormData = {
  fullName: '',
  age: '',
  state: '',
  cancerDiagnosis: '',
  familyBreastCancer: '',
  brcaTest: '',
  familyOvaryCancer: '',
  symptoms: ['Nenhuma das opções acima'],
  mammogram: '',
  breastPain: 0,
  hormonalContraceptive: '',
  hormoneReplacement: '',
  menarche: '',
  menopause: '',
  breastfed: '',
  physicalActivity: '',
  alcohol: '',
  smoking: '',
  diet: 0,
  bmi: '',
}

const requiredFieldsByStep = [
  ['fullName', 'age', 'state', 'cancerDiagnosis'],
  ['familyBreastCancer', 'brcaTest', 'familyOvaryCancer'],
  ['symptoms', 'mammogram'],
  ['hormonalContraceptive', 'hormoneReplacement', 'menarche', 'menopause'],
  ['physicalActivity', 'alcohol', 'smoking', 'bmi'],
]

const fieldLabels = {
  fullName: 'Informe seu nome completo.',
  age: 'Informe sua idade.',
  state: 'Selecione seu estado.',
  cancerDiagnosis: 'Marque uma opção sobre diagnóstico de câncer.',
  familyBreastCancer: 'Marque uma opção sobre histórico familiar de câncer de mama.',
  brcaTest: 'Marque uma opção sobre BRCA1 ou BRCA2.',
  familyOvaryCancer: 'Marque uma opção sobre câncer de ovário ou endométrio na família.',
  symptoms: 'Marque pelo menos uma alteração observada.',
  mammogram: 'Marque quando realizou sua última mamografia.',
  hormonalContraceptive: 'Marque uma opção sobre anticoncepcional hormonal.',
  hormoneReplacement: 'Marque uma opção sobre reposição hormonal.',
  menarche: 'Marque uma opção sobre menarca.',
  menopause: 'Marque uma opção sobre menopausa.',
  physicalActivity: 'Marque sua frequência de atividade física.',
  alcohol: 'Marque uma opção sobre consumo de bebida alcoólica.',
  smoking: 'Marque uma opção sobre tabagismo.',
  bmi: 'Marque uma opção sobre IMC.',
}

function hasValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0
  }

  return String(value).trim() !== ''
}

function AssessmentStepIndicator({ currentStep }) {
  return (
    <ol className="assessment-steps" aria-label="Etapas da avaliação">
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const status =
          index < currentStep ? 'complete' : index === currentStep ? 'current' : 'upcoming'

        return (
          <li className={`assessment-step assessment-step--${status}`} key={label}>
            <span className="assessment-step__marker" aria-hidden="true">
              {stepNumber}
            </span>
            <span className="assessment-step__label">
              {label}
              {status === 'current' ? <span className="visually-hidden"> etapa atual</span> : null}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

function FieldError({ message }) {
  if (!message) {
    return null
  }

  return (
    <p className="assessment-error" role="alert">
      {message}
    </p>
  )
}

function TextField({ error, id, label, required, ...inputProps }) {
  return (
    <label className="assessment-input" htmlFor={id}>
      <span>
        {label} {required ? <strong aria-hidden="true">*</strong> : null}
      </span>
      <input id={id} aria-invalid={Boolean(error)} {...inputProps} />
      <FieldError message={error} />
    </label>
  )
}

function SelectField({ error, id, label, options, placeholder, required, value, onChange }) {
  return (
    <label className="assessment-input" htmlFor={id}>
      <span>
        {label} {required ? <strong aria-hidden="true">*</strong> : null}
      </span>
      <select id={id} value={value} aria-invalid={Boolean(error)} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </label>
  )
}

function OptionGroup({ columns = false, error, legend, name, note, options, required, value, onChange }) {
  return (
    <fieldset className={`assessment-fieldset ${columns ? 'assessment-fieldset--columns' : ''}`}>
      <legend>
        {legend} {note ? <small>{note}</small> : null}{' '}
        {required ? <span aria-hidden="true">*</span> : null}
      </legend>

      <div className="assessment-options">
        {options.map((option) => (
          <label
            className={`assessment-option ${value === option ? 'is-selected' : ''}`}
            key={option}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(event) => onChange(event.target.value)}
            />
            <span className="assessment-option__control" aria-hidden="true" />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <FieldError message={error} />
    </fieldset>
  )
}

function CheckboxGroup({ error, legend, name, note, options, required, value, onChange }) {
  const handleChange = (option, checked) => {
    const emptyOption = 'Nenhuma das opções acima'

    if (option === emptyOption) {
      onChange(checked ? [emptyOption] : [])
      return
    }

    const nextValue = checked
      ? [...value.filter((item) => item !== emptyOption), option]
      : value.filter((item) => item !== option)

    onChange(nextValue)
  }

  return (
    <fieldset className="assessment-fieldset">
      <legend>
        {legend} {note ? <small>{note}</small> : null}{' '}
        {required ? <span aria-hidden="true">*</span> : null}
      </legend>

      <div className="assessment-options">
        {options.map((option) => {
          const isSelected = value.includes(option)

          return (
            <label className={`assessment-option ${isSelected ? 'is-selected' : ''}`} key={option}>
              <input
                type="checkbox"
                name={name}
                value={option}
                checked={isSelected}
                onChange={(event) => handleChange(option, event.target.checked)}
              />
              <span className="assessment-option__control assessment-option__control--checkbox" aria-hidden="true" />
              <span>{option}</span>
            </label>
          )
        })}
      </div>

      <FieldError message={error} />
    </fieldset>
  )
}

function PillGroup({ error, legend, name, options, required, value, onChange }) {
  return (
    <fieldset className="assessment-fieldset assessment-fieldset--pills">
      <legend>
        {legend} {required ? <span aria-hidden="true">*</span> : null}
      </legend>

      <div className="assessment-pills">
        {options.map((option) => (
          <label className={`assessment-pill ${value === option ? 'is-selected' : ''}`} key={option}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(event) => onChange(event.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      <FieldError message={error} />
    </fieldset>
  )
}

function AssessmentScale({ legend, name, minLabel, maxLabel, value, onChange }) {
  return (
    <fieldset className="assessment-fieldset assessment-fieldset--scale">
      <legend>{legend}</legend>

      <div className="assessment-scale" role="radiogroup" aria-label={legend}>
        {Array.from({ length: 11 }, (_, index) => (
          <label className={`assessment-scale__item ${value === index ? 'is-selected' : ''}`} key={index}>
            <input
              type="radio"
              name={name}
              value={index}
              checked={value === index}
              onChange={() => onChange(index)}
            />
            <span>{index}</span>
          </label>
        ))}
      </div>

      <div className="assessment-scale__labels" aria-hidden="true">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </fieldset>
  )
}

function PerfilStep({ errors, formData, updateField }) {
  return (
    <>
      <div className="assessment-copy">
        <h1 id="assessment-title">Dados pessoais</h1>
        <p>Suas informações são usadas apenas para personalizar a avaliação e nunca são compartilhadas.</p>
      </div>

      <div className="assessment-grid assessment-grid--two assessment-grid--profile">
        <TextField
          id="fullName"
          label="Nome completo"
          error={errors.fullName}
          required
          placeholder="Ex: Maria da Silva"
          value={formData.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
        />
        <TextField
          id="age"
          label="Idade"
          error={errors.age}
          required
          inputMode="numeric"
          placeholder="Ex: 42"
          value={formData.age}
          onChange={(event) => updateField('age', event.target.value)}
        />
        <SelectField
          id="state"
          label="Estado (UF)"
          error={errors.state}
          required
          options={brazilianStates}
          placeholder="Selecione o estado"
          value={formData.state}
          onChange={(event) => updateField('state', event.target.value)}
        />
      </div>

      <OptionGroup
        legend="Você já recebeu algum diagnóstico de câncer?"
        name="cancerDiagnosis"
        options={['Não, nunca', 'Sim, câncer de mama', 'Sim, outro tipo de câncer']}
        required
        error={errors.cancerDiagnosis}
        value={formData.cancerDiagnosis}
        onChange={(value) => updateField('cancerDiagnosis', value)}
      />

      <div className="assessment-warning" role="note">
        <span className="assessment-warning__icon" aria-hidden="true">
          !
        </span>
        <p>
          Esta ferramenta <strong>não realiza diagnóstico médico</strong> - os resultados são apenas
          estimativas informativas.
        </p>
      </div>
    </>
  )
}

function HistoricoStep({ errors, formData, updateField }) {
  return (
    <>
      <div className="assessment-copy">
        <h1 id="assessment-title">Histórico familiar</h1>
        <p>
          Parentes com câncer de mama aumentam o risco. Inclua parentes de 1º grau (mãe, irmã,
          filha) e 2º grau (avó, tia).
        </p>
      </div>

      <OptionGroup
        legend="Algum familiar já teve câncer de mama?"
        name="familyBreastCancer"
        options={[
          'Não, nenhum',
          'Sim, parente de 1º grau (mãe, irmã, filha)',
          'Sim, parente de 2º grau (avó, tia)',
          'Sim, mais de um familiar',
          'Não sei / não tenho informação',
        ]}
        required
        error={errors.familyBreastCancer}
        value={formData.familyBreastCancer}
        onChange={(value) => updateField('familyBreastCancer', value)}
      />

      <OptionGroup
        legend="Alguém na família testou positivo para BRCA1 ou BRCA2?"
        note="(gene de risco)"
        name="brcaTest"
        options={['Não que eu saiba', 'Sim', 'Não sei']}
        required
        error={errors.brcaTest}
        value={formData.brcaTest}
        onChange={(value) => updateField('brcaTest', value)}
      />

      <OptionGroup
        legend="Há histórico de câncer de ovário ou endométrio na família?"
        name="familyOvaryCancer"
        options={['Não', 'Sim', 'Não sei']}
        required
        error={errors.familyOvaryCancer}
        value={formData.familyOvaryCancer}
        onChange={(value) => updateField('familyOvaryCancer', value)}
      />
    </>
  )
}

function SintomasStep({ errors, formData, updateField }) {
  return (
    <>
      <div className="assessment-copy">
        <h1 id="assessment-title">Sintomas e exames</h1>
        <p>Descreva o que você tem observado. Não precisa ter certeza, responda pelo que percebe.</p>
      </div>

      <CheckboxGroup
        legend="Você notou alguma dessas alterações no seio?"
        note="(pode marcar mais de uma)"
        name="symptoms"
        options={symptomItems}
        required
        error={errors.symptoms}
        value={formData.symptoms}
        onChange={(value) => updateField('symptoms', value)}
      />

      <OptionGroup
        legend="Há quanto tempo realizou a última mamografia?"
        name="mammogram"
        options={['Menos de 1 ano', 'Entre 1 e 2 anos', 'Mais de 2 anos', 'Nunca realizei']}
        required
        error={errors.mammogram}
        value={formData.mammogram}
        onChange={(value) => updateField('mammogram', value)}
      />

      <AssessmentScale
        legend="Com que frequência sente desconforto ou dor na região mamária?"
        name="breastPain"
        minLabel="Nunca"
        maxLabel="Sempre"
        value={formData.breastPain}
        onChange={(value) => updateField('breastPain', value)}
      />
    </>
  )
}

function HormonalStep({ errors, formData, updateField }) {
  return (
    <>
      <div className="assessment-copy">
        <h1 id="assessment-title">Fatores hormonais</h1>
        <p>
          Hormônios influenciam o risco. Responda sobre seu histórico reprodutivo e uso de
          medicamentos.
        </p>
      </div>

      <OptionGroup
        legend="Você usa ou usou anticoncepcional hormonal?"
        name="hormonalContraceptive"
        options={['Nunca usei', 'Usei por menos de 5 anos', 'Uso há 5 anos ou mais']}
        required
        error={errors.hormonalContraceptive}
        value={formData.hormonalContraceptive}
        onChange={(value) => updateField('hormonalContraceptive', value)}
      />

      <OptionGroup
        legend="Fez ou faz terapia de reposição hormonal (TRH)?"
        name="hormoneReplacement"
        options={['Não', 'Sim, menos de 5 anos', 'Sim, 5 anos ou mais', 'Não sei']}
        required
        error={errors.hormoneReplacement}
        value={formData.hormoneReplacement}
        onChange={(value) => updateField('hormoneReplacement', value)}
      />

      <div className="assessment-grid assessment-grid--two">
        <OptionGroup
          legend="Menarca"
          note="(1ª menstruação)"
          name="menarche"
          options={['Antes dos 12 anos', 'Entre 12 e 14 anos', 'Após os 14 anos']}
          required
          error={errors.menarche}
          value={formData.menarche}
          onChange={(value) => updateField('menarche', value)}
        />
        <OptionGroup
          legend="Menopausa"
          name="menopause"
          options={['Ainda não tive', 'Antes dos 50 anos', 'Após os 50 anos']}
          required
          error={errors.menopause}
          value={formData.menopause}
          onChange={(value) => updateField('menopause', value)}
        />
      </div>

      <PillGroup
        legend="Amamentou por mais de 6 meses no total?"
        name="breastfed"
        options={['Sim', 'Não', 'Nunca tive filhos']}
        value={formData.breastfed}
        onChange={(value) => updateField('breastfed', value)}
      />
    </>
  )
}

function EstiloVidaStep({ errors, formData, updateField }) {
  return (
    <>
      <div className="assessment-copy">
        <h1 id="assessment-title">Estilo de vida</h1>
        <p>Hábitos do dia a dia têm impacto direto no risco. Responda com base nos seus últimos 12 meses.</p>
      </div>

      <OptionGroup
        legend="Com que frequência você pratica atividade física?"
        name="physicalActivity"
        options={['Raramente ou nunca', '1 a 2 vezes por semana', '3 ou mais vezes por semana']}
        required
        error={errors.physicalActivity}
        value={formData.physicalActivity}
        onChange={(value) => updateField('physicalActivity', value)}
      />

      <OptionGroup
        legend="Consumo de bebida alcoólica"
        name="alcohol"
        options={['Não bebo', 'Ocasionalmente (menos de 1x/semana)', 'Regularmente (1 a 3x/semana)', 'Diariamente']}
        required
        error={errors.alcohol}
        value={formData.alcohol}
        onChange={(value) => updateField('alcohol', value)}
      />

      <PillGroup
        legend="Você fuma ou fumou?"
        name="smoking"
        options={['Não, nunca', 'Ex-fumante', 'Sim, atualmente']}
        required
        error={errors.smoking}
        value={formData.smoking}
        onChange={(value) => updateField('smoking', value)}
      />

      <AssessmentScale
        legend="Como você avalia sua alimentação no geral?"
        name="diet"
        minLabel="Muito ruim"
        maxLabel="Excelente"
        value={formData.diet}
        onChange={(value) => updateField('diet', value)}
      />

      <OptionGroup
        columns
        legend="Qual seu índice de massa corporal aproximado?"
        note="(IMC)"
        name="bmi"
        options={['Abaixo de 18,5 (abaixo do peso)', '18,5 - 24,9 (peso normal)', '25 - 29,9 (sobrepeso)', 'Acima de 30 (obesidade)']}
        required
        error={errors.bmi}
        value={formData.bmi}
        onChange={(value) => updateField('bmi', value)}
      />

      <p className="assessment-note">
        Você está na última etapa. Ao continuar, sua estimativa de risco será calculada com base em
        evidências científicas e exibida com orientações personalizadas.
      </p>
    </>
  )
}

function AssessmentFormPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const hasErrors = Object.keys(errors).length > 0
  const progress = ((currentStep + 1) / steps.length) * 100

  const updateField = (field, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }))

    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[field]
      return nextErrors
    })
  }

  const goBack = () => {
    setErrors({})
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  const validateCurrentStep = () => {
    const nextErrors = requiredFieldsByStep[currentStep].reduce((accumulator, field) => {
      if (!hasValue(formData[field])) {
        accumulator[field] = fieldLabels[field]
      }

      return accumulator
    }, {})

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const goNext = () => {
    if (!validateCurrentStep()) {
      return
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length - 1))
  }

  const stepContent = [
    <PerfilStep errors={errors} formData={formData} updateField={updateField} />,
    <HistoricoStep errors={errors} formData={formData} updateField={updateField} />,
    <SintomasStep errors={errors} formData={formData} updateField={updateField} />,
    <HormonalStep errors={errors} formData={formData} updateField={updateField} />,
    <EstiloVidaStep errors={errors} formData={formData} updateField={updateField} />,
  ][currentStep]

  return (
    <main id="main-content" tabIndex={-1} className="assessment-page">
      <section className="assessment-card" aria-labelledby="assessment-title">
        <header className="assessment-header">
          <div className="assessment-brand" aria-label="RiskCare">
            <img className="assessment-brand__icon" src="/riskcare_logo.png" alt="" aria-hidden="true" />
            <span>
              Risk<strong>Care</strong>
            </span>
          </div>

          <p className="assessment-status">Avaliação em andamento</p>
        </header>

        <div className="assessment-body">
          <div className="assessment-progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>

          <AssessmentStepIndicator currentStep={currentStep} />

          <form
            className="assessment-form"
            onSubmit={(event) => {
              event.preventDefault()
              goNext()
            }}
          >
            {hasErrors ? (
              <p className="assessment-step-error" role="alert">
                Para avançar, responda as perguntas obrigatórias marcadas com *.
              </p>
            ) : null}

            {stepContent}
          </form>
        </div>

        <footer className="assessment-actions">
          <button
            className="assessment-action assessment-action--secondary"
            type="button"
            onClick={goBack}
          >
            Voltar
          </button>

          <span aria-live="polite">Etapa {currentStep + 1} de 5</span>

          <button
            className="assessment-action assessment-action--primary"
            type="button"
            onClick={goNext}
          >
            {currentStep === steps.length - 1 ? 'Ver minha estimativa' : 'Continuar'}
          </button>
        </footer>
      </section>
    </main>
  )
}

export default AssessmentFormPage
