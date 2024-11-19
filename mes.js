google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawColumnChart);

function drawColumnChart() {
  var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1HB25yOvL6KdnlJC3LQqxNLabegorlH5h3wftZ4d51Ds/gviz/tq?tqx=out:csv&sheet=mes";

  var query = new google.visualization.Query(spreadsheetUrl);
  query.send(handleQueryResponseMes);
}

function handleQueryResponseMes(response) {
  if (response.isError()) {
    console.error('Erro ao buscar dados: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();

  // informa valor
  var linhaValor=0
  var colunaValor=1
  var linhaMes=0
  var colunaMes=0


  var valor=data.getValue(linhaValor,colunaValor)
  var valorMes=data.getValue(linhaMes,colunaMes)

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'x');
  data.addColumn('number', 'Producão');
  data.addColumn({type: 'string', role: 'annotation'});

        data.addRow([valorMes.toUpperCase(), valor,''+valor]);

  // Define as cores com base nos valores dos dados
  var colors = [];
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    var value = data.getValue(i, 1); // Supondo que a coluna com os valores esteja na coluna 1
    if (value >= 10.54) {
      colors.push('#00258b');
    } else if (value >= 10.36 && value <= 10.53) {
      colors.push('#00ffea');
    } else if (value >= 10.18 && value <= 10.35) {
      colors.push('#40b40d');
    } else if (value >= 10 && value <= 10.17) {
      colors.push('#4bee00');
    } else if (value >= 9.82 && value <= 9.99) {
      colors.push('#FFFF00');
    } else if (value >= 9.64 && value <= 9.81) {
        colors.push('#EE7600');
    } else {
      // Handle other cases here, if necessary
      colors.push('red'); // Default color for values not covered by your conditions
    }
  }

  var options = {
    title: 'GRÁFICO - MENSAL',
    titleTextStyle: {bold: true},
    

    backgroundColor: 'transparent',
    colors: colors, // Define as cores com base nos valores
    // pieSliceBorderColor: 'black', // Define a cor da borda do gráfico como preto
    // pieSliceTextStyle: {
    //   color: 'black' // Define a cor do texto das porcentagens como preto
    // },
    legend: 'none',
    fontSize: 20,
    hAxis:{
      textStyle:{
        bold:true,
      },
    },
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize:25,
        bold: true,
        opacity: 0.8,
        // auraColor: 'white'
      }
    },
    vAxis: {
        minValue: 0,
        maxValue: 10,
        ticks: [0, 5, 10, 15],
      },
  };

  var chart = new google.visualization.ColumnChart(document.getElementById('mes-container'));
  chart.draw(data, options);
}
