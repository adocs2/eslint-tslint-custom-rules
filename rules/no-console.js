/**
 * @fileoverview Rule to delete unnecessary console.log
 * @author Afonso Dias
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",
        fixable: "code",
        schema: [] // no options
    },
    create: function(context) {

        return {
            CallExpression(node) {
                const callee = node.callee;
                if(callee.object.name === 'console'){
                    context.report(node, "fuck this console")
                }

            }
        };
    }
};