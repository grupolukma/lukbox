google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawDonutChart);

function drawDonutChart() {
  //var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1HB25yOvL6KdnlJC3LQqxNLabegorlH5h3wftZ4d51Ds/gviz/tq?tqx=out:csv&sheet=dia');
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1fqr5XUsXZDRvgHturZAzeg-kPKFGX-hjUhUPT7HjxMs/gviz/tq?tqx=out:csv&sheet=dia');
  
  query.send(function(response) {
    if (response.isError()) {
      console.error('Erro ao carregar dados da planilha: ' + response.getMessage());
      return;
    }

    var data = response.getDataTable();
    
    // var linha0=0
    // var coluna0=0
    var linhaValor=0
    var colunaValor=1
    var linhaDia=0
    var colunaDia=0


   dayName = new Array ("DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO")

  var valor=data.getValue(linhaValor,colunaValor)
  var valorDia= data.getValue(linhaDia,colunaDia)
  const date = new Date(valorDia).toLocaleDateString('en-GB');
  const semana = dayName[valorDia.getDay()];

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'x');
  data.addColumn('number', 'Producão');
  data.addColumn({type: 'string', role: 'annotation'});

        data.addRow(['', valor,''+valor]);
    

    // var valor0=data.getValue(linha0,coluna0)


    var options = {
      colors: ['#1e2d3b'],
      hAxis: {
        minValue: 0,
        maxValue: 10,
        ticks: [0, 5, 10],
      },

      annotations: {
        alwaysOutside: true,
        textStyle: {
          fontSize:25,
          bold: true,
          opacity: 0.8,
          // auraColor: 'white'
        },
      },
      title: 'GRÁFICO - '+semana+' '+date,
      titleTextStyle: {bold: true},
      legend: 'none',
      
     backgroundColor: 'transparent',
     fontSize: 20,

    };
    var chart = new google.visualization.BarChart(document.getElementById('dia-chart'));
    chart.draw(data, options);
  });
}
