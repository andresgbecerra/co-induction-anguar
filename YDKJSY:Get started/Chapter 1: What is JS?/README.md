## You Don’t Know JS Yet: Get Started 

### Chapter 1: What Is JavaScript?
***

**Language Specification** 
* TC39 is technical steering committee that manages JS, they meet regularly to vote on any agreed changes, which they then submit to ECMA.
   > TC39 progress through a five-stage process (Stage 0 -> Stage 4) 
* JS syntax and behavior are defined in the ES specification.
* The official standard is maintained by TC39 and ECMA.
  
***

**The web rules everything About (JS)**
- The one environment that rules JS is the web, this is the only reality that matters.
  > How JS is implemented for web browser.
- Unfortunately, there are some exceptions, these mismatches are included in Appendix B, [“Additional ECMAScript Features for Web Browsers”](https://www.ecma-international.org/ecma-262/10.0/#sec-additional-ecmascript-features-for-web-browsers).
  > Section B.1 and B.2 cover additions to JS
  > Section B.3 includes some conflicts where code may run in both web and non-web JS engines.

***

**Many Faces**
JavaScript is most definitely a multi-paradigm language. You can write procedural, class-oriented, or FP-style code, and you can make those decisions on a line-by-line basis instead of being forced into an all-or-nothing choice.

***

**Backwards & Forwards**
- Backwards compatibility means that once something is ac- cepted as valid JS, there will not be a future change to the language that causes that code to become invalid JS.
- Forwards-compatible means that including a new addition to the language in a program would not cause that program to break if it were run in an older JS engine.
  > JS is not forwards-compatible

***

**Jumping the Gaps**

There is always the potential for a gap between code that you can write that's valid JS, and the oldest engine that your site or application needs to support due to JS is not forwards-compatible.
 - Forwards-compatibility problems related to syntax are solved by using a transpiler (the most common one being Babel (https://babeljs.io)) to convert from that newer JS syntax version to an equivalent older syntax.

***

**Filling the Gaps**

Transpilation and polyfilling are two highly effective tech- niques for addressing that gap between code that uses the latest stable features in the language and the old environments a site or application needs to still support.

***

**What’s in an Interpretation?**
- The real reason it matters to have a clear picture on whether JS is interpreted or compiled relates to the nature of how errors are handled.
- Parsed languages usually also perform code generation before execution, so it’s not that much of a stretch to say that, in spirit, they’re compiled languages. `JS source code is parsed before it is executed.`
  1. After a program leaves a developer’s editor, it gets tran- spiled by Babel, then packed by Webpack (and perhaps half a dozen other build processes), then it gets delivered in that very different form to a JS engine.
  2. The JS engine parses the code to an AST.
  3. Then the engine converts that AST to a kind-of byte
  code, a binary intermediate representation (IR), which is then refined/converted even further by the optimizing JIT compiler.
  4. Finally, the JS VM executes the program.

***

**Web Assembly (WASM)**

- WASM is a representation format more akin to Assembly that can be processed by a JS engine by skipping the parsing/compilation that the JS engine normally does. The parsing/compilation of a WASM-targeted program happen ahead of time (AOT); what’s distributed is a binary- packed program ready for the JS engine to execute with very minimal processing.
- An initial motivation for WASM was clearly the potential per- formance improvements. While that continues to be a focus, WASM is additionally motivated by the desire to bring more parity for non-JS languages to the web platform.
> WASM relieves the pressure to add features to JS that are mostly/exclusively intended to be used by transpiled programs from other languages.
> WASM isn’t only for the web, and WASM also isn’t JS.

***

**Strictly Speaking**

- Strict mode is like a linter reminding you how JS should be written to have the highest quality and best chance at performance.
- Virtually all transpiled code ends up in strict mode even if the original source code isn’t written as such.
- ES6 modules assume strict mode, so all code in such files is automatically defaulted to strict mode.

***

**Defined**
- JS is an implementation of the ECMAScript standard (version ES2019 as of this writing), which is guided by the TC39 committee and hosted by ECMA. It runs in browsers and other JS environments such as Node.js.
- JS is a multi-paradigm language, meaning the syntax and capabilities allow a developer to mix and match (and bend and reshape!) concepts from various major paradigms, such as procedural, object-oriented (OO/classes), and functional (FP).
- JS is a compiled language, meaning the tools (including the JS engine) process and verify a program (reporting any errors!) before it executes.




_The End_