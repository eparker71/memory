// shuffle cards
function shuffle(array) {
  //https://bost.ocks.org/mike/shuffle/
  var m = array.length,
    t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

$(document).ready(function () {
  var source = document.getElementById("card-template").innerHTML;
  var template = Handlebars.compile(source);

  var context = {
    icons: shuffle([{
        icon: "fa-thermometer"
      },
      {
        icon: "fa-bicycle"
      },
      {
        icon: "fa-instagram"
      },
      {
        icon: "fa-snowflake-o"
      },
      {
        icon: "fa-bank"
      },
      {
        icon: "fa-instagram"
      },
      {
        icon: "fa-snowflake-o"
      },
      {
        icon: "fa-bank"
      },
      {
        icon: "fa-joomla"
      },
      {
        icon: "fa-gavel"
      },
      {
        icon: "fa-bomb"
      },
      {
        icon: "fa-leanpub"
      },
      {
        icon: "fa-bath"
      },
      {
        icon: "fa-linux"
      },
      {
        icon: "fa-bed"
      },
      {
        icon: "fa-birthday-cake"
      },
      {
        icon: "fa-briefcase"
      },
      {
        icon: "fa-beer"
      },
      {
        icon: "fa-bus"
      },
      {
        icon: "fa-hourglass"
      },
      {
        icon: "fa-fighter-jet"
      },
      {
        icon: "fa-thermometer"
      },
      {
        icon: "fa-bicycle"
      },
      {
        icon: "fa-binoculars"
      },
      {
        icon: "fa-film"
      },
      {
        icon: "fa-bug"
      },
      {
        icon: "fa-binoculars"
      },
      {
        icon: "fa-film"
      },
      {
        icon: "fa-bug"
      },
      {
        icon: "fa-joomla"
      },
      {
        icon: "fa-gavel"
      },
      {
        icon: "fa-bomb"
      },
      {
        icon: "fa-leanpub"
      },
      {
        icon: "fa-bath"
      },
      {
        icon: "fa-linux"
      },
      {
        icon: "fa-bed"
      },
      {
        icon: "fa-birthday-cake"
      },
      {
        icon: "fa-briefcase"
      },
      {
        icon: "fa-beer"
      },
      {
        icon: "fa-bus"
      },
      {
        icon: "fa-hourglass"
      },
      {
        icon: "fa-fighter-jet"
      }
    ])
  };

  Handlebars.registerHelper('icon', function () {
    var icon = Handlebars.escapeExpression(this.icon);
    return new Handlebars.SafeString(icon);
  });
  var html = template(context);
  document.getElementById('card-grid').innerHTML = html;

  var stack = [];
  var found = 0;

  $('.flip-card-inner').click(function () {
    $(this).addClass('flipped');
    stack.push($(this));
    if (stack.length == 2) {
      if (stack[0].find("i").attr("class") == stack[1].find("i").attr("class")) {
        found += 1;
        $('#score').html(found);
      } else {
        var card1 = stack[0];
        var card2 = stack[1];
        setTimeout(function () {
          card1.removeClass('flipped');
          card2.removeClass('flipped');
        }, 1000);
      }
      stack = [];
    }
  });

});
