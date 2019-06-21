/**
 * @fileoverview Rule to delete unnecessary console.log
 * @author no-console-custom
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-console-custom"),

    RuleTester = require("../../../lib/testers/rule-tester");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-console-custom", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "console.log",
            errors: [{
                message: "Unnecessary console.log",
                type: "Me too"
            }]
        }
    ]
});
