#[macro_use] extern crate log;
extern crate env_logger;
extern crate num;
#[macro_use] extern crate num_derive;

pub mod consts;
pub mod game;
pub mod player;

pub fn hello () -> String {
  return String::from("Hello world");
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        println!("ta mere");
        assert_eq!(2 + 2, 4);
    }
}
