extern crate logic;

use std::ffi::CString;
use logic::game::hello;

#[no_mangle]
pub extern fn c_hello() -> CString {
  CString::new(hello()).unwrap()
}

#[no_mangle]
pub extern fn double_input(input: i32) -> i32 {
    input * 2
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
