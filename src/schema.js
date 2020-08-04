"use strict";
exports.__esModule = true;
var graphql_tools_1 = require("graphql-tools");
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var path = require("path");
var allTypes = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "./api/**/*.graphql"));
var allResolvers = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "./api/**/*.resolvers.*"));
var mergedTypes = merge_graphql_schemas_1.mergeTypes(allTypes);
var mergedResolvers = merge_graphql_schemas_1.mergeResolvers(allResolvers);
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers: mergedResolvers
});
exports["default"] = schema;
