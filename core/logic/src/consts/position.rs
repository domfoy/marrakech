use consts::BOARD_MAX;

#[derive(Debug, PartialEq, Clone, Copy)]
pub struct Position {
  pub x: i8,
  pub y: i8,
}

impl Position {
  pub fn new(x: i8, y: i8) -> Position {
    Position{x,y}
  }

  pub fn is_outside(x: i8, y: i8) -> bool {
    let too_left = x < -BOARD_MAX;
    let too_right = x > BOARD_MAX;
    let too_low = y < -BOARD_MAX;
    let too_high = y > BOARD_MAX;

    too_left
      || too_right
      || too_low
      || too_high
  }
}

#[derive(Debug, PartialEq, Clone, Copy)]
pub struct RugPosition {
  pub pos1: Position,
  pub pos2: Position,
}