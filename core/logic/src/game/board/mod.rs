use std::mem;
use std::ptr;
use std::fmt;

use ::consts::Position;

use ::consts::{BOARD_MAX, BOARD_SIDE_MAX};
const BOARD_LENGTH : usize = ::consts::BOARD_LENGTH as usize;

mod tile;
mod rug;

use self::tile::Tile;

macro_rules! make_array {
  ($n:expr, $constructor:expr) => {{
    let mut items: [_; $n] = mem::uninitialized();
    for (i, place) in items.iter_mut().enumerate() {
        ptr::write(place, $constructor(i as u8));
    }
    items
  }}
}

pub struct Board {
  tiles: [Tile; BOARD_LENGTH]
}

impl Board {
  pub fn new () -> Self {
    Board {
      tiles: unsafe {
        make_array!(BOARD_LENGTH, |index| Tile::new(index))
      }
    }
  }

  pub fn get_tile<'a> (&'a self, x: i8, y: i8) -> &'a Tile {
    &self.tiles[Position::from_coords(x, y)]
  }
}

impl fmt::Display for Board {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    println!("bm {}", BOARD_MAX);
    let mut board_info = String::with_capacity(BOARD_LENGTH+2);
    board_info.push_str("\n");
    for i in -BOARD_MAX..BOARD_MAX+1 {
      for j in -BOARD_MAX..BOARD_MAX+1 {
        board_info.push_str(&format!("{}", self.tiles[Position::from_coords(i, -j)]));
      }
      board_info.push_str("\n");
    }
    f.write_str(&board_info)
  }
}

impl fmt::Debug for Board {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    let mut board_info = String::with_capacity(BOARD_LENGTH+2);
    for i in -BOARD_MAX..BOARD_MAX+1 {
      for j in -BOARD_MAX..BOARD_MAX+1 {
        board_info.push_str(&format!("{}", self.tiles[Position::from_coords(i, -j)]));
      }
      board_info.push_str("\n");
    }
    f.write_str(&board_info)
  }
}
