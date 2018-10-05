var ac = [
  "cat_1.jpeg",
  "cat_2.jpeg",
  "cat_3.jpeg",
  "cat_4.jpeg",
  "cat_5.jpeg",
  "cat_6.jpeg",
  "cat_7.jpeg",
  "cat_8.jpeg",
  "cat_1.jpeg",
  "cat_2.jpeg",
  "cat_3.jpeg",
  "cat_4.jpeg",
  "cat_5.jpeg",
  "cat_6.jpeg",
  "cat_7.jpeg",
  "cat_8.jpeg"
]

var r = /\d+/

function create_game() {
  return {
    state : null,
    number_of_moves : 0,
    flipped_card : null,
    flipped_cards : [],
    board : ac
  }
}

function shuffle_array(arr) {
  for (var i = 0; i < 16; ++i) {
    var n_i = Math.floor((Math.random() * 16))
    var tmp = arr[n_i];
    arr[n_i] = arr[i];
    arr[i] = tmp;
  }
}

function start_game(game_state) {
  game_state.state = "time_to_flip"
  shuffle_array(game_state.board)
}

function flip_card(game_state, id) {
    
  var img = document.getElementById(id.toString())
  console.log(img.src);
  if (!img.src.endsWith("dog.jpg")) return;

  if (game_state.state == "time_to_flip") {

    game_state.state = "time_to_match"
    game_state.flipped_card = id 
    game_state.number_of_moves++

    for (var i = 0; i < game_state.flipped_cards.length; ++i) {
      var card = document.getElementById(game_state.flipped_cards[i])
      card.src = "img/dog.jpg"
    }

    game_state.flipped_cards[0] = id
    img.src = "img/" + game_state.board[id]
    console.log("[time_to_flip -> time_to_match] id: " + id)

  } else if (game_state.state == "time_to_match") {

    if (game_state.board[game_state.flipped_card] == game_state.board[id]) {
      // WE MATCH
      game_state.flipped_cards = []
      img.src = "img/" + game_state.board[id]
      console.log("[time_to_match -> ?] match: " + id)
      game_state.flipped_card = null
    } else {
      // WE NO MATCH
      game_state.flipped_cards[1] = id
      img.src = "img/" + game_state.board[id]
      console.log("[time_to_match - ?] no match: " + id)
      game_state.flipped_card = null
    }

    game_state.number_of_moves++

    var total_flipped_cards = 0
    for (c in game_state.flipped_cards) {
      total_flipped_cards++
    }

    if (total_flipped_cards == 8) {
      game_state.state = "game_over"
    } else {
      game_state.state = "time_to_flip"
    }

  }

}
