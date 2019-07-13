/**
 * @fileoverview Rule for simplify if statement if can be simplified to a single return statement
 * @author simplify-if-statement-custom
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Rule for simplify if statement if can be simplified to a single return statement",
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
          node.body.length >= 2 &&
          node.body[node.body.length - 1].type === "ReturnStatement" &&
          node.body[node.body.length - 2].type === "IfStatement" &&
          node.body[node.body.length - 2].consequent.body.length === 1 &&
          node.body[node.body.length - 2].consequent.body[0].type === "ReturnStatement"
        ) {
          if (node.body[node.body.length - 2].test.type === "Identifier") {
            if (node.body[node.body.length - 2].consequent.body[0].argument.raw === "true") {
              context.report({
                node: node,
                message: "simplify if logic for return boolean",
                fix: function(fixer) {
                  return fixer.replaceTextRange(
                    [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                    "return " + "!!" + context.getSource(node.body[node.body.length - 2].test)
                  );
                }
              });
            }
            if (node.body[node.body.length - 2].consequent.body[0].argument.raw === "false") {
              context.report({
                node: node,
                message: "simplify if logic for return boolean",
                fix: function(fixer) {
                  return fixer.replaceTextRange(
                    [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                    "return " + "!" + context.getSource(node.body[node.body.length - 2].test)
                  );
                }
              });
            }
          }
          if (node.body[node.body.length - 2].test.type === "UnaryExpression") {
            if (node.body[node.body.length - 2].test.argument.type === "UnaryExpression") {
                    if (node.body[node.body.length - 2].consequent.body[0].argument.raw === "true") {
              context.report({
                node: node,
                message: "simplify if logic for return boolean",
                fix: function(fixer) {
                  return fixer.replaceTextRange(
                    [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                    "return " + context.getSource(node.body[node.body.length - 2].test)
                  );
                }
              });
            }
            if (node.body[node.body.length - 2].consequent.body[0].argument.raw === "false") {
              context.report({
                node: node,
                message: "simplify if logic for return boolean",
                fix: function(fixer) {
                  return fixer.replaceTextRange(
                    [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                    "return " + context.getSource(node.body[node.body.length - 2].test.argument)
                  );
                }
              });
            }
              
            }
            if (node.body[node.body.length - 2].test.argument.type === "Identifier") {
                    if (node.body[node.body.length - 2].consequent.body[0].argument.raw === "true") {
              context.report({
                node: node,
                message: "simplify if logic for return boolean",
                fix: function(fixer) {
                  return fixer.replaceTextRange(
                    [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                    "return " + context.getSource(node.body[node.body.length - 2].test)
                  );
                }
              });
            }
            if (node.body[node.body.length - 2].consequent.body[0].argument.raw === "false") {
              context.report({
                node: node,
                message: "simplify if logic for return boolean",
                fix: function(fixer) {
                  return fixer.replaceTextRange(
                    [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                    "return " + context.getSource(node.body[node.body.length - 2].test.argument)
                  );
                }
              });
            }
              
            }
          }
          if (node.body[node.body.length - 2].test.type === "BinaryExpression") {
            if (
              node.body[node.body.length - 1].argument.raw === "false" &&
              node.body[node.body.length - 2].consequent.body[0].argument.raw === "true"
            ) {
              context.report({
                node: node,
                message: "simplify if logic for return boolean",
                fix: function(fixer) {
                  return fixer.replaceTextRange(
                    [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                    "return " +
                      node.body[node.body.length - 2].test.left.name +
                      " " +
                      node.body[node.body.length - 2].test.operator +
                      " " +
                      node.body[node.body.length - 2].test.right.raw
                  );
                }
              });
            }
            if (
              node.body[node.body.length - 1].argument.raw === "true" &&
              node.body[node.body.length - 2].consequent.body[0].argument.raw === "false"
            ) {
              if (node.body[node.body.length - 2].test.operator === "===") {
                context.report({
                  node: node,
                  message: "simplify if logic for return boolean",
                  fix: function(fixer) {
                    return fixer.replaceTextRange(
                      [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                      "return " +
                        node.body[node.body.length - 2].test.left.name +
                        " " +
                        "!==" +
                        " " +
                        node.body[node.body.length - 2].test.right.raw
                    );
                  }
                });
              }
              if (node.body[node.body.length - 2].test.operator === "!==") {
                context.report({
                  node: node,
                  message: "simplify if logic for return boolean",
                  fix: function(fixer) {
                    return fixer.replaceTextRange(
                      [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                      "return " +
                        node.body[node.body.length - 2].test.left.name +
                        " " +
                        "===" +
                        " " +
                        node.body[node.body.length - 2].test.right.raw
                    );
                  }
                });
              }
            }
          }
          if (node.body[node.body.length - 2].test.type === "LogicalExpression") {
            if (node.body[node.body.length - 2].consequent.body[0].argument.raw === "true") {
              context.report({
                node: node,
                message: "simplify if logic for return boolean",
                fix: function(fixer) {
                  return fixer.replaceTextRange(
                    [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                    "return " + "(" + context.getSource(node.body[node.body.length - 2].test) + ")"
                  );
                }
              });
            }
            if (node.body[node.body.length - 2].consequent.body[0].argument.raw === "false") {
              context.report({
                node: node,
                message: "simplify if logic for return boolean",
                fix: function(fixer) {
                  return fixer.replaceTextRange(
                    [node.body[node.body.length - 2].range[0], node.body[node.body.length - 1].range[1]],
                    "return " + "!" + "(" + context.getSource(node.body[node.body.length - 2].test) + ")"
                  );
                }
              });
            }
          }
        }
      }
    };
  }
};
