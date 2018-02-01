'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var PLAYERS_Y = 255;

var BAR_WIDTH = 40;
var MAX_BAR = 150;
var BAR_Y = 250;

var GAP = 50;
var TIME_GAP = 230;
var PADDING_LEFT = 100;

var renderCloud = function (x, y, color, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {

  //  настройки окна
  ctx.strokeRect(100, 10, CLOUD_WIDTH, CLOUD_HEIGHT);

  var statWindowShadow = renderCloud(110, 20, 'rgba(0, 0, 0, 0.7)', ctx);
  var statWindow = renderCloud(100, 10, '#fff', ctx);

  //  текст сообщения
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура, вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  //  гистограмма

  //  находим наибольшее время
  var getMaxElement = function (times) {
    var maxElement = times[0];

    for (var i = 0; i < times.length; i++) {
      if (times[i] > maxElement) {
        maxElement = times[i];
      }
    }
    return maxElement;
  };

  var maxTime = getMaxElement(times);

    //  получаем случайное значение для непрозрачности
  var getRandomNumber = function() {
    return Math.random();
  };

 var randomNumber = getRandomNumber();

  //  рисуем гистограмму
  for (var j = 0; j < names.length; j++) {

    var barLength = MAX_BAR * times[j] / maxTime

    ctx.fillStyle = '#000';
    ctx.fillText(names[j], PADDING_LEFT + GAP * (j + 1) + BAR_WIDTH * j, PLAYERS_Y);
    ctx.fillText(Math.round(times[j]), PADDING_LEFT + GAP * (j + 1) + BAR_WIDTH * j, -barLength + TIME_GAP);
    ctx.fillStyle = 'rgba(0, 0, 255, 1)';

    if (names[j] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillRect(PADDING_LEFT + GAP * (j + 1) + BAR_WIDTH * j, BAR_Y, BAR_WIDTH, -barLength);
  }
};
