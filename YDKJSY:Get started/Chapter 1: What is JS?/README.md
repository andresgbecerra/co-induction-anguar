### You Don’t Know JS Yet: Get Started 
***

**What is JS?**  

**Language Specification** 
* TC39 is technical steering committee that manages JS, they meet regularly to vote on any agreed changes, which they then submit to ECMA.
   > TC39 progress through a five-stage process (Stage 0 -> Stage 4) 
* JS syntax and behavior are defined in the ES specification.
* The official standard is maintained by TC39 and ECMA.
  
***

**The web rules everything About (JS)**
- The one environment that rules JS is the web, this is the only reality that matters.
  > How JS is implemented for web browser.
- Unfortunately, there are some exceptions, these mismatches are included in Appendix B,[“Additional ECMAScript Features for Web Browsers”](https://www.ecma-international.org/ecma-262/10.0/#sec-additional-ecmascript-features-for-web-browsers).
  > Section B.1 and B.2 cover additions to JS
  > Section B.3 includes some conflicts where code may run in both web and non-web JS engines.

***
**Many Faces**
JavaScript is most definitely a multi-paradigm language. You can write procedural, class-oriented, or FP-style code, and you can make those decisions on a line-by-line basis instead of being forced into an all-or-nothing choice.

**Backwards & Forwards**
- Backwards compatibility means that once something is ac- cepted as valid JS, there will not be a future change to the language that causes that code to become invalid JS.
- Forwards-compatible means that including a new addition to the language in a program would not cause that program to break if it were run in an older JS engine.
  > JS is not forwards-compatible

**Jumping the Gaps**

There is always the potential for a gap between code that you can write that's valid JS, and the oldest engine that your site or application needs to support due to JS is not forwards-compatible.
 - Forwards-compatibility problems related to syntax are solved by using a transpiler (the most common one being Babel (https://babeljs.io)) to convert from that newer JS syntax version to an equivalent older syntax.


**Filling the Gaps**

Transpilation and polyfilling are two highly effective tech- niques for addressing that gap between code that uses the latest stable features in the language and the old environments a site or application needs to still support.


**What’s in an Interpretation?**
The real reason it matters to have a clear picture on whether JS is interpreted or compiled relates to the nature of how errors are handled.
1. After a program leaves a developer’s editor, it gets tran- spiled by Babel, then packed by Webpack (and perhaps half a dozen other build processes), then it gets delivered in that very different form to a JS engine.
2. The JS engine parses the code to an AST.
3. Then the engine converts that AST to a kind-of byte
code, a binary intermediate representation (IR), which is then refined/converted even further by the optimizing JIT compiler.
4. Finally, the JS VM executes the program.

