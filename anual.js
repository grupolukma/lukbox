// Coloque o código JavaScript que você forneceu aqui, com a alteração para renderizar o gráfico dentro de "chart-container".

google.charts.load('current', {'packages':['corechart']});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  //var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1HB25yOvL6KdnlJC3LQqxNLabegorlH5h3wftZ4d51Ds/gviz/tq?tqx=out:csv&sheet=anual";
  var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1fqr5XUsXZDRvgHturZAzeg-kPKFGX-hjUhUPT7HjxMs/gviz/tq?tqx=out:csv&sheet=anual";

  var query = new google.visualization.Query(spreadsheetUrl);
  query.send(handleQueryResponseAnual);
}

function handleQueryResponseAnual(response) {
  if (response.isError()) {
    console.error('Erro ao buscar dados: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();

  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  
  var coluna1 = 1;
  var numRows = data.getNumberOfRows();
  var data2 = new google.visualization.DataTable();
  data2.addColumn('string', 'x');
  data2.addColumn('number', 'Produção');
  data2.addColumn({ type: 'string', role: 'annotation' });
  data2.addColumn('number', 'Meta');

  for (var i = 0; i < numRows; i++) {
    var label = data.getValue(i, 0);
    var value = data.getValue(i, coluna1);
    data2.addRow([label, value, '' + value, 10]);
  }

  var options = {
    title: 'GRÁFICO - ANUAL '+anoAtual,
    titleTextStyle: {bold: true},
    fontSize: 20,
    // width: 800,
    // height: 400,
    backgroundColor: 'transparent',
    annotations: {
      textStyle: {
        fontSize: 30,
        bold: true,
        color: '#1e2d3b',
        opacity: 0.8
      }
    },
    legend: { position: 'top', alignment: 'center' },
    hAxis:{
      textStyle:{
        bold:true,
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

  var chart = new google.visualization.AreaChart(document.getElementById('anual-container'));
  chart.draw(data2, options);
}
