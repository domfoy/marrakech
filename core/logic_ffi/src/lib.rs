extern crate libc;

use libc::{uint32_t};

extern crate logic;

use logic::game::Game1;
use logic::hello;

// use std::mem::transmute;
use std::ffi::CString;

#[no_mangle]
pub extern fn c_hello() -> CString {
  CString::new(hello()).unwrap()
}

#[no_mangle]
pub extern fn double_input(input: i32) -> i32 {
  input * 2
}

#[no_mangle]
pub extern fn init_game() -> *mut Game1 {
  let _game = Box::into_raw(Box::new(Game1::new()));
  _game
}

#[no_mangle]
pub extern fn show_game(game: *mut Game1) {
  let mut _game = unsafe {&mut *game};
  format!("test");
  _game.show_game();
}
#[no_mangle]
pub extern fn get_rugs(game: *mut Game1) -> uint32_t {
  let mut _game = unsafe {&mut *game};
  _game.remaining_rugs
}

#[no_mangle]
pub extern fn incr_game(game: *mut Game1) {
  let mut _game = unsafe {&mut *game};
  format!("test");
  _game.remaining_rugs = _game.remaining_rugs + 1;
}

#[no_mangle]
pub extern fn destroy_game(ptr: *mut Game1) {
  if ptr.is_null() {return}
  unsafe{Box::from_raw(ptr);}
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
