use std::fmt;

#[derive(Debug, PartialEq, Clone, Copy)]
pub enum Colour {
  Brown,
  Green,
  Red,
  Yellow,
}

impl fmt::Display for Colour {
  fn fmt(self: &Self, f: &mut fmt::Formatter) -> fmt::Result {
    match *self {
      Colour::Brown => write!(f, "B"),
      Colour::Green => write!(f, "G"),
      Colour::Red => write!(f, "R"),
      Colour::Yellow => write!(f, "Y"),
    }
  }
}