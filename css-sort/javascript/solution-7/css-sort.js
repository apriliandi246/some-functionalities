const { parse, generate } = require("css-tree");

const cssCode = `
.card {
   width: 600px;
   border-radius: 3px;
   box-sizing: border-box;
   background: var(--sixth);
   border: 2px solid var(--fourth);
}

button {
   width: 200px;
   outline: none;
   color: #ff3e00;
   padding: 1em 2em;
   font-size: inherit;
   border-radius: 2em;
   font-family: inherit;
   font-variant-numeric: tabular-nums;
   border: 2px solid rgba(255, 62, 0, 0);
   background-color: rgba(255, 62, 0, 0.1);
}

section .component {
   grid-template-areas:
      "one one two two"
      "one one two two"
      "three three four four"
      "three three four four";
   grid-template-areas:
      "one one two two"
      "one one two two"
      "three three four four"
      "three three four four";
   grid-template-areas:
      "a a a"
      "b c c"
      "b c c";
   background-color: rgba(255, 62, 0, 0.1);
   border: 2px solid rgba(255, 62, 0, 0);
   font-variant-numeric: tabular-nums;
   box-shadow: 0 0 1px 1px #0000001a;
   justify-content: space-between;
   background-color: #ffffff;
   padding: 0 55px 0 55px;
   align-items: center;
   position: fixed;
   display: flex;
   height: 60px;
   z-index: 1;
   right: 0;
   left: 0;
   top: 0;
}
`;

function onSort(format, cssCode) {
   let finalResult = "";
   const ast = parse(cssCode, {
      parseValue: false,
   });

   const result = generate(ast).split("}");

   result.pop();

   for (let index = 0; index < result.length; index++) {
      const cssNode = result[index].split("{");
      const cssSelector = cssNode[0].trim();

      const cssProperties = cssNode[1]
         .trim()
         .split(";")
         .filter((property) => property.trim() !== "")
         .map((property) => property.trim() + ";")
         .sort((a, b) =>
            format === "min" ? a.length - b.length : b.length - a.length
         )
         .join("\n");

      finalResult += `${cssSelector} {\n ${cssProperties} \n}${
         index === result.length - 1 ? "\n" : "\n\n"
      }`;
   }

   return finalResult;
}

console.log(onSort("max", cssCode));
