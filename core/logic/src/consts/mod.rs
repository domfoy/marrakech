pub mod action_type;
pub mod direction;
pub mod colour;
pub mod position;

pub use self::action_type::{Action, ActionType};
pub use self::direction::{Direction};
pub use self::position::{Position};
pub use self::colour::{Colour};

pub const BOARD_SIDE_MAX : i8 = 7;
pub const BOARD_MAX : i8 = BOARD_SIDE_MAX / 2;
pub const BOARD_LENGTH : i8 = BOARD_SIDE_MAX * BOARD_SIDE_MAX;