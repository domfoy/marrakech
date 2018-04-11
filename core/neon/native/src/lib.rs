#[macro_use]
extern crate neon;
extern crate logic;

use neon::vm::{Call, JsResult};
use neon::js::JsString;
use logic::game::hello;

fn js_Hello(call: Call) -> JsResult<JsString> {
    let scope = call.scope;
    Ok(JsString::new(scope, &hello()).unwrap())
}

register_module!(m, {
    m.export("hello", js_Hello)
});
