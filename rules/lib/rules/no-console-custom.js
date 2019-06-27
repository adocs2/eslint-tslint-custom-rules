/**
 * @fileoverview Rule to delete unnecessary console.log
 * @author no-console-custom
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Rule to delete unnecessary console.log",
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
      CallExpression(node) {
        const callee = node.callee;
        if (
          callee.type === "MemberExpression" &&
          callee.object.name === "console" &&
          (node.parent.parent.type === "BlockStatement" &&
            node.parent.parent.body.length > 1)
        ) {
          context.report({
            node: node,
            message: "unnecessary console.log",
            fix: function(fixer) {
              return fixer.remove(node.parent);
            }
          });
        }
      }
    };
  }
};
