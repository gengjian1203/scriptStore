function deleteDocumentAncestorsMetadata() {  
whatApp = String(app.name);
if(whatApp.search("Photoshop") > 0) { 

if(!documents.length) {  
alert("There are no open documents. Please open a file to run this script.")  
return;  
}  
if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");  
var xmp = new XMPMeta( activeDocument.xmpMetadata.rawData);  

xmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "DocumentAncestors");  
app.activeDocument.xmpMetadata.rawData = xmp.serialize();  
}  
}  

deleteDocumentAncestorsMetadata();