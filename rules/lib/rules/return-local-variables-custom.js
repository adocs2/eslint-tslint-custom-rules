/**
 * @fileoverview Local variables should not be declared and then immediately returned
 * @author return-local-variables-custom
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Local variables should not be declared and then immediately returned",
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
      BlockStatement(node) {
        if (
          node.body.length === 2 &&
          node.body[node.body.length - 2].type === "VariableDeclaration" &&
          node.body[node.body.length - 1].type === "ReturnStatement"
        ) {
          if (
            node.body[node.body.length - 1].argument.name ===
            node.body[node.body.length - 2].declarations[0].id.name
          ) {
            context.report({
              node: node,
              message:
                "Declaring a variable only to immediately return or throw it is a bad practice.",
              fix: function(fixer) {
                return fixer.replaceTextRange(
                  [
                    node.body[node.body.length - 2].range[0],
                    node.body[node.body.length - 1].range[1]
                  ],
                  "return " +
                    context.getSource(
                      node.body[node.body.length - 2].declarations[0].init
                    )
                );
              }
            });
          }
        }
      }
    };
  }
};
