// use game::Game;
// // use action::Action;

// use consts::Position;

// pub fn get_free_rug_spots(game: &Game) -> Vec<((i8, i8), (i8, i8))> {
//   let assam = game.assam.get_position();

//   let orientation_vectors = vec![
//     (1, 0),
//     (0, 1),
//     (-1, 0),
//     (0, -1),
//   ];

//   let bases = orientation_vectors
//     .iter()
//     .enumerate()
//     .map(|(index, _)|
//     (
//       orientation_vectors[(index) % 4].clone(),
//       orientation_vectors[(index + 1) % 4].clone(),
//     ))
//     .filter(|base|
//       !Position::is_outside(
//         assam.x + (base.0).0,
//         assam.y + (base.0).1,
//       )
//     )
//     .map(|(index, base)|
//     {
//       let centralPosition = Position::new(
//         assam.x + (base.0).0,
//         assam.y + (base.0).1,
//       );

//       let extremities = [
//         Position::new(
//           centralPosition.x - (base.1).0,
//           centralPosition.y - (base.1).1,
//         ),
//         Position::new(
//           centralPosition.x + (base.0).0,
//           centralPosition.y + (base.0).1,
//         ),
//         Position::new(
//           centralPosition.x + (base.1).0,
//           centralPosition.y + (base.1).1,
//         ),
//       ];

//       match game.get_rug(centralPosition) {
//         None =>
//         Some()
//       }
//     });


//   bases.collect()
// }

// #[cfg(test)]
// mod tests {
//   use super::Game;

//   #[test]
//   fn free_rugs() {
//     let game = Game::new();
//     let out = super::get_free_rug_spots(&game);
//     assert_eq!((out[0].0).0, 1);
//   }
// }