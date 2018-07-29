use std::fmt;

use consts::Colour;
use consts::Position;

#[derive(Debug)]
pub struct Rug {
  colour: Colour,
  tiles: [Position; 2]
}

impl fmt::Display for Rug{
  fn fmt(self: &Self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "{}", self.colour)
  }
}