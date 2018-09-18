(function($) // début du pluggin
{
  // import {algo} from 'algo';
  var best_score_tmp;
  $.fn.game2048 = function() //function game2048 du pluggin
  {

    var sizetable;
    // génération du tableau (table, tr, td) vide (rempli de zéros)
    function generate_map(sizetable = 4)
    {
      this.sizetable = sizetable;
      var table = $('<table></table>');
      for (var y = 1; y <= sizetable; y++)
      {
        var ligne = $('<tr></tr>');
        for (var x = 1; x <= sizetable; x++)
        {
          var cases = $('<td></td>').attr('x', x).attr('y', y).attr('nbr', 0);
          ligne.append(cases);
        }
        table.append(ligne);
        table.addClass("table");
      }
      return table;
    }

    // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'
    function generate_case(cases = 1)
    {
      for (var i = 0; i < cases; i++)
      {
        var x = Math.floor((Math.random() * this.sizetable) + 1);
        var y = Math.floor((Math.random() * this.sizetable) + 1);
        var value =  2 * (Math.floor((Math.random() * 2) + 1));
        var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');
        // console.log(elem);
        if (!elem[0]) {
          if (is_empty() == true)
            generate_case(1);
        }
        else {
          if (value === 4 && Math.random() > 0.3) {
            value = 2;
          }
          elem.attr('nbr', value).text(value);
        }
      }
    }

    // fonction de gestion des évenements (appuie de touches)
    $('html').keydown(function(event) {
      console.log(event['key']);
      // var tabstory = $('table').;

      switch (event['key']) {
        case 'ArrowLeft':
          // console.log(isXleft_movable());
          if (isXleft_movable()) {
            Xleft();
            generate_case();
          }
          if (is_movable() == false)
            game_over();

          event.preventDefault();
          console.log("Left");
          break;
        case 'ArrowUp':
          // console.log(isYup_movable());
          if (isYup_movable()) {
            Yup();
            generate_case();
          }
          if (is_movable() == false)
            game_over();
          
          event.preventDefault();
          console.log("Up");
          break;
        case 'ArrowRight':
          // console.log(isXright_movable());
          if (isXright_movable()) {
            Xright();
            generate_case();
          }
          if (is_movable() == false)
            game_over();
          
          event.preventDefault();
          console.log("Right");
          break;
        case 'ArrowDown':
          // console.log(isYdown_movable());
          if (isYdown_movable()) {
            Ydown();
            generate_case();
          }
          if (is_movable() == false)
            game_over();
          
          event.preventDefault();
          console.log("Down");
          break;
        case 'Backspace':
          // insérer algo undo

          event.preventDefault(); //event.stopPropagation();
          console.log("Undo");
          break;
      }
      event.preventDefault();
      add_class();
      saving();
      cheatmode(event['key']);
      $('.score').text("Score : "+score);
      this.best_score = Math.max(score, tab_scores);
      console.log("math max "+Math.max(score, tab_scores));
      $('.best-score').text("Best score : "+this.best_score);
      cookie('Best score', this.best_score);
    });


    function setup_scores() {
        var get_best_score = cookie({ get : 'Best score' });
    }
    

    $('.new-game').on('click', function(){
      new_game();
    });



    // $(".class_2").fadeIn("slow", 0.5);
    // $('.class_').animate({padding: '0px'}, {duration: 2000});

    // var size = $('input');


    // début du code lancé
    $(this).append(generate_map(4)); // génération du tableau vide
    generate_case(2); // génération aléatoire de deux cases pleines (2 ou 4)
    add_class();
    setup_scores();

  };

})(jQuery); // fin du pluggin