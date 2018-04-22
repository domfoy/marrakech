extern crate num;
#[macro_use]
extern crate num_derive;

mod action;
mod consts;
mod game;
mod player;

pub fn hello () -> String {
  return String::from("Hello world");
}


#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
