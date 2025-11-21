
import { Activity, ActivityCategory, TeaLevel, LibraryModule } from './types';

export const DISCLAIMER_TEXT = "Aviso Importante: Este aplicativo serve como apoio e organização da rotina domiciliar. Ele NÃO substitui o acompanhamento de profissionais da saúde (médicos, psicólogos, fonoaudiólogos, terapeutas ocupacionais).";

export const ACTIVITY_DATABASE: Activity[] = [
  // --- COMMUNICATION (Fonoaudiologia / ESDM / Hanen) ---
  {
    id: 'comm-01',
    title: 'Apontar e Nomear (Atenção Compartilhada)',
    category: ActivityCategory.COMMUNICATION,
    objective: 'Estimular a atenção compartilhada e o vocabulário.',
    scientificBasis: 'Baseado no Modelo Denver (ESDM) e estudos de Mundy et al. sobre Atenção Compartilhada. O ato de apontar é um precursor essencial da linguagem verbal.',
    durationMin: 10,
    materials: ['Livro com figuras grandes' , 'Brinquedos favoritos'],
    steps: [
      'Sente-se de frente para a criança (nível dos olhos).',
      'Aponte para uma figura ou objeto de interesse dela.',
      'Diga o nome do objeto claramente (ex: "Olha! O cachorro!").',
      'Pegue a mãozinha da criança e ajude-a a apontar também (modelagem física).',
      'Comemore muito (reforço social) quando ela tentar apontar ou olhar para o objeto.'
    ],
    benefits: ['Melhora a intenção comunicativa', 'Expansão de vocabulário', 'Conexão social'],
    suitableFor: { maxAge: 5, needsSpeechFocus: true, levels: [TeaLevel.LEVEL_1, TeaLevel.LEVEL_2, TeaLevel.LEVEL_3] }
  },
  {
    id: 'comm-02',
    title: 'Imitação de Sons e Gestos',
    category: ActivityCategory.COMMUNICATION,
    objective: 'Trabalhar a imitação vocal e motora de forma lúdica.',
    scientificBasis: 'Fundamentado em princípios da ABA (Verbal Behavior) e neurociência dos Neurônios Espelho. A imitação é a habilidade "pivô" para o aprendizado de novas competências.',
    durationMin: 15,
    materials: ['Fantoches' , 'Espelho', 'Figuras de animais'],
    steps: [
      'Sente-se de frente para a criança.',
      'Faça um som engraçado ou gesto (ex: bater palmas, som de vaca, mandar beijo).',
      'Espere a criança olhar para você.',
      'Se ela não imitar, ajude fisicamente e depois dê o reforço (elogio/brinquedo).',
      'Repita várias vezes, tornando divertido e rápido.'
    ],
    benefits: ['Discriminação auditiva', 'Fortalecimento da musculatura da fala', 'Reciprocidade social'],
    suitableFor: { maxAge: 6, needsSpeechFocus: true }
  },
  {
    id: 'comm-03',
    title: 'A "Escolha Forçada"',
    category: ActivityCategory.COMMUNICATION,
    objective: 'Incentivar a criança a fazer pedidos (Mando).',
    scientificBasis: 'Estratégia clássica de ABA e Fonoaudiologia para criar "oportunidades de comunicação". Ao oferecer duas opções, forçamos a criança a comunicar sua preferência.',
    durationMin: 5,
    materials: ['Dois alimentos ou brinquedos preferidos'],
    steps: [
      'Segure um item em cada mão (ex: Água e Suco).',
      'Mostre para a criança, mas não entregue ainda.',
      'Pergunte: "Você quer ÁGUA ou SUCO?".',
      'Espere ela olhar, apontar ou tentar falar o nome.',
      'Entregue imediatamente assim que houver uma tentativa de comunicação.'
    ],
    benefits: ['Autonomia', 'Redução de comportamentos inadequados (choro)', 'Iniciação da fala'],
    suitableFor: { needsSpeechFocus: true, levels: [TeaLevel.LEVEL_1, TeaLevel.LEVEL_2, TeaLevel.LEVEL_3] }
  },
  {
    id: 'comm-04',
    title: 'Música com Pausas (Preencher a Lacuna)',
    category: ActivityCategory.COMMUNICATION,
    objective: 'Estimular a criança a completar a frase.',
    scientificBasis: 'Técnica utilizada no método Hanen "It Takes Two to Talk". O cérebro tende a querer "fechar" padrões conhecidos, incentivando a vocalização.',
    durationMin: 10,
    materials: ['Músicas infantis conhecidas (Dona Aranha, Pintinho Amarelinho)'],
    steps: [
      'Comece a cantar uma música que a criança gosta muito.',
      'Em um momento chave, PARE subitamente (ex: "A dona aranha subiu pela...").',
      'Olhe para a criança com expectativa e espere.',
      'Se ela fizer qualquer som, complete a frase e faça festa.',
      'Se não, complete você e tente novamente depois.'
    ],
    benefits: ['Atenção auditiva', 'Vocabulário', 'Interação diádica'],
    suitableFor: { maxAge: 6, needsSpeechFocus: true }
  },

  // --- SENSORY (Integração Sensorial / Ayres) ---
  {
    id: 'sens-01',
    title: 'Caixa Sensorial de Texturas',
    category: ActivityCategory.SENSORY,
    objective: 'Dessensibilização tátil e regulação sensorial.',
    scientificBasis: 'Baseado na Teoria de Integração Sensorial de Jean Ayres. A exposição controlada a texturas ajuda o cérebro a processar estímulos táteis sem sobrecarga (regulação).',
    durationMin: 20,
    materials: ['Bacia plástica', 'Arroz cru, feijão ou areia cinética', 'Potes menores', 'Colheres'],
    steps: [
      'Coloque o material (arroz/areia) na bacia.',
      'Esconda brinquedos pequenos no meio dos grãos.',
      'Incentive a criança a encontrar os brinquedos com as mãos (feedback tátil).',
      'Permita que ela explore livremente, despejando de um pote para o outro.'
    ],
    benefits: ['Regulação emocional', 'Tolerância tátil', 'Coordenação motora fina'],
    suitableFor: { needsSensoryFocus: true, levels: [TeaLevel.LEVEL_2, TeaLevel.LEVEL_3] }
  },
  {
    id: 'sens-02',
    title: 'Sanduíche de Almofadas (Propriocepção)',
    category: ActivityCategory.SENSORY,
    objective: 'Fornecer pressão profunda para acalmar.',
    scientificBasis: 'Utiliza o princípio de "Deep Touch Pressure" (Pressão Profunda), validado por Temple Grandin e terapeutas ocupacionais para reduzir ansiedade e organizar o sistema sensorial.',
    durationMin: 5,
    materials: ['Almofadas de sofá', 'Colchão ou tapete macio'],
    steps: [
      'Peça para a criança deitar no tapete de barriga para baixo.',
      'Coloque uma almofada grande sobre as costas (evite a cabeça).',
      'Faça uma leve pressão firme e constante, perguntando se está gostoso.',
      'Brinque que está passando "manteiga" no sanduíche para tornar lúdico.'
    ],
    benefits: ['Organização corporal', 'Calma e relaxamento', 'Consciência corporal'],
    suitableFor: { needsSensoryFocus: true, levels: [TeaLevel.LEVEL_1, TeaLevel.LEVEL_2, TeaLevel.LEVEL_3] }
  },
  {
    id: 'sens-03',
    title: 'Rede ou Balanço (Vestibular)',
    category: ActivityCategory.SENSORY,
    objective: 'Estimulação do sistema vestibular (equilíbrio e movimento).',
    scientificBasis: 'O sistema vestibular é o "GPS" do corpo. Movimentos lineares e rítmicos (como balançar em uma rede) tendem a ser organizadores e calmantes.',
    durationMin: 15,
    materials: ['Rede', 'Balanço' , 'Lençol forte (com dois adultos)'],
    steps: [
      'Coloque a criança na rede ou lençol.',
      'Balance em ritmo lento e constante.',
      'Cante uma música calma enquanto balança.',
      'Se a criança pedir "mais", pare e espere ela comunicar o pedido.'
    ],
    benefits: ['Regulação do nível de alerta', 'Conexão visual', 'Calma'],
    suitableFor: { needsSensoryFocus: true }
  },
  {
    id: 'sens-04',
    title: 'Caça ao Tesouro na Gelatina',
    category: ActivityCategory.SENSORY,
    objective: 'Alta estimulação tátil e aceitação de texturas "molhadas/pegajosas".',
    scientificBasis: 'Dessensibilização sistemática para crianças com defensividade tátil a texturas úmidas.',
    durationMin: 20,
    materials: ['Gelatina pronta (fria)', 'Brinquedos de plástico laváveis', 'Travessa'],
    steps: [
      'Prepare uma gelatina e coloque brinquedos dentro antes de endurecer.',
      'Coloque a travessa na frente da criança.',
      'A missão é "salvar" os brinquedos.',
      'Se ela tiver nojo, comece usando uma colher, depois um dedo, até usar a mão toda.'
    ],
    benefits: ['Tolerância sensorial', 'Diversão', 'Coordenação motora'],
    suitableFor: { needsSensoryFocus: true, minAge: 2 }
  },

  // --- COGNITIVE (TEACCH / Psicopedagogia) ---
  {
    id: 'cog-01',
    title: 'Pareamento de Cores (Matching)',
    category: ActivityCategory.COGNITIVE,
    objective: 'Desenvolver lógica e discriminação visual.',
    scientificBasis: 'Exercício clássico do método TEACCH e currículos iniciais de ABA (Matching to Sample). Desenvolve a habilidade de categorização, pré-requisito para matemática.',
    durationMin: 15,
    materials: ['Potes coloridos', 'Peças de lego ou tampinhas correspondentes'],
    steps: [
      'Separe potes de cores diferentes (Azul, Vermelho, Amarelo).',
      'Coloque uma peça de modelo em cada pote.',
      'Entregue uma peça para a criança e pergunte: "Onde vai esse?".',
      'Ajude-a a colocar no pote igual (pareamento idêntico).'
    ],
    benefits: ['Atenção sustentada', 'Categorização', 'Discriminação visual'],
    suitableFor: { minAge: 2, maxAge: 8 }
  },
  {
    id: 'cog-02',
    title: 'Sequência Lógica do Dia',
    category: ActivityCategory.COGNITIVE,
    objective: 'Compreensão de tempo, previsão e autonomia.',
    scientificBasis: 'Suportes visuais são altamente recomendados pela National Autistic Society (UK) e TEACCH para reduzir ansiedade e aumentar a independência.',
    durationMin: 10,
    materials: ['Fotos da criança (acordando, comendo, banho)', 'Velcro ou fita'],
    steps: [
      'Imprima ou desenhe 3 momentos do dia.',
      'Embaralhe as imagens na mesa.',
      'Pergunte: "O que fazemos primeiro?" (ex: acordar).',
      'Ajude a criança a organizar a linha do tempo da esquerda para a direita.'
    ],
    benefits: ['Previsibilidade', 'Redução de ansiedade', 'Função executiva'],
    suitableFor: { minAge: 4, levels: [TeaLevel.LEVEL_1, TeaLevel.LEVEL_2] }
  },
  {
    id: 'cog-03',
    title: 'Quebra-Cabeça de 2 Peças',
    category: ActivityCategory.COGNITIVE,
    objective: 'Noção de "todo" e "partes" e resolução de problemas.',
    scientificBasis: 'Desenvolvimento de habilidades visuoespaciais e fechamento visual. Começar com poucas peças garante o "sucesso sem erro" (Errorless Learning).',
    durationMin: 15,
    materials: ['Figuras impressas cortadas ao meio', 'Quebra-cabeças simples'],
    steps: [
      'Pegue uma foto de um animal ou objeto conhecido.',
      'Corte ao meio na frente da criança ou mostre as duas partes.',
      'Ajude-a a juntar para formar a imagem completa.',
      'Aumente a dificuldade gradualmente para 3 ou 4 peças.'
    ],
    benefits: ['Raciocínio lógico', 'Persistência', 'Motricidade fina'],
    suitableFor: { minAge: 3 }
  },
  {
    id: 'cog-04',
    title: 'Classificando Talheres (Vida Prática)',
    category: ActivityCategory.COGNITIVE,
    objective: 'Categorização funcional e autonomia (AVD).',
    scientificBasis: 'Baseado no método Montessori de "Vida Prática" e generalização de conceitos. Transfere a habilidade cognitiva para uma tarefa útil do dia a dia.',
    durationMin: 10,
    materials: ['Gaveta de talheres ou porta-talheres', 'Colheres, garfos (sem ponta)'],
    steps: [
      'Com os talheres limpos, peça ajuda para guardar.',
      'Mostre: "Colheres aqui, garfos aqui".',
      'Peça para a criança pegar um por um e colocar no lugar certo.',
    ],
    benefits: ['Autonomia doméstica', 'Classificação', 'Coordenação motora'],
    suitableFor: { minAge: 4 }
  },

  // --- FEEDING (Selectivity / SOS Approach) ---
  {
    id: 'feed-01',
    title: 'Exploração Lúdica de Alimentos',
    category: ActivityCategory.FEEDING,
    objective: 'Aproximação sensorial sem pressão para comer (Food Chaining).',
    scientificBasis: 'Baseado na abordagem SOS Approach to Feeding. A hierarquia da alimentação começa com tolerar ver e tocar o alimento, antes de provar.',
    durationMin: 15,
    materials: ['Fruta nova (ex: maçã)', 'Cortadores de biscoito'],
    steps: [
      'Lavem a fruta juntos.',
      'Use cortadores divertidos para fazer formatos de estrela ou coração.',
      'Montem uma "carinha" no prato.',
      'A regra é clara: "Podemos brincar, cheirar e lamber. Não precisa engolir se não quiser". Isso reduz a defesa sensorial.'
    ],
    benefits: ['Redução da aversão alimentar', 'Curiosidade', 'Dessensibilização oral'],
    suitableFor: { needsFoodFocus: true }
  },
  {
    id: 'feed-02',
    title: 'Pintura com Iogurte',
    category: ActivityCategory.FEEDING,
    objective: 'Aceitação de texturas pastosas e interação positiva com comida.',
    scientificBasis: 'Transformar o alimento em brinquedo reduz a ansiedade associada ao momento da refeição (Reforço Positivo).',
    durationMin: 15,
    materials: ['Iogurte natural', 'Corante alimentício (opcional)', 'Papel manteiga ou prato limpo'],
    steps: [
      'Coloque um pouco de iogurte no prato.',
      'Use o dedo para desenhar.',
      'Incentive a criança a sujar o dedo.',
      'Se ela levar o dedo à boca, não force, mas comemore se acontecer naturalmente.'
    ],
    benefits: ['Dessensibilização tátil/oral', 'Redução de neofobia alimentar'],
    suitableFor: { needsFoodFocus: true, minAge: 1 }
  },

  // --- OT / MOTOR (Psicomotricidade) ---
  {
    id: 'ot-01',
    title: 'Circuito Motor de Obstáculos',
    category: ActivityCategory.OT,
    objective: 'Coordenação motora ampla e planejamento motor (Praxia).',
    scientificBasis: 'Atividade fundamental na Psicomotricidade. Trabalha o planejamento motor (praxia) e o sistema vestibular, essenciais para a criança navegar no ambiente.',
    durationMin: 20,
    materials: ['Cadeiras', 'Fita crepe no chão', 'Almofadas'],
    steps: [
      'Crie um caminho na sala: Passar por baixo da cadeira (rastejar), pular a fita, rolar na almofada.',
      'Faça o circuito primeiro para demonstrar (modelagem).',
      'Narre as ações: "Agora pulou!", "Agora passou por baixo!".'
    ],
    benefits: ['Noção espacial', 'Gasto de energia', 'Planejamento motor'],
    suitableFor: { needsMotorFocus: true }
  },
  {
    id: 'ot-02',
    title: 'Colar de Macarrão (Pinça Fina)',
    category: ActivityCategory.OT,
    objective: 'Coordenação motora fina e movimento de pinça.',
    scientificBasis: 'Desenvolvimento da musculatura intrínseca da mão, pré-requisito para a escrita e abotoar roupas (AVDs), conforme diretrizes de Terapia Ocupacional.',
    durationMin: 15,
    materials: ['Macarrão tipo penne (cru)', 'Barbante firme ou cadarço'],
    steps: [
      'Dê um barbante com a ponta firme (passe fita adesiva se precisar de um "guia").',
      'Mostre como segurar o macarrão com os dedos polegar e indicador (pinça).',
      'Peça para a criança passar o macarrão pelo barbante.',
      'Faça um colar para presentear alguém (função social).'
    ],
    benefits: ['Foco e atenção', 'Coordenação olho-mão', 'Autonomia futura na escrita'],
    suitableFor: { minAge: 3 }
  },
  {
    id: 'ot-03',
    title: 'Andar sobre a Linha (Equilíbrio)',
    category: ActivityCategory.OT,
    objective: 'Controle postural e atenção.',
    scientificBasis: 'Baseado em exercícios montessorianos de "Linha" e desenvolvimento vestibular. Melhora o foco e a consciência corporal.',
    durationMin: 10,
    materials: ['Fita crepe colorida colada no chão'],
    steps: [
      'Cole uma fita longa no chão (pode fazer curvas).',
      'Desafie a criança a andar "como um equilibrista" sem pisar fora da fita.',
      'Para dificultar, peça para levar um objeto (ex: colher com um limão) enquanto anda.'
    ],
    benefits: ['Equilíbrio', 'Concentração', 'Controle inibitório'],
    suitableFor: { needsMotorFocus: true, minAge: 3 }
  },
  {
    id: 'ot-04',
    title: 'Rasgar Papel (Força dos Dedos)',
    category: ActivityCategory.OT,
    objective: 'Fortalecimento da pinça trípode (preparação para escrita).',
    scientificBasis: 'O movimento de rasgar exige que os dedos façam forças opostas, excelente para a destreza manual fina.',
    durationMin: 10,
    materials: ['Revistas velhas', 'Papel colorido'],
    steps: [
      'Dê folhas de papel para a criança.',
      'Mostre como segurar com os "dedinhos de pinça" (polegar e indicador) de cada mão.',
      'Rasgue em tiras longas.',
      'Use os papéis rasgados para fazer uma "chuva de papel" depois (recompensa sensorial).'
    ],
    benefits: ['Coordenação bilateral', 'Força manual', 'Alívio de tensão'],
    suitableFor: { minAge: 2 }
  },

  // --- SOCIAL (Floortime / DIR / Habilidades Sociais) ---
  {
    id: 'soc-01',
    title: 'Minha Vez, Sua Vez',
    category: ActivityCategory.SOCIAL,
    objective: 'Compreender a troca de turnos (Turn-taking).',
    scientificBasis: 'Habilidade social fundamental trabalhada em grupos de habilidades sociais e Floortime. A conversação é uma troca de turnos, e isso começa na brincadeira.',
    durationMin: 15,
    materials: ['Bola', 'Carrinho' , 'Peças de encaixe'],
    steps: [
      'Sente-se frente a frente.',
      'Role a bola e diga "Minha vez!".',
      'Peça para a criança rolar e diga "Sua vez!".',
      'Use um gesto visual (mão no peito) para reforçar de quem é a vez.',
      'Se a criança tentar pegar fora da hora, bloqueie gentilmente e lembre: "Agora é a vez da mamãe".'
    ],
    benefits: ['Controle de impulsividade', 'Reciprocidade', 'Regras sociais'],
    suitableFor: { levels: [TeaLevel.LEVEL_1, TeaLevel.LEVEL_2] }
  },
  {
    id: 'soc-02',
    title: 'Mímica das Emoções',
    category: ActivityCategory.SOCIAL,
    objective: 'Reconhecimento de expressões faciais e empatia.',
    scientificBasis: 'Crianças com TEA podem ter dificuldade em ler expressões faciais (Teoria da Mente). O treino explícito ajuda na decodificação social.',
    durationMin: 10,
    materials: ['Espelho', 'Cartões com carinhas (opcional)'],
    steps: [
      'Fique na frente do espelho com a criança.',
      'Faça uma cara de FELIZ exagerada. Pergunte: "Quem está feliz?".',
      'Faça cara de TRISTE ou ASSUSTADO.',
      'Peça para a criança imitar a emoção.',
      'Associe com situações: "Fico feliz quando como bolo!".'
    ],
    benefits: ['Inteligência emocional', 'Vocabulário de sentimentos', 'Empatia'],
    suitableFor: { minAge: 4, levels: [TeaLevel.LEVEL_1] }
  }
];

export const LIBRARY_CONTENT: LibraryModule[] = [
  {
    id: 'lib-food',
    title: "Seletividade Alimentar",
    desc: "Estratégias para expandir o paladar sem lágrimas.",
    color: "bg-amber-100",
    icon: "🍎",
    articles: [
      {
        id: 'art-food-01',
        title: 'O que é Food Chaining?',
        readTime: '3 min',
        content: [
          'O Food Chaining (Encadeamento Alimentar) é uma estratégia baseada em evidências para ampliar a dieta de crianças seletivas. A ideia não é forçar a criança a comer algo totalmente novo, mas sim "conectar" um alimento que ela já aceita a um novo, através de semelhanças.',
          'Por exemplo: Se a criança só come batata frita, tentamos oferecer batata assada cortada no mesmo formato (mesma forma, sabor parecido, textura diferente). Depois, batata doce frita (mesma forma, textura parecida, sabor diferente).',
          'O segredo é fazer mudanças minúsculas e graduais, respeitando o conforto sensorial da criança.'
        ],
        tipBox: 'Dica: Nunca esconda alimentos novos dentro dos preferidos. Isso quebra a confiança.'
      },
      {
        id: 'art-food-02',
        title: 'A Hierarquia do Comer (SOS Approach)',
        readTime: '4 min',
        content: [
          'Comer é a tarefa sensorial mais complexa que fazemos. Para uma criança seletiva, colocar algo na boca pode ser aterrorizante. A abordagem SOS propõe degraus:',
          '1. TOLERAR: O alimento está na mesa, mesmo que longe.',
          '2. INTERAGIR: Tocar com um talher, servir para a mamãe.',
          '3. CHEIRAR: Sentir o aroma sem precisar comer.',
          '4. TOCAR: Tocar com a mão, depois com o queixo ou nariz.',
          '5. PROVAR: Lamber, morder e cuspir.',
          '6. COMER: Mastigar e engolir.',
          'Se a criança trava em um degrau, volte para o anterior. O progresso não é linear.'
        ]
      }
    ]
  },
  {
    id: 'lib-comm',
    title: "Comunicação e Fala",
    desc: "Estimulando a linguagem natural.",
    color: "bg-blue-100",
    icon: "🗣️",
    articles: [
      {
        id: 'art-comm-01',
        title: 'Fale MENOS para ele falar MAIS',
        readTime: '3 min',
        content: [
          'Muitas vezes, na ânsia de ensinar, bombardeamos a criança com perguntas: "O que é isso? É azul? Fala azul!". Isso pode gerar ansiedade e silêncio.',
          'A estratégia do Hanen Centre sugere: O.W.L (Observe, Wait, Listen).',
          'Observe o interesse dele. Espere (conte mentalmente até 10) para dar chance dele iniciar. Ouça qualquer som que ele fizer e valide.',
          'Em vez de perguntar, COMENTE. Se ele pega o carro, diga "O carro corre!". Comentários ensinam, perguntas testam.'
        ],
        tipBox: 'Tente a regra 3:1 - Faça 3 comentários para cada 1 pergunta que fizer.'
      }
    ]
  },
  {
    id: 'lib-sens',
    title: "Regulação Sensorial",
    desc: "Entendendo o perfil sensorial.",
    color: "bg-purple-100",
    icon: "✨",
    articles: [
      {
        id: 'art-sens-01',
        title: 'Crise (Meltdown) ou Birra?',
        readTime: '5 min',
        content: [
          'É fundamental diferenciar uma birra comportamental de uma crise sensorial (Meltdown).',
          'BIRRA: Tem um objetivo (querer um doce). A criança olha para ver se você está reagindo. Se você der o que ela quer, para na hora.',
          'MELTDOWN: É uma sobrecarga do sistema nervoso. Não tem objetivo. A criança não consegue se controlar, mesmo se você oferecer o mundo a ela. É uma reação de "luta ou fuga".',
          'Como lidar: Na birra, ignorar o comportamento (extinção) funciona. No Meltdown, a criança precisa de CO-REGULAÇÃO: voz calma, pouca fala, ambiente escuro, pressão profunda (abraço apertado, se ela aceitar).'
        ]
      },
      {
        id: 'art-sens-02',
        title: 'Dieta Sensorial: O que é?',
        readTime: '3 min',
        content: [
          'Assim como precisamos de comida, nosso cérebro precisa de "nutrientes sensoriais" para ficar calmo e alerta. Uma dieta sensorial é um roteiro de atividades físicas ao longo do dia.',
          'Atividades de "Trabalho Pesado" (empurrar parede, carregar mochila, pular) são geralmente organizadoras e calmantes.',
          'Consulte um Terapeuta Ocupacional para criar uma dieta específica para seu filho, mas lembre-se: movimento é regulação.'
        ]
      }
    ]
  },
  {
    id: 'lib-potty',
    title: "Desfralde no TEA",
    desc: "Guia passo a passo respeitoso.",
    color: "bg-green-100",
    icon: "🚽",
    articles: [
      {
        id: 'art-potty-01',
        title: 'Sinais de Prontidão',
        readTime: '4 min',
        content: [
          'O desfralde em crianças atípicas pode demorar um pouco mais, e tudo bem. Antes de tirar a fralda, observe:',
          '1. Fisiológico: A fralda fica seca por 1 ou 2 horas? Ele faz muito xixi de uma vez?',
          '2. Motor: Consegue abaixar a calça? Consegue sentar no vaso?',
          '3. Cognitivo: Entende instruções simples ("pegue a bola")?',
          '4. Sensorial: Ele se incomoda com a fralda suja? Tem medo do barulho da descarga?',
          'Se não houver sinais, treinar cedo demais pode causar frustração e retenção (prisão de ventre).'
        ]
      }
    ]
  },
  {
    id: 'lib-sleep',
    title: "Higiene do Sono",
    desc: "Melhorando as noites da família.",
    color: "bg-indigo-100",
    icon: "🌙",
    articles: [
      {
        id: 'art-sleep-01',
        title: 'Reduzindo a Melatonina "Eletrônica"',
        readTime: '3 min',
        content: [
          'A luz azul de tablets e celulares inibe a produção de melatonina, o hormônio do sono. Crianças com TEA frequentemente já têm produção irregular de melatonina.',
          'Regra de Ouro: Desligar telas 1 a 2 horas antes de dormir.',
          'Troque por atividades de "baixo alerta": massagem, música calma, olhar livros físicos (sem luz), brincar com massinha.'
        ]
      }
    ]
  }
];