use std::num::Wrapping;

use consts::BOARD_LENGTH;
use consts::BOARD_SIDE_MAX;
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

  pub fn with_position_index(position_index: u8) -> Position {
    let (x, y) = Position::from_position_index(position_index);
    Position::new(x, y)
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

  pub fn from_position_index(position_index: u8) -> (i8, i8) {
    (
      ((position_index as i8) % BOARD_LENGTH) - BOARD_MAX,
      ((position_index as i8) / BOARD_LENGTH) - BOARD_MAX
    )
  }

  pub fn from_coords(x: i8, y: i8) -> usize {
    if Position::is_outside(x, y) {
      panic!("outside bounds coords: ({}, {})", x, y);
    }

    (((x + BOARD_MAX) as u32) + ((y + BOARD_MAX) as u32) * (BOARD_SIDE_MAX as u32)) as usize
  }
}

#[derive(Debug, PartialEq, Clone, Copy)]
pub struct RugPosition {
  pub pos1: Position,
  pub pos2: Position,
}