/**
 * @fileoverview Simplifies chained ifs
 * @author simplify-chained-if-custom
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Simplifies chained ifs",
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
      IfStatement(node) {
        if (
          node.consequent.body.length === 1 &&
          node.consequent.body[0].type === "IfStatement" &&
          node.alternate === null &&
          node.consequent.body[0].alternate === null
        ) {
          context.report({
            node: node,
            message: "simplify expression",
            fix: function(fixer) {
              let fix = [];
              fix.push(fixer.remove(node.consequent.body[0]));
              fix.push(
                fixer.replaceText(
                  node.test,
                  context.getSource(node.test) +
                    " && " +
                    context.getSource(node.consequent.body[0].test)
                )
              );

              const whitespaceBeforeIf = context
                .getSource(node.consequent)
                .match(/^{[^\n]*(\r?\n\s+)/)[1];
              fix.push(
                fixer.insertTextAfterRange(
                  [node.consequent.start, node.consequent.body[0].start],
                  node.consequent.body[0].consequent.body
                    .map(i => context.getSource(i))
                    .join(whitespaceBeforeIf)
                )
              );
              return fix;
            }
          });
        }
      }
    };
  }
};
