use std::fmt;

use consts::Position;
use game::board::rug::Rug;

#[derive(Debug)]
pub struct Tile {
  position: Position,
  rug: Option<Rug>
}

impl Tile {
  pub fn new (position_index: u8) -> Self {
    Tile {
      position: Position::with_position_index(position_index),
      rug: Option::None
    }
  }
}

impl fmt::Display for Tile{
  fn fmt(self: &Self, f: &mut fmt::Formatter) -> fmt::Result {
    match self.rug {
      None => write!(f, "x"),
      Some(ref r) => write!(f, "{}", *r),
    }
  }
}