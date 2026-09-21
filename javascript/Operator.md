# JavaScript Operator

## Concept
- This note covers only the operators that **behave differently from Java** or **do not exist in Java**
- Most operators look the same as Java (+, -, *, /, %, ++, --, &&, ||, !, ternary and the compound assignments)  
    &rightarrow; The difference is **how they behave**, because JavaScript is dynamically typed and **coerces types implicitly**
- Java rejects a wrong operand type at compile time, JavaScript silently converts it at runtime
- JavaScript has a single Number type (64-bit floating point) plus BigInt  
    &rightarrow; No int / long / double split like Java

## Operators that behave differently from Java

### Equality: == vs ===
- **===** and **!==** (**strict equality**)
    - Compares value **and** type, no coercion
    - Java has no equivalent
- **==** and **!=** (**loose equality**)
    - Converts the operands to a common type first  
        &rightarrow; 1 == "1" is true, 0 == false is true, null == undefined is true
- Java **==** does not coerce
    - Primitives: compares values
    - References: compares **identity**, so equals() is needed for content  
        &rightarrow; JavaScript strings are primitives, so "a" === "a" compares content
- NaN is not equal to anything, even itself (NaN === NaN is false)  
    &rightarrow; Use Number.isNaN()

### + operator
- Java: if either side is a String, it concatenates
- JavaScript: same rule, but **the other operand is coerced to a string**  
    &rightarrow; "5" + 3 is "53", while "5" - 3 is 2
- + is the only arithmetic operator that concatenates, so the result depends on the operand types

### Nullish coalescing and optional chaining: ??, ?.
- **??** uses the right side only when the left side is null or undefined
- **?.** short-circuits to undefined instead of throwing a NullPointerException  
    &rightarrow; user?.address?.city
- ?? vs ||  
    &rightarrow; || treats every falsy value (0, "") as missing, ?? treats only null / undefined as missing
- Java handles the same problems with Optional, Objects.requireNonNullElse(), and explicit null checks

### Type checking: instanceof vs typeof
- Both languages have instanceof
    - Java: checks the class / interface hierarchy (also has pattern matching, obj instanceof String s)
    - JavaScript: checks the **prototype chain**
- typeof is JavaScript-only, and returns a string  
    &rightarrow; typeof null is "object" (a long-standing bug), so check null separately

### Bitwise
- Same operator set as Java (&, |, ^, ~, <<, >>, >>>)
- JavaScript converts operands to **32-bit signed integers** first, even though numbers are floating point
- Java >>> works on int or long depending on the operand, JavaScript >>> always works on 32 bits
- & and | on booleans return a **number** in JavaScript (true & false is 0), Java returns boolean

### Comparison: <, >
- Strings are compared **lexicographically** with the operators themselves ("apple" < "banana" is true)  
    &rightarrow; Java needs compareTo()
- Mixed types are coerced to numbers: "10" < 9 is false, but "10" < "9" is true (string comparison)

## Thoughts
- The operators themselves are almost the same as Java, the trouble comes from **implicit coercion**  
    &rightarrow; Coming from Java, I expect "5" - 3 to be a compile error, JavaScript just returns 2
- Always use === and !==  
    &rightarrow; == is only reasonable for the x == null check that covers both null and undefined
- && / || returning operands looks strange at first, but it makes default values and short-circuit guards very concise
- ?? and ?. are the parts I like most, they replace a lot of null-check boilerplate that Java needs  
    &rightarrow; But I need to remember || still swallows 0 and "", so ?? is the safer default
- No integer division and no exceptions on / 0 means bugs surface as NaN / Infinity later in the program, far from the cause
