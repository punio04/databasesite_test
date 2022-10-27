//値をグラフに表示させる
Chart.plugins.register({
  afterDatasetsDraw: function (chart, easing) {
    var ctx = chart.ctx;

    chart.data.datasets.forEach(function (dataset, i) {
      var meta = chart.getDatasetMeta(i);
      if (!meta.hidden) {
        meta.data.forEach(function (element, index) {
          // 値の表示
          ctx.fillStyle = 'rgb(0, 0, 0,0.8)';//文字の色
          var fontSize = 12;//フォントサイズ
          var fontStyle = 'normal';//フォントスタイル
          var fontFamily = 'Arial';//フォントファミリー
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

          var dataString = dataset.data[index].toString();

          // 値の位置
          ctx.textAlign = 'center';//テキストを中央寄せ
          ctx.textBaseline = 'middle';//テキストベースラインの位置を中央揃え

          var padding = 5;//余白
          var position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);

        });
      }
    });
  }
});



//=========== 折れ線グラフ（複数） ============//
$('#chart02').on('inview', function (event, isInView) {//画面上に入ったらグラフを描画
  if (isInView) {

    var ctx = document.getElementById("chart02");//グラフを描画したい場所のid
    var chart = new Chart(ctx, {
      type: 'line',//グラフのタイプ
      data: {//グラフのデータ
        labels: ["3月","4月", "5月", "6月", "7月",],//データの名前
        datasets: [
          {
            label: "A",//グラフのタイトル
            borderColor: "rgba(39,163,255)",//グラフの線の色
            backgroundColor: "rgba(255,0,0,0)",//グラフの背景色透過
            data: ["0", "17", "5", "8", "11", "15",]//横列に並ぶデータ
          }, {
            label: "B",//グラフのタイトル
            borderColor: "rgba(227, 133, 241)",//グラフの線の色
            backgroundColor: "rgba(130,201,169,0)",//グラフの背景色透過
            data: ["0", "2", "4", "12", "3",]//横列に並ぶデータ
          }
        ]

      },
      options: {//グラフのオプション
        legend: {
          display: true//グラフの説明を表示
        },
        tooltips: {//グラフへカーソルを合わせた際のツールチップ詳細表示の設定
          callbacks: {
            label: function (tooltipItems, data) {
              if (tooltipItems.yLabel == "0") {
                return "";
              }
              return data.datasets[tooltipItems.datasetIndex].label + "：" + tooltipItems.yLabel + "";//Kgを最後につける
            }
          }

        },
        scales: {
          yAxes: [//グラフ縦軸（Y軸）設定
            {
              ticks: {
                beginAtZero: true,//0からスタート
                suggestedMax: 30,//最大が100
                suggestedMin: 0,//最小が0
                stepSize: 5,//5づつ数値が刻まれる
                callback: function (value) {
                  return value + ''//数字＋%で表示			
                }
              }
            }
          ],
          xAxes: [//棒グラフ横（X軸）設定
            {
              barPercentage: 0.5,//バーの太さ
            }
          ]
        }
      }
    });

  }
});





document.querySelector('.menu-btn').addEventListener('click', function () {
  document.querySelector('.menu').classList.toggle('is-active');
});