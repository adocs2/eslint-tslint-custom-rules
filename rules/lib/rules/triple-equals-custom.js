/**
 * @fileoverview Rule to change '==' and '!=' to '===' and '!=='
 * @author triple-equals-custom
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Rule to change '==' and '!=' to '===' and '!=='",
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
        if (node.parent.type === "IfStatement") {
          if (node.operator === "==" && node.right.hasOwnProperty("raw")) {
            context.report({
              node: node,
              message: "change to  ===",
              fix: function(fixer) {
                return fixer.replaceText(
                  node,
                  context.getSource(node.left) + " === " + node.right.raw
                );
              }
            });
          }

          if (node.operator === "==" && node.right.hasOwnProperty("name")) {
            context.report({
              node: node,
              message: "change to  ===",
              fix: function(fixer) {
                return fixer.replaceText(
                  node,
                  context.getSource(node.left) + " === " + node.right.name
                );
              }
            });
          }

          if (node.operator === "!=" && node.right.hasOwnProperty("raw")) {
            context.report({
              node: node,
              message: "change to  !=",
              fix: function(fixer) {
                return fixer.replaceText(
                  node,
                  context.getSource(node.left) + " !== " + node.right.raw
                );
              }
            });
          }

          if (node.operator === "!=" && node.right.hasOwnProperty("name")) {
            context.report({
              node: node,
              message: "change to  !=",
              fix: function(fixer) {
                return fixer.replaceText(
                  node,
                  context.getSource(node.left) + " !== " + node.right.name
                );
              }
            });
          }
        }
      }
    };
  }
};
