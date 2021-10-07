#! node
import * as ts from 'typescript';
import * as fs from 'fs';

import {Project, SyntaxKind} from 'ts-morph';

const project = new Project();

project.addSourceFilesAtPaths(process.argv.slice(2));

const ls = project.getLanguageService();

project.getSourceFiles().forEach((file) => {
    //console.log('===', file.getBaseName(), '===');

    const output = file.getDescendantsOfKind(SyntaxKind.CallExpression).map((ii) => {
        //console.log('references');
        //ls.findReferences(ii).forEach((rr) => {
        //console.log(rr.compilerObject.definition);
        ////console.log(rr.getReferences().map((ii) => ii.getSourceFile().getBaseName()));
        //});

        return ls.getDefinitions(ii).map((dd) => {
            const {name, kind, fileName, containerName} = dd.compilerObject;
            return {name, kind, fileName, containerName};
            //console.log(dd.getDeclarationNode()?.getSourceFile().getBaseName());
        })[0];
    });

    console.log(JSON.stringify(output));

    //file.getCallExpression().forEach((ss) => {
    //console.log('statement:', ss.print());
    //});
    //file.getFunctions().forEach((ff) => {
    //console.log('function:', ff.getName());
    //});
    //file.getImportDeclarations().forEach((ii) => {
    ////ii.find
    //const defaultImport = ii.getDefaultImport();
    //def
    //console.log(defaultImport?.getNodeProperty('name'));
    ////console.log(ii.getNamedImports());
    //});
    //console.log(file.gmeetFunctions().map((ii) => ii.getParameters().map((pp) => pp.getName())));
});

//const program = parse(source, options)

/** Generate documentation for all classes in a set of .ts files */
//function generateDocumentation(fileNames: string[], options: ts.CompilerOptions): void {
//// Build a program using the set of root file names in fileNames
//let program = ts.createProgram(fileNames, options);

//// Get the checker, we will use it to find more about classes
//let checker = program.getTypeChecker();
//let output: DocEntry[] = [];

//let limit = 0;
//// Visit every sourceFile in the program
//for (const sourceFile of program.getSourceFiles()) {
//if (!sourceFile.isDeclarationFile && sourceFile.fileName.includes('Dashboard')) {
////console.log(parse(sourceFile.text, options));
//// Walk the tree to search for classes
//ts.forEachChild(sourceFile, visit);
//limit++;
//}
//}

//// print out the doc
//fs.writeFileSync('classes.json', JSON.stringify(output, undefined, 4));

//return;

//[>* visit nodes finding exported classes <]
//function visit(node: ts.Node, index = 0) {
//const prefix = '-'.repeat(index);
//switch (node.kind) {
//case ts.SyntaxKind.JsxAttribute:
//console.log(prefix, 'Arrt', node.name.escapedText);
//break;
//case ts.SyntaxKind.JsxElement: {
//const tag = node as ts.JsxElement;
////console.log(tag.children);

//console.log(prefix, {
//kind: 'JsxElement',
//name: tag.openingElement.tagName.escapedText
//});
//break;
//}
//default:
//console.log(prefix, ts.SyntaxKind[node.kind]);
//}

////let symbol = checker.getSymbolAtLocation(node.name);

//node.forEachChild((child) => visit(child, index + 1));
//return;
////if (ts.isClassDeclaration(node) && node.name) {
////// This is a top level class, get its symbol
////let symbol = checker.getSymbolAtLocation(node.name);
////if (symbol) {
////output.push(serializeClass(symbol));
////}
////// No need to walk any further, class expressions/inner declarations
////// cannot be exported
////} else if (ts.isModuleDeclaration(node)) {
////// This is a namespace, visit its children
////ts.forEachChild(node, visit);
////}
//}

//[>* Serialize a symbol into a json object <]
//function serializeSymbol(symbol: ts.Symbol): DocEntry {
//return {
//name: symbol.getName(),
//documentation: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
//type: checker.typeToString(
//checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
//)
//};
//}

//[>* Serialize a class symbol information <]
//function serializeClass(symbol: ts.Symbol) {
//let details = serializeSymbol(symbol);

//// Get the construct signatures
//let constructorType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!);
//details.constructors = constructorType.getConstructSignatures().map(serializeSignature);
//return details;
//}

//[>* Serialize a signature (call or construct) <]
//function serializeSignature(signature: ts.Signature) {
//return {
//parameters: signature.parameters.map(serializeSymbol),
//returnType: checker.typeToString(signature.getReturnType()),
//documentation: ts.displayPartsToString(signature.getDocumentationComment(checker))
//};
//}

//[>* True if this is visible outside this file, false otherwise <]
//function isNodeExported(node: ts.Node): boolean {
//return (
//(ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export) !== 0 ||
//(!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
//);
//}
//}

//generateDocumentation(process.argv.slice(2), {
//target: ts.ScriptTarget.ES5,
//module: ts.ModuleKind.CommonJS
//});
