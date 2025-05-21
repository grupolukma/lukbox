// Coloque o código JavaScript que você forneceu aqui, com a alteração para renderizar o gráfico dentro de "chart-container".

google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
 // var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1HB25yOvL6KdnlJC3LQqxNLabegorlH5h3wftZ4d51Ds/gviz/tq?tqx=out:csv&sheet=dias";
 var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1fqr5XUsXZDRvgHturZAzeg-kPKFGX-hjUhUPT7HjxMs/gviz/tq?tqx=out:csv&sheet=dias";

  var query = new google.visualization.Query(spreadsheetUrl);
  query.send(handleQueryResponseDias);
}

function handleQueryResponseDias(response) {
  if (response.isError()) {
    console.error('Erro ao buscar dados: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  var colunaMes=0
  var valor=data.getColumnLabel(colunaMes).toUpperCase();

//   const dataAtual = new Date();
//   const anoAtual = dataAtual.getFullYear();
  
  var coluna1 = 1;
  var numRows = data.getNumberOfRows();
  var data2 = new google.visualization.DataTable();
  data2.addColumn('string', 'Dia');
  data2.addColumn('number', 'Produção');
  data2.addColumn({ type: 'string', role: 'annotation' });
  data2.addColumn('number', 'Meta');

  var valoresDias = [];

  for (var i = 0; i < numRows; i++) {
    var label = data.getValue(i, 0);
    var value = data.getValue(i, coluna1);
    data2.addRow([label, value, '' + value, 10]);
    valoresDias.push(label);
  
    // Adicione esta linha para definir o valor formatado na nova coluna
    data2.setFormattedValue(i, 0, label);
  }

  var options = {
    title: 'GRÁFICO - '+valor,
    titleTextStyle: {bold: true},
    fontSize: 20,
    // width: 800,
    // height: 400,
    backgroundColor: 'transparent',
    annotations: {
      textStyle: {
        fontSize: 23,
        bold: true,
        color: '#1e2d3b',
        opacity: 0.8
      }
    },
    legend: { position: 'top', alignment: 'center' },
    hAxis:{
      title: 'Dias',
      viewWindowMode: 'pretty',
      textStyle: {
      bold: true,
    },
    },
    vAxis: {
      minValue: 0,
      maxValue: 15,
      ticks: [0, 5, 10, 15],
      title: 'PRODUÇÃO'
    },
    series: {
      0: {
        color: '#1e2d3b',
        pointSize: 8,
      },
      1: {
        color: 'red',
        lineWidth: 1,
        visibleInLegend: true,
        areaOpacity: 0
      }
    },
  };

  var chart = new google.visualization.AreaChart(document.getElementById('dias-container'));
  chart.draw(data2, options);
}
