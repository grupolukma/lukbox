const sheetId = '1R3wJ34DinqRfVmJ9e30VxM2TGRhwokFLSgbn3k7TNsA';  // Substitua pelo seu ID da planilha
const nomeAba = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');  // Nome da aba (data atual)
const apiKey = 'AIzaSyBY5nGwFZ4s1iWSJE8j6eRUvCpqMBFS1n0';  // Substitua pela sua chave da API

const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${nomeAba}?key=${apiKey}`;

// Função para carregar os dados da planilha
async function carregarDados() {
    try {
        const response = await fetch(sheetUrl);
        if (!response.ok) {
            throw new Error(`Erro ao acessar a planilha: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data); // Debug: mostra os dados

        // Obter categorias da coluna A e valores da coluna C
        const categorias = [];
        const valores = [];

        data.values.forEach((linha, index) => {
            if (index > 0) { // Ignorar o cabeçalho
                categorias.push(linha[1]);  // Coluna B (categorias)
                valores.push(parseFloat(linha[2]));  // Coluna C (valores)
            }
        });

        // Preparar os dados para o gráfico
        const total = valores.reduce((acc, valor) => acc + valor, 0);
        const dataChart = categorias.map((categoria, index) => ({
            x: categoria,
            value: valores[index],
            percent: ((valores[index] / total) * 100).toFixed(2) + '%'  // Calcula a porcentagem
        }));

        // Mostrar a produção em tempo real da célula G4
        const producaoRealTime = data.values[3][6];  // A célula G4 corresponde à linha 4 e coluna 7 (index 6)
        console.log('Produção em tempo real:', producaoRealTime);

        // Criar gráfico de pizza 3D com AnyChart
        anychart.onDocumentReady(function () {
            // Criação do gráfico 3D
            const chart = anychart.pie3d(dataChart);  // Usando pie3d em vez de pie para gráfico 3D

            // Configurar título
            var title = chart.title();
            title.enabled(true);
            title.fontColor('white');
            title.fontWeight('bold');
            title.fontSize(35);
            title.text('PRODUÇÃO EM TEMPO REAL: '+producaoRealTime);

            // Configurar rótulos para mostrar as porcentagens em todas as fatias
            chart.labels()
                .format("{%x}\n{%percent}") // Exibe apenas a porcentagem
                .fontSize(30)         // Aumenta o tamanho da fonte
                .fontColor('black')
                .fontWeight('bold')   // Deixa em negrito
                .position("outside")  // Coloca os rótulos fora das fatias
                .anchor("center")     // Centraliza os rótulos
                .offsetX(20)          // Distância do centro da fatia
                .offsetY(0);          // Distância do centro da fatia (vertical)

            // Configurar a legenda para incluir a porcentagem
            chart.legend(true); // Ativa a legenda

            // Modifica a formatação da legenda para incluir a porcentagem
            chart.legend()
                .itemsFormat("{%x}: {%percent}")  // Formata cada item da legenda para mostrar a categoria e a porcentagem
                .position('right')  // Coloca a legenda à direita do gráfico
                .fontSize(20)
                .fontColor('white')
                .fontWeight('bold')
                .itemsLayout('vertical') // Coloca os itens da legenda em disposição vertical
                .align('top'); // Alinha a legenda ao topo

            // Conector
            chart.connectorStroke({ color: "black", thickness: 5, dash: "2 2" });

            // Tornar o fundo transparente
            chart.background().fill('transparent'); // Fundo transparente

            // Exibir o gráfico no contêiner
            chart.container('graficoPizza');
            chart.draw();
        });
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Carregar os dados e criar o gráfico
carregarDados();