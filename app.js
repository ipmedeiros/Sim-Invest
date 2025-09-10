/*
  Sim-Invest
  Desenvolvido com amor para me ajudar a investir
*/

// Simulador de Investimentos com Cálculos de Impostos e Perfis de Risco

// Dados de investimentos com perfis de risco completos
const investmentData = {
  "cdiRate": 0.1214,
  "investmentTypes": [
    {"name": "CDI", "category": "renda_fixa", "institution": "Geral", "taxType": "regressivo", "defaultRate": 12.14, "frequency": "annual", "hasIOF": true, "riskLevel": "baixo"},
    {"name": "CDB Prefixado", "category": "renda_fixa", "institution": "Geral", "taxType": "regressivo", "defaultRate": 13.5, "frequency": "annual", "hasIOF": true, "riskLevel": "baixo"},
    {"name": "CDB Pós-Fixado (% CDI)", "category": "renda_fixa", "institution": "Geral", "taxType": "regressivo", "defaultRate": 110, "frequency": "cdi-percent", "hasIOF": true, "riskLevel": "baixo"},
    {"name": "Tesouro Selic", "category": "renda_fixa", "institution": "Governo", "taxType": "regressivo", "defaultRate": 10.8, "frequency": "annual", "hasIOF": true, "riskLevel": "muito_baixo"},
    {"name": "Tesouro Prefixado", "category": "renda_fixa", "institution": "Governo", "taxType": "regressivo", "defaultRate": 12.0, "frequency": "annual", "hasIOF": true, "riskLevel": "baixo"},
    {"name": "Tesouro IPCA", "category": "renda_fixa", "institution": "Governo", "taxType": "regressivo", "defaultRate": 8.0, "frequency": "annual", "hasIOF": true, "riskLevel": "baixo"},
    
    {"name": "Nubank - Nuconta", "category": "fintechs", "institution": "Nubank", "taxType": "regressivo", "defaultRate": 100, "frequency": "cdi-percent", "hasIOF": true, "riskLevel": "baixo_medio"},
    {"name": "Nubank - CDB", "category": "fintechs", "institution": "Nubank", "taxType": "regressivo", "defaultRate": 105, "frequency": "cdi-percent", "hasIOF": true, "riskLevel": "baixo_medio"},
    {"name": "Mercado Pago - CDB", "category": "fintechs", "institution": "Mercado Pago", "taxType": "regressivo", "defaultRate": 102, "frequency": "cdi-percent", "hasIOF": true, "riskLevel": "baixo_medio"},
    {"name": "Inter - CDB", "category": "fintechs", "institution": "Inter", "taxType": "regressivo", "defaultRate": 108, "frequency": "cdi-percent", "hasIOF": true, "riskLevel": "baixo_medio"},
    {"name": "PicPay - CDB", "category": "fintechs", "institution": "PicPay", "taxType": "regressivo", "defaultRate": 103, "frequency": "cdi-percent", "hasIOF": true, "riskLevel": "baixo_medio"},
    {"name": "C6 Bank - CDB", "category": "fintechs", "institution": "C6 Bank", "taxType": "regressivo", "defaultRate": 106, "frequency": "cdi-percent", "hasIOF": true, "riskLevel": "baixo_medio"},
    {"name": "BTG Pactual - CDB", "category": "fintechs", "institution": "BTG Pactual", "taxType": "regressivo", "defaultRate": 112, "frequency": "cdi-percent", "hasIOF": true, "riskLevel": "baixo_medio"},
    
    {"name": "LCI", "category": "isento", "institution": "Geral", "taxType": "isento", "defaultRate": 11.0, "frequency": "annual", "hasIOF": true, "riskLevel": "baixo"},
    {"name": "LCA", "category": "isento", "institution": "Geral", "taxType": "isento", "defaultRate": 10.5, "frequency": "annual", "hasIOF": true, "riskLevel": "baixo"},
    {"name": "CRI", "category": "isento", "institution": "Geral", "taxType": "isento", "defaultRate": 11.5, "frequency": "annual", "hasIOF": false, "riskLevel": "baixo"},
    {"name": "CRA", "category": "isento", "institution": "Geral", "taxType": "isento", "defaultRate": 11.0, "frequency": "annual", "hasIOF": false, "riskLevel": "baixo"},
    {"name": "Poupança", "category": "isento", "institution": "Geral", "taxType": "isento", "defaultRate": 6.6, "frequency": "annual", "hasIOF": false, "riskLevel": "muito_baixo"},
    
    {"name": "Ações", "category": "renda_variavel", "institution": "B3", "taxType": "acoes", "defaultRate": 12.0, "frequency": "annual", "hasIOF": false, "riskLevel": "muito_alto"},
    {"name": "Fundos Imobiliários (FIIs)", "category": "renda_variavel", "institution": "B3", "taxType": "dividendo_isento", "defaultRate": 1.1, "frequency": "monthly", "hasIOF": false, "riskLevel": "alto"},
    
    {"name": "Fundos DI", "category": "fundos", "institution": "Geral", "taxType": "regressivo", "defaultRate": 95, "frequency": "cdi-percent", "hasIOF": true, "riskLevel": "baixo_medio"},
    {"name": "Fundos Multimercado", "category": "fundos", "institution": "Geral", "taxType": "regressivo", "defaultRate": 12.0, "frequency": "annual", "hasIOF": true, "riskLevel": "medio"},
    {"name": "Fundos de Ações", "category": "fundos", "institution": "Geral", "taxType": "regressivo", "defaultRate": 10.0, "frequency": "annual", "hasIOF": true, "riskLevel": "alto"}
  ],
  "riskLevels": {
    "muito_baixo": {"name": "Muito Baixo", "color": "#10b981", "description": "Risco mínimo, capital garantido"},
    "baixo": {"name": "Baixo", "color": "#3b82f6", "description": "Baixo risco, retorno previsível"},
    "baixo_medio": {"name": "Baixo-Médio", "color": "#eab308", "description": "Risco moderado, boa previsibilidade"},
    "medio": {"name": "Médio", "color": "#f97316", "description": "Risco equilibrado, retorno variável"},
    "alto": {"name": "Alto", "color": "#ef4444", "description": "Alto risco, alta volatilidade"},
    "muito_alto": {"name": "Muito Alto", "color": "#8b5cf6", "description": "Risco máximo, alta volatilidade"}
  },
  "investorProfiles": {
    "conservador": {
      "name": "Conservador", 
      "description": "Prioriza segurança do capital",
      "allowedRisks": ["muito_baixo", "baixo", "baixo_medio"],
      "riskTolerance": "Baixa tolerância ao risco"
    },
    "moderado": {
      "name": "Moderado", 
      "description": "Busca equilíbrio entre risco e retorno",
      "allowedRisks": ["baixo", "baixo_medio", "medio", "alto"],
      "riskTolerance": "Tolerância média ao risco"
    },
    "arrojado": {
      "name": "Arrojado", 
      "description": "Aceita alto risco por maior retorno",
      "allowedRisks": ["baixo_medio", "medio", "alto", "muito_alto"],
      "riskTolerance": "Alta tolerância ao risco"
    }
  }
};

const { investmentTypes, riskLevels, investorProfiles, cdiRate } = investmentData;

// Nomes de categorias com emojis - Esses emojis dão vida à interface!
const categoryNames = {
    'renda_fixa': '🏦 Renda Fixa Tradicional',
    'fintechs': '📱 Fintechs / Bancos Digitais',
    'isento': '🌱 Isentos de IR',
    'renda_variavel': '📈 Renda Variável',
    'fundos': '💼 Fundos de Investimento'
};

// Tabelas de impostos
const irTable = [
    {"minDays": 0, "maxDays": 180, "rate": 0.225},
    {"minDays": 181, "maxDays": 360, "rate": 0.20},
    {"minDays": 361, "maxDays": 720, "rate": 0.175},
    {"minDays": 721, "maxDays": 9999, "rate": 0.15}
];

const iofTable = [
    {"day": 1, "rate": 0.96}, {"day": 2, "rate": 0.93}, {"day": 3, "rate": 0.90},
    {"day": 4, "rate": 0.86}, {"day": 5, "rate": 0.83}, {"day": 6, "rate": 0.80},
    {"day": 7, "rate": 0.76}, {"day": 8, "rate": 0.73}, {"day": 9, "rate": 0.70},
    {"day": 10, "rate": 0.66}, {"day": 11, "rate": 0.63}, {"day": 12, "rate": 0.60},
    {"day": 13, "rate": 0.56}, {"day": 14, "rate": 0.53}, {"day": 15, "rate": 0.50},
    {"day": 16, "rate": 0.46}, {"day": 17, "rate": 0.43}, {"day": 18, "rate": 0.40},
    {"day": 19, "rate": 0.36}, {"day": 20, "rate": 0.33}, {"day": 21, "rate": 0.30},
    {"day": 22, "rate": 0.26}, {"day": 23, "rate": 0.23}, {"day": 24, "rate": 0.20},
    {"day": 25, "rate": 0.16}, {"day": 26, "rate": 0.13}, {"day": 27, "rate": 0.10},
    {"day": 28, "rate": 0.06}, {"day": 29, "rate": 0.03}, {"day": 30, "rate": 0.00}
];

// Variáveis globais
let individualChart = null;
let comparativeBarChart = null;
let comparativeLineChart = null;
let allResults = [];
let currentFilter = 'all';
let selectedProfile = '';
let bestGeneralOption = null;

// formatarCampoMoeda - essa função me salvou de muito bugs chatos!
function formatarCampoMoeda(value) {
    // Remove tudo que não é dígito
    let number = value.replace(/\D/g, '');
    
    // Se vazio, retorna vazio
    if (!number || number === '0') return '';
    
    // Converte para centavos
    number = (parseFloat(number) / 100).toFixed(2);
    
    // Formata com separadores brasileiros
    return 'R$ ' + number.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parseCurrencyValue(value) {
    if (!value) return 0;
    // Remove R$, espaços, pontos e substitui vírgula por ponto
    return parseFloat(value.replace(/R\$\s?/g, '').replace(/\./g, '').replace(',', '.')) || 0;
}

// CORREÇÃO CRÍTICA: Configuração de máscaras mais robusta
function setupCurrencyMasks() {
    console.log('🔧 Configurando máscaras de moeda...');
    
    const currencyInputs = document.querySelectorAll('.currency-input');
    
    currencyInputs.forEach((input) => {
        // Define valores iniciais
        if (input.id.includes('initial')) {
            input.value = 'R$ 10.000,00';
        } else if (input.id.includes('monthly')) {
            input.value = 'R$ 1.000,00';
        }
        
        // Handler para input
        input.addEventListener('input', function(e) {
            const cursorPosition = e.target.selectionStart;
            const oldValue = e.target.value;
            const oldLength = oldValue.length;
            
            // Aplicar formatação
            const newValue = formatarCampoMoeda(e.target.value);
            if (newValue !== oldValue) {
                e.target.value = newValue;
                
                // Ajustar cursor
                const newLength = newValue.length;
                const lengthDiff = newLength - oldLength;
                const newCursorPosition = Math.min(newLength, Math.max(3, cursorPosition + lengthDiff));
                
                setTimeout(() => {
                    try {
                        e.target.setSelectionRange(newCursorPosition, newCursorPosition);
                    } catch (err) {
                        // Ignore cursor position errors
                    }
                }, 0);
            }
        });
        
        // Handler para blur (quando sai do campo)
        input.addEventListener('blur', function(e) {
            if (!e.target.value || e.target.value === 'R$ ') {
                if (input.id.includes('initial')) {
                    e.target.value = 'R$ 10.000,00';
                } else if (input.id.includes('monthly')) {
                    e.target.value = 'R$ 1.000,00';
                }
            }
        });
    });
    
    console.log('✅ Máscaras de moeda configuradas');
}

// CORREÇÃO CRÍTICA DE NAVEGAÇÃO: Função simplificada e mais robusta
function setupTabNavigation() {
    console.log('🔧 Configurando navegação de abas...');
    
    // Usar addEventListener com event delegation
    document.addEventListener('click', function(event) {
        if (event.target.matches('.tab-btn')) {
            event.preventDefault();
            
            const targetTab = event.target.getAttribute('data-tab');
            console.log(`🔄 Aba clicada: ${targetTab}`);
            
            // Remover active de todos os botões
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Adicionar active ao botão clicado
            event.target.classList.add('active');
            
            // Esconder todos os conteúdos
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar conteúdo alvo
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log(`✅ Aba alterada para: ${targetTab}`);
            }
        }
    });

    console.log(`✅ Navegação de abas configurada`);
}

function populateInvestmentTypes() {
    console.log(`🔧 Populando dropdown de tipos de investimento...`);

    const select = document.getElementById('individual-type');
    
    if (!select) {
        console.error('❌ Elemento select não encontrado');
        return;
    }
    
    try {
        // Limpar opções existentes
        select.innerHTML = '';
        
        // Adicionar opção placeholder
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Selecione um tipo';
        placeholder.disabled = true;
        placeholder.selected = true;
        select.appendChild(placeholder);
        
        // Agrupar investimentos por categoria
        const grouped = {};
        investmentTypes.forEach(type => {
            if (!grouped[type.category]) {
                grouped[type.category] = [];
            }
            grouped[type.category].push(type);
        });
        
        // Criar optgroups
        Object.entries(grouped).forEach(([category, types]) => {
            const categoryLabel = categoryNames[category] || category;
            
            const optgroup = document.createElement('optgroup');
            optgroup.label = categoryLabel;
            
            types.forEach(type => {
                const option = document.createElement('option');
                option.value = type.name;
                option.textContent = type.institution !== 'Geral' ? 
                    `${type.name} (${type.institution})` : type.name;
                
                optgroup.appendChild(option);
            });
            
            select.appendChild(optgroup);
        });
        
        console.log(`Dropdown populado com ${investmentTypes.length} opções`);
        
    } catch (error) {
        console.error(`Erro ao popular dropdown: ${error}`);
    }
}

function setupInvestmentTypeHandler() {
    const typeSelect = document.getElementById('individual-type');
    if (!typeSelect) return;
    
    typeSelect.addEventListener('change', function() {
        const selectedValue = this.value;
        console.log(`Tipo de investimento alterado: "${selectedValue}"`);
        
        if (selectedValue) {
            const selectedType = investmentTypes.find(type => type.name === selectedValue);
            if (selectedType) {
                updateRateField(selectedType);
                showInvestmentInfo(selectedType);
            }
        } else {
            hideInvestmentInfo();
        }
    });
}

function setupProfileHandler() {
    const profileSelect = document.getElementById('investor-profile');
    if (!profileSelect) return;
    
    profileSelect.addEventListener('change', function() {
        selectedProfile = this.value;
        console.log(`Perfil selecionado: ${selectedProfile}`);
        
        if (selectedProfile) {
            if (allResults.length > 0) {
                atualizarCardMelhorPerfil();
            }
            
            const profileFilterBtn = document.getElementById('profile-filter-btn');
            if (profileFilterBtn) {
                const profileInfo = investorProfiles[selectedProfile];
                profileFilterBtn.textContent = `Para Perfil ${profileInfo.name}`;
            }
            
            if (currentFilter === 'profile') {
                applyCurrentFilter();
            }
        } else {
            document.getElementById('best-profile-name').textContent = 'Selecione um perfil';
            document.getElementById('best-profile-value').textContent = 'R$ 0,00';
            document.getElementById('profile-description').textContent = 'Compatível com seu perfil de risco';
        }
    });
}

// atualizarCardMelhorPerfil - Essa função me deu trabalho mas funcionou!
function atualizarCardMelhorPerfil() {
    if (!selectedProfile || allResults.length === 0) {
        return;
    }
    
    try {
        const profileInfo = investorProfiles[selectedProfile];
        const allowedRisks = profileInfo.allowedRisks;
        
        // Filtrar por níveis de risco compatíveis
        const compatibleResults = allResults.filter(result => {
            const investment = investmentTypes.find(inv => inv.name === result.name);
            return investment && allowedRisks.includes(investment.riskLevel);
        });
        
        if (compatibleResults.length === 0) {
            document.getElementById('best-profile-name').textContent = 'Nenhum compatível';
            document.getElementById('best-profile-value').textContent = 'R$ 0,00';
            document.getElementById('profile-description').textContent = 'Nenhum investimento compatível com o perfil';
            return;
        }
        
        // Ordenar por valor final líquido (melhor primeiro)
        compatibleResults.sort((a, b) => b.finalAmountNet - a.finalAmountNet);
        const bestForProfile = compatibleResults[0];
        
        // Atualizar o card
        document.getElementById('best-profile-name').textContent = bestForProfile.name;
        document.getElementById('best-profile-value').textContent = formatCurrency(bestForProfile.finalAmountNet);
        document.getElementById('profile-description').textContent = `Melhor opção para perfil ${profileInfo.name.toLowerCase()}`;
        
    } catch (error) {
        console.error('Erro ao atualizar melhor para perfil:', error);
    }
}

function setupFilterHandlers() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            const filter = e.target.dataset.filter;
            
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            currentFilter = filter;
            applyCurrentFilter();
        }
    });
}

function applyCurrentFilter() {
    if (allResults.length === 0) return;
    
    let filteredResults = [...allResults];
    let titleSuffix = '';
    
    if (currentFilter === 'profile' && selectedProfile) {
        const profileInfo = investorProfiles[selectedProfile];
        const allowedRisks = profileInfo.allowedRisks;
        
        filteredResults = allResults.filter(result => {
            const investment = investmentTypes.find(inv => inv.name === result.name);
            return investment && allowedRisks.includes(investment.riskLevel);
        });
        
        titleSuffix = ` - Perfil ${profileInfo.name}`;
    }
    
    atualizarCardsMelhores(filteredResults);
    updateComparativeBarChart(filteredResults, titleSuffix);
    updateComparativeLineChart(filteredResults, titleSuffix);
    
    const tableTitle = document.getElementById('table-title');
    const resultsCount = document.getElementById('results-count');
    
    if (tableTitle) {
        tableTitle.textContent = `Ranking por Rentabilidade Líquida${titleSuffix}`;
    }
    
    if (resultsCount) {
        resultsCount.textContent = `${filteredResults.length} investimentos`;
    }
}

// CORREÇÃO CRÍTICA: Configuração de formulários com event delegation
function setupForms() {
    console.log('🔧 Configurando formulários...');
    
    // Usar event delegation para formulários
    document.addEventListener('submit', function(e) {
        if (e.target.id === 'individual-form') {
            e.preventDefault();
            handleIndividualSimulation();
        } else if (e.target.id === 'comparative-form') {
            e.preventDefault();
            handleComparativeSimulation();
        }
    });
    
    // Botão de exportar
    document.addEventListener('click', function(e) {
        if (e.target.id === 'export-csv') {
            exportToCSV();
        }
    });
    
    console.log('✅ Formulários configurados');
}

// Manipuladores de formulário
function handleIndividualSimulation() {
    console.log('📊 Calculando simulação...');
    
    try {
        const formData = {
            initialAmount: parseCurrencyValue(document.getElementById('individual-initial').value),
            monthlyAmount: parseCurrencyValue(document.getElementById('individual-monthly').value),
            period: parseInt(document.getElementById('individual-period').value) || 0,
            type: document.getElementById('individual-type').value,
            rate: parseFloat(document.getElementById('individual-rate').value) || 0
        };
        
        console.log('📋 Dados do formulário:', formData);
        
        if (!validateIndividualForm(formData)) return;
        
        const selectedType = investmentTypes.find(type => type.name === formData.type);
        if (!selectedType) {
            showToast('Tipo de investimento não encontrado');
            return;
        }
        
        const monthlyRate = calculateMonthlyRate(selectedType, formData.rate);
        const simulation = runSimulation(formData.initialAmount, formData.monthlyAmount, formData.period, monthlyRate, selectedType);
        
        displayIndividualResults(simulation, formData.type);
        
        console.log('✅ Simulação individual completada');
        
    } catch (error) {
        console.error('❌ Erro na simulação individual:', error);
        showToast('Erro ao executar simulação: ' + error.message);
    }
}

function handleComparativeSimulation() {
    console.log('📊 Calculando múltiplos investimentos, vai dar bom!');
    
    try {
        const formData = {
            initialAmount: parseCurrencyValue(document.getElementById('comparative-initial').value),
            monthlyAmount: parseCurrencyValue(document.getElementById('comparative-monthly').value),
            period: parseInt(document.getElementById('comparative-period').value) || 0
        };
        
        if (!validateComparativeForm(formData)) return;
        
        selectedProfile = document.getElementById('investor-profile').value;
        if (!selectedProfile) {
            showToast('Selecione seu perfil de investidor');
            return;
        }
        
        console.log(`🎯 Perfil escolhido: ${selectedProfile}`);
        
        allResults = [];
        
        investmentTypes.forEach((type, index) => {
            console.log(`📈 Simulando ${index + 1}/${investmentTypes.length}: ${type.name}`);
            
            const monthlyRate = calculateMonthlyRate(type, type.defaultRate);
            const simulation = runSimulation(formData.initialAmount, formData.monthlyAmount, formData.period, monthlyRate, type);
            
            allResults.push({
                name: type.name,
                institution: type.institution,
                category: type.category,
                riskLevel: type.riskLevel,
                finalAmount: simulation.finalAmount,
                finalAmountNet: simulation.finalAmountNet,
                totalInvested: simulation.totalInvested,
                totalTaxes: simulation.totalTaxes,
                yield: simulation.yield,
                yieldNet: simulation.yieldNet,
                yearlyData: simulation.yearlyData,
                taxType: type.taxType,
                hasIOF: type.hasIOF
            });
        });
        
        // Ordenar por valor final líquido
        allResults.sort((a, b) => b.finalAmountNet - a.finalAmountNet);
        
        // Definir melhor opção geral (FIXO - nunca muda)
        bestGeneralOption = allResults[0];
        
        displayComparativeResults();
        
    } catch (error) {
        console.error('❌ Erro na simulação comparativa:', error);
        showToast('Erro ao executar comparação: ' + error.message);
    }
}

function displayComparativeResults() {
    try {
        // Atualizar melhor opção geral (SEMPRE a mesma - FIXO)
        document.getElementById('best-general-name').textContent = bestGeneralOption.name;
        document.getElementById('best-general-value').textContent = formatCurrency(bestGeneralOption.finalAmountNet);
        
        // Atualizar melhor para perfil imediatamente
        atualizarCardMelhorPerfil();
        
        // Mostrar todos os resultados inicialmente
        currentFilter = 'all';
        applyCurrentFilter();
        
        // Mostrar seção de resultados
        const resultsSection = document.getElementById('comparative-results');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
        }
        
    } catch (error) {
        console.error('❌ Erro ao exibir resultados comparativos:', error);
    }
}

// Funções de cálculo
function calculateMonthlyRate(type, inputRate) {
    switch(type.frequency) {
        case 'annual':
            return Math.pow(1 + (inputRate / 100), 1/12) - 1;
        case 'monthly':
            return inputRate / 100;
        case 'cdi-percent':
            const cdiMonthlyRate = Math.pow(1 + cdiRate, 1/12) - 1;
            return cdiMonthlyRate * (inputRate / 100);
        default:
            return 0;
    }
}

function calculateIRRate(days) {
    for (const bracket of irTable) {
        if (days >= bracket.minDays && days <= bracket.maxDays) {
            return bracket.rate;
        }
    }
    return 0.15;
}

function calculateIOFRate(days) {
    if (days > 30) return 0;
    const iofData = iofTable.find(item => item.day === days);
    return iofData ? iofData.rate : 0;
}

function calculateTaxes(grossReturn, days, taxType, hasIOF) {
    let irTax = 0;
    let iofTax = 0;
    
    if (taxType === 'regressivo') {
        const irRate = calculateIRRate(days);
        irTax = grossReturn * irRate;
    } else if (taxType === 'acoes') {
        irTax = grossReturn * 0.15;
    }
    
    if (hasIOF && days <= 30) {
        const iofRate = calculateIOFRate(days);
        iofTax = grossReturn * iofRate;
    }
    
    return { irTax, iofTax, totalTax: irTax + iofTax };
}

// TODO: Talvez otimizar isso aqui depois, mas está funcionando bem
function runSimulation(initialAmount, monthlyAmount, periodYears, monthlyRate, investmentType) {
    const totalMonths = periodYears * 12;
    const totalDays = periodYears * 365;
    let balance = initialAmount;
    const yearlyData = [];
    let cumulativeInvested = initialAmount;
    let cumulativeInterest = 0;
    
    for (let year = 1; year <= periodYears; year++) {
        let yearlyInvested = year === 1 ? initialAmount : 0;
        let yearlyInterest = 0;
        
        for (let month = 1; month <= 12; month++) {
            const monthlyInterest = balance * monthlyRate;
            balance += monthlyInterest;
            yearlyInterest += monthlyInterest;
            cumulativeInterest += monthlyInterest;
            
            balance += monthlyAmount;
            yearlyInvested += monthlyAmount;
            cumulativeInvested += monthlyAmount;
        }
        
        const taxes = calculateTaxes(cumulativeInterest, totalDays, investmentType.taxType, investmentType.hasIOF);
        const netBalance = balance - taxes.totalTax;
        
        yearlyData.push({
            year: year,
            invested: cumulativeInvested,
            interest: yearlyInterest,
            balance: balance,
            balanceNet: netBalance,
            taxes: taxes.totalTax
        });
    }
    
    const totalInvested = initialAmount + (monthlyAmount * totalMonths);
    const finalAmount = balance;
    const grossReturn = finalAmount - totalInvested;
    
    const finalTaxes = calculateTaxes(grossReturn, totalDays, investmentType.taxType, investmentType.hasIOF);
    const finalAmountNet = finalAmount - finalTaxes.totalTax;
    const netReturn = finalAmountNet - totalInvested;
    
    const yieldPercentage = totalInvested > 0 ? (grossReturn / totalInvested) * 100 : 0;
    const yieldNetPercentage = totalInvested > 0 ? (netReturn / totalInvested) * 100 : 0;
    
    return {
        totalInvested,
        finalAmount,
        finalAmountNet,
        totalTaxes: finalTaxes.totalTax,
        yield: yieldPercentage,
        yieldNet: yieldNetPercentage,
        yearlyData
    };
}

function updateRateField(type) {
    const rateInput = document.getElementById('individual-rate');
    const rateLabel = document.getElementById('individual-rate-label');
    
    if (!rateInput || !rateLabel) return;
    
    switch(type.frequency) {
        case 'annual':
            rateInput.value = type.defaultRate.toFixed(2);
            rateLabel.textContent = 'Taxa (% ao ano)';
            break;
        case 'monthly':
            rateInput.value = type.defaultRate.toFixed(2);
            rateLabel.textContent = 'Taxa (% ao mês)';
            break;
        case 'cdi-percent':
            rateInput.value = type.defaultRate.toFixed(0);
            rateLabel.textContent = 'Percentual do CDI (%)';
            break;
    }
}

function showInvestmentInfo(type) {
    const elements = {
        panel: document.getElementById('investment-info'),
        badge: document.getElementById('risk-badge'),
        description: document.getElementById('risk-description'),
        ir: document.getElementById('ir-info'),
        iof: document.getElementById('iof-info')
    };
    
    if (!elements.panel) return;
    
    try {
        const riskInfo = riskLevels[type.riskLevel];
        if (riskInfo && elements.badge && elements.description) {
            elements.badge.textContent = riskInfo.name;
            elements.badge.className = `risk-badge ${type.riskLevel.replace('_', '-')}`;
            elements.description.textContent = riskInfo.description;
        }
        
        if (elements.ir) {
            switch(type.taxType) {
                case 'regressivo':
                    elements.ir.textContent = 'Tabela regressiva (22,5% a 15%)';
                    elements.ir.className = 'tax-value status--warning';
                    break;
                case 'isento':
                case 'dividendo_isento':
                    elements.ir.textContent = 'Isento';
                    elements.ir.className = 'tax-value status--success';
                    break;
                case 'acoes':
                    elements.ir.textContent = '15% sobre ganho capital';
                    elements.ir.className = 'tax-value status--warning';
                    break;
                default:
                    elements.ir.textContent = 'Consulte legislação';
                    elements.ir.className = 'tax-value status--info';
            }
        }
        
        if (elements.iof) {
            if (type.hasIOF) {
                elements.iof.textContent = 'Aplicável nos primeiros 30 dias';
                elements.iof.className = 'tax-value status--warning';
            } else {
                elements.iof.textContent = 'Não aplicável';
                elements.iof.className = 'tax-value status--success';
            }
        }
        
        elements.panel.classList.remove('hidden');
        
    } catch (error) {
        console.error('❌ Erro ao mostrar informações do investimento:', error);
    }
}

function hideInvestmentInfo() {
    const panel = document.getElementById('investment-info');
    if (panel) {
        panel.classList.add('hidden');
    }
}

// Funções de validação
function validateIndividualForm(data) {
    if (data.initialAmount < 0 || data.monthlyAmount < 0) {
        showToast('Os valores de aporte não podem ser negativos');
        return false;
    }
    if (data.period <= 0 || data.period > 50) {
        showToast('O prazo deve estar entre 1 e 50 anos');
        return false;
    }
    if (!data.type) {
        showToast('Selecione um tipo de investimento');
        return false;
    }
    if (data.rate <= 0) {
        showToast('A taxa deve ser maior que zero');
        return false;
    }
    if (data.initialAmount === 0 && data.monthlyAmount === 0) {
        showToast('Informe pelo menos um aporte (inicial ou mensal)');
        return false;
    }
    return true;
}

function validateComparativeForm(data) {
    if (data.initialAmount < 0 || data.monthlyAmount < 0) {
        showToast('Os valores de aporte não podem ser negativos');
        return false;
    }
    if (data.period <= 0 || data.period > 50) {
        showToast('O prazo deve estar entre 1 e 50 anos');
        return false;
    }
    if (data.initialAmount === 0 && data.monthlyAmount === 0) {
        showToast('Informe pelo menos um aporte (inicial ou mensal)');
        return false;
    }
    return true;
}

// Funções de exibição
function displayIndividualResults(simulation, investmentType) {
    try {
        document.getElementById('individual-total-invested').textContent = formatCurrency(simulation.totalInvested);
        document.getElementById('individual-final-amount').textContent = formatCurrency(simulation.finalAmountNet);
        document.getElementById('individual-yield').textContent = `${simulation.yieldNet.toFixed(2)}%`;
        document.getElementById('individual-taxes').textContent = formatCurrency(simulation.totalTaxes);
        
        updateIndividualTable(simulation.yearlyData);
        updateIndividualChart(simulation.yearlyData, investmentType);
        
        document.getElementById('individual-results').classList.remove('hidden');
    } catch (error) {
        console.error('❌ Erro ao exibir resultados individuais:', error);
    }
}

function updateIndividualTable(yearlyData) {
    try {
        const tbody = document.querySelector('#individual-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        yearlyData.forEach(data => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${data.year}</td>
                <td>${formatCurrency(data.invested)}</td>
                <td>${formatCurrency(data.interest)}</td>
                <td class="net-column">${formatCurrency(data.balanceNet)}</td>
                <td class="tax-column">${formatCurrency(data.taxes)}</td>
            `;
        });
    } catch (error) {
        console.error('❌ Erro ao atualizar tabela individual:', error);
    }
}

// atualizarCardsMelhores - renomeei essa função como solicitado
function atualizarCardsMelhores(results) {
    try {
        const tbody = document.querySelector('#comparative-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        results.forEach((result, index) => {
            const investment = investmentTypes.find(inv => inv.name === result.name);
            const riskInfo = riskLevels[investment.riskLevel];
            
            const row = tbody.insertRow();
            
            const taxIndicator = (result.taxType === 'isento' || result.taxType === 'dividendo_isento') ? 
                '<span class="status status--success">Isento IR</span>' : 
                '<span class="status status--warning">Tribut. IR</span>';
            
            const institutionInfo = result.institution !== 'Geral' ? ` - ${result.institution}` : '';
            
            row.innerHTML = `
                <td>${index + 1}º</td>
                <td>
                    <div class="investment-type">
                        <span class="type-indicator ${(result.taxType === 'isento' || result.taxType === 'dividendo_isento') ? 'type-indicator--exempt' : 'type-indicator--taxed'}"></span>
                        ${result.name}${institutionInfo}
                        ${taxIndicator}
                    </div>
                </td>
                <td>
                    <div class="risk-cell">
                        <span class="risk-dot ${investment.riskLevel.replace('_', '-')}"></span>
                        <span class="risk-label">${riskInfo.name}</span>
                    </div>
                </td>
                <td class="net-column">${formatCurrency(result.finalAmountNet)}</td>
                <td>${result.yieldNet.toFixed(2)}%</td>
            `;
            
            if (index === 0) row.classList.add('rank-1', 'best-investment');
            else if (index === 1) row.classList.add('rank-2');
            else if (index === 2) row.classList.add('rank-3');
        });
    } catch (error) {
        console.error('❌ Erro ao atualizar tabela comparativa:', error);
    }
}

// Funções de gráfico
function updateIndividualChart(yearlyData, investmentType) {
    try {
        const ctx = document.getElementById('individual-chart').getContext('2d');
        if (individualChart) individualChart.destroy();
        
        const labels = yearlyData.map(data => `Ano ${data.year}`);
        const balanceData = yearlyData.map(data => data.balanceNet);
        const investedData = yearlyData.map(data => data.invested);
        
        individualChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Montante Líquido',
                        data: balanceData,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Total Investido',
                        data: investedData,
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: `Evolução Líquida - ${investmentType}` },
                    legend: { display: true, position: 'bottom' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return formatCurrency(value); } }
                    }
                }
            }
        });
    } catch (error) {
        console.error('❌ Erro no gráfico individual:', error);
    }
}

function updateComparativeBarChart(results, titleSuffix = '') {
    try {
        const ctx = document.getElementById('comparative-bar-chart').getContext('2d');
        if (comparativeBarChart) comparativeBarChart.destroy();
        
        const topResults = results.slice(0, 10);
        const labels = topResults.map(r => r.name);
        const data = topResults.map(r => r.finalAmountNet);
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];
        
        comparativeBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Montante Líquido Final',
                    data: data,
                    backgroundColor: colors.slice(0, topResults.length),
                    borderColor: colors.slice(0, topResults.length),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: `Top 10 - Ranking por Rentabilidade Líquida${titleSuffix}` },
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return formatCurrency(value); } }
                    },
                    x: { ticks: { maxRotation: 45, minRotation: 45 } }
                }
            }
        });
    } catch (error) {
        console.error('❌ Erro no gráfico de barras:', error);
    }
}

function updateComparativeLineChart(results, titleSuffix = '') {
    try {
        const ctx = document.getElementById('comparative-line-chart').getContext('2d');
        if (comparativeLineChart) comparativeLineChart.destroy();
        
        const maxYears = Math.max(...results.map(r => r.yearlyData.length));
        const labels = Array.from({length: maxYears}, (_, i) => `Ano ${i + 1}`);
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];
        
        const datasets = results.slice(0, 8).map((result, index) => ({
            label: result.name,
            data: result.yearlyData.map(data => data.balanceNet),
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length] + '20',
            fill: false,
            tension: 0.4
        }));
        
        comparativeLineChart = new Chart(ctx, {
            type: 'line',
            data: { labels: labels, datasets: datasets },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: `Evolução Temporal Líquida (Top 8)${titleSuffix}` },
                    legend: { display: true, position: 'bottom' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { callback: function(value) { return formatCurrency(value); } }
                    }
                }
            }
        });
    } catch (error) {
        console.error('❌ Erro no gráfico de linha:', error);
    }
}

// Funções utilitárias
function exportToCSV() {
    try {
        const table = document.getElementById('comparative-table');
        if (!table) return;
        
        const rows = Array.from(table.querySelectorAll('tr'));
        
        const csvContent = rows.map(row => {
            const cols = Array.from(row.querySelectorAll('th, td'));
            return cols.map(col => {
                const cleanText = col.textContent.trim().replace(/\s+/g, ' ').replace(/"/g, '""');
                return `"${cleanText}"`;
            }).join(',');
        }).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'comparativo_investimentos_liquidos.csv');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('❌ Erro ao exportar CSV:', error);
    }
}

// Sistema de notificação que nunca me decepcionou!
function showToast(message) {
    try {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toast-message');
        
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.classList.remove('hidden');
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.classList.add('hidden'), 300);
            }, 3000);
        }
    } catch (error) {
        console.error('❌ Erro no toast:', error);
    }
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// INICIALIZAÇÃO ROBUSTA COM MÚLTIPLAS TENTATIVAS
function initializeApp() {
    console.log('🚀 Iniciando aplicação com pequenos ajustes humanizados...');
    
    try {
        // Aguardar um pouquinho para garantir que tudo está carregado
        setTimeout(() => {
            setupCurrencyMasks();
            setupTabNavigation();
            populateInvestmentTypes();
            setupInvestmentTypeHandler();
            setupProfileHandler();
            setupFilterHandlers();
            setupForms();
            
            console.log('✅ Sim-Invest inicializado com sucesso!');
        }, 100);
        
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
        // Tentar novamente após um delay
        setTimeout(initializeApp, 500);
    }
}

// Múltiplas formas de inicialização para garantir compatibilidade
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Fallback adicional
window.addEventListener('load', function() {
    // Verificar se já foi inicializado
    if (!document.querySelector('.tab-btn[data-tab]').onclick) {
        initializeApp();
    }
});