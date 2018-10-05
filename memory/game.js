var ac = [
  "cat_1.jpeg",
  "cat_2.jpeg",
  "cat_3.jpeg",
  "cat_4.jpeg",
  "cat_5.jpeg",
  "cat_6.jpeg",
  "cat_7.jpeg",
  "cat_8.jpeg"
  "cat_1.jpeg",
  "cat_2.jpeg",
  "cat_3.jpeg",
  "cat_4.jpeg",
  "cat_5.jpeg",
  "cat_6.jpeg",
  "cat_7.jpeg",
  "cat_8.jpeg"
]

function create_game() {
  return {
    state : null,
    number_of_moves : 0,
    flipped_card : null,
    flipped_cards = {},
    board = ac
  }
}

function shuffle_array(arr) {
  for (var i = 0; i < 16; ++i) {
    var n_i = Math.floor((Math.random() * 16))
    var tmp = arr[n_i];
    arr[n_i] = elem;
    arr[i] = tmp;
  }
}

function start_game(game_state) {
  game_state.state = "time_to_move"
  shuffle_array(game_state.board)
}

function flip_card(game_state, id) {

  if (game_state.state == "time_to_flip") {
    game_state.state = "time_to_match"
    game_state.flipped_card = game_state.board[id]
  } else if (game_state.state == "time_to_match") {

    if (game_state.flipped_card == game_state.board[id]) {
      // WE MATCH
      game_state.flipped_cards[game_state.flipped_card] = true
    } else {
      // WE NO MATCH
      game_state.flipped_card = null
    }

    game_state.number_of_moves++

  }

}