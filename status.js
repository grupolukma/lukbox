google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1HB25yOvL6KdnlJC3LQqxNLabegorlH5h3wftZ4d51Ds/gviz/tq?tqx=out:csv&sheet=Sheet1');

    query.send(handleQueryResponseStatus);
}

function handleQueryResponseStatus(response) {
    if (response.isError()) {
        console.log('Erro ao carregar os dados da planilha: ' + response.getMessage());
        return;
    }

    var data = response.getDataTable();
    var statusColumnIndex = 1; // Índice da coluna com o status (0 para a primeira coluna, 1 para a segunda, etc.)

    var container = document.getElementById('status-container');

    // Cria um elemento <h2> para o título "Status"
    var titleElement = document.createElement('h2');
    titleElement.textContent = 'STATUS';
    titleElement.style.fontSize = '2.5rem'; // Define o tamanho da fonte como 15 pixels

    // Adiciona o título ao container
    container.appendChild(titleElement);

    for (var i = 0; i < data.getNumberOfRows(); i++) {
        var status = data.getValue(i, statusColumnIndex);
        var label = data.getValue(i, 0);

        var statusCircleContainer = document.createElement('div');
        var statusDiv = document.createElement('div');
        var labelDiv = document.createElement('div');

        statusCircleContainer.className = 'status-circle-container';
        statusDiv.className = 'status-circle';
        statusDiv.style.backgroundColor = getStatusColor(status);
        labelDiv.className = 'status-label';
        labelDiv.textContent = label;

        statusCircleContainer.appendChild(statusDiv);
        statusCircleContainer.appendChild(labelDiv);

        container.appendChild(statusCircleContainer);
    }
}

function getStatusColor(status) {
    var numericStatus = parseFloat(status); // Converte o status para um número

    if (numericStatus >= 10.54) {
        return '#00258b'; 
    } else if (numericStatus >= 10.36) {
        return '#00ffea'; 
    } else if (numericStatus >= 10.18) {
        return '#40b40d'; 
    } else if (numericStatus >= 10) {
        return '#4bee00'; 
    } else if (numericStatus >= 9.82) {
        return '#FFFF00'; 
    } else if (numericStatus >= 9.64) {
        return '#EE7600'; 
    } else if (numericStatus <= 9.64 && numericStatus != 0) {
        return 'red';
    } else {
        return 'black'; // Se nenhum dos critérios for atendido, retorna vermelho
    }
}
