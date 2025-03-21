---
title: Rust SDK API Reference
slug: rust
---

<section className="section">
  <div className="left">
    <h3>Rust SDK</h3>
    <p>
      Highlight's Rust SDK makes it easy to monitor errors and metrics on your Rust backend.
    </p>
  </div>
  <div className="right">
    <h6>Just getting started?</h6>
    <p>Check out our [getting started guide](../getting-started/4_server/5_rust/1_overview.md) to get up and running quickly.</p>
  </div>
</section>

<section className="section">
  <div className="left">
    <h3>Highlight::init</h3>
    <p>Highlight::init() initializes the Highlight backend SDK.</p>
    <h6>Method Parameters</h6>
    <aside className="parameter">
      <h5>config<code>HighlightConfig</code> <code>required</code></h5>
      <p>The configuration for Highlight backend monitoring.</p>
      <article className="innerParameterContainer">
        <aside className="innerParameterHeading">options properties</aside>
        <aside className="parameter">
          <h5>projectID <code>string</code> <code>required</code></h5>
          <p>Your project ID as provided by the [setup page](https://app.highlight.io/setup).</p>
        </aside>
        <aside className="parameter">
          <h5>serviceName <code>Option&lt;String&gt;</code> <code>optional</code></h5>
          <p>The name of your app.</p>
        </aside>
        <aside className="parameter">
          <h5>serviceVersion <code>Option&lt;String&gt;</code> <code>optional</code></h5>
          <p>The version of this app. We recommend setting this to the most recent deploy SHA of your app.</p>
        </aside>
        <aside className="parameter">
          <h5>logger <code>Box&lt;dyn log::Log&gt;</code> <code>optional</code></h5>
          <p>The logger Highlight will use to emit to the standard output. By default, Highlight will initialize an env_logger for you, but if you want to provide a custom logger, you can speicfy it here. If you provide a custom logger, do not make it global, as Highlight will do it for you.</p>
        </aside>
      </article>
    </aside>
  </div>
  <div className="right">
    <code>
        use highlightio::{Highlight, HighlightConfig};
        fn main() {
            let h = Highlight::init(HighlightConfig {
                project_id: "<YOUR_PROJECT_ID>".to_string(),
                service_name: "my-rust-app".to_string(),
                service_version: "git-sha".to_string(),
                ..Default::default()
            }).expect("Failed to initialize Highlight.io");
        }
    </code>
  </div>
</section>

<section className="section">
  <div className="left">
    <h3>Highlight::capture_error</h3>
    <p>Highlight::capture_error reports an error and its corresponding stack trace to Highlight.</p>
    <h6>Method Parameters</h6>
    <aside className="parameter">
      <h5>error<code>Error</code> <code>required</code></h5>
      <p>The error being reported to Highlight.</p>
    </aside>
  </div>
  <div className="right">
    <code>
        let x = match do_something() {
            Ok(x) => x,
            Err(e) => h.capture_error(&e),
        };
    </code>
  </div>
</section>

<section className="section">
  <div className="left">
    <h3>Highlight::capture_error_with_session</h3>
    <p>Highlight::capture_error_with_session reports an error and its corresponding stack trace to Highlight, along with the specified session_id and request_id properties.. The session_id and request_id properties are Highlight ids used to link an error to the session in which the error was thrown. These properties are sent via a header and included in every request to your backend once the Highlight client is initialized.</p>
    <h6>Method Parameters</h6>
    <aside className="parameter">
      <h5>error<code>&dyn Error</code> <code>required</code></h5>
      <p>The error being reported to Highlight.</p>
    </aside>
    <aside className="parameter">
      <h5>session_id<code>Option&lt;String&gt;</code> <code>optional</code></h5>
      <p>A randomized id representing the Highlight session in which an error was thrown. This can be parsed from the network request's headers.</p>
    </aside>
    <aside className="parameter">
      <h5>request_id<code>Option&lt;String&gt;</code> <code>optional</code></h5>
      <p>A randomized id generated by the Highlight client representing the request for which an error was thrown. This can be parsed from the network request's headers.</p>
    </aside>
  </div>
  <div className="right">
    <code>
        let x = match do_something() {
            Ok(x) => x,
            Err(e) => h.capture_error_with_session(&e, session_id, request_id)
        };
    </code>
  </div>
</section>

<section className="section">
  <div className="left">
    <h3>Highlight::span</h3>
    <p>Highlight::span returns a span that carries all of the current Open Telemetry context as its parent span. You can end it with end() by importing highlightio::SpanTrait.</p>
    <h6>Method Parameters</h6>
    <aside className="parameter">
      <h5>name <code>string-like (impl Into&lt;Cow&lt;'static, str&gt;&gt;)</code> <code>required</code></h5>
      <p>Custom span name</p>
    </aside>
    <h6>Method Return</h6>
    <aside className="parameter">
      <h5>span</h5>
      <p>Returns a span</p>
    </aside>
  </div>
  <div className="right">
    <code>
        use highlightio::SpanTrait as _;
        let span = h.span("custom-span-name");
        span.end();
    </code>
  </div>
</section>

<section className="section">
  <div className="left">
    <h3>Highlight::project_id</h3>
    <p>Highlight::project_id returns your project ID. This can help with making custom framework integrations.</p>
    <h6>Method Return</h6>
    <aside className="parameter">
      <h5>project_id</h5>
      <p>The project ID specified in the config.</p>
    </aside>
  </div>
  <div className="right">
    <code>
        let project_id = h.project_id();
    </code>
  </div>
</section>

<section className="section">
  <div className="left">
    <h3>Highlight::shutdown</h3>
    <p>Highlight::shutdown gracefully shuts down the Highlight loggers and tracers, making sure that all your logs and traces get delivered to the server before your app exists. You should always call Highlight::shutdown before your app is exited.</p>
  </div>
  <div className="right">
    <code>
        h.shutdown();
    </code>
  </div>
</section>
