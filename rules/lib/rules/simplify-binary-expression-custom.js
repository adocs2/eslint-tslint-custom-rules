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
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      BinaryExpression(node) {
        if (node.operator === "===" || node.operator === "==") {
          if (
            node.right.raw === "true" ||
            node.right.raw === "false" ||
            node.right.raw === "null" ||
            node.right.name === "undefined"
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
