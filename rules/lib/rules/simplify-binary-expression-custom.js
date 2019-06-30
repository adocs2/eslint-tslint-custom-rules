/**
 * @fileoverview Rule to simplify binaryExpression with true or false
 * @author simplify-binary-expression-custom
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Rule to simplify binaryExpression with true or false",
      category: "Fill me in",
      recommended: false
    },
    fixable: "code", // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    return {
      BinaryExpression(node) {
        if (node.operator === "===" || node.operator === "==") {
          if (
            node.right.raw === "true" ||
            node.right.raw === "false" ||
            node.right.raw === "null" ||
            node.right.name === "undefined" ||
            node.right.raw === "''" ||
            node.right.name === "NaN"
          ) {
            context.report({
              node: node,
              message: "simplify expression",
              fix: function(fixer) {
                return fixer.replaceText(node, "!!" + node.left.name);
              }
            });
          }
        }
      }
    };
  }
};
