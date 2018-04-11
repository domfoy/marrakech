pub mod game {
  pub fn hello () -> String {
    return String::from("Hello world");
  }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
