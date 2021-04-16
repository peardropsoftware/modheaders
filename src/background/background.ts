import "meta-validator";
import {ModifyType} from "../shared/enums/ModifyType";
import InstalledDetails = chrome.runtime.InstalledDetails;
import BlockingResponse = chrome.webRequest.BlockingResponse;
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails;
import HttpHeader = chrome.webRequest.HttpHeader;

const modifyType: ModifyType = ModifyType.Add;
const newHeader: HttpHeader = {
    name: "Is-Peardrop-Admin",
    value: "true"
};

function rewriteRequestHeader(details: WebRequestHeadersDetails): BlockingResponse | void {
    if (details.url)

    console.log("test");
    switch (modifyType) {
        case ModifyType.Add:
            console.log("Add");
            details.requestHeaders?.push(newHeader);
            break;
        case ModifyType.Modify:
            console.log("Modify");
            break;
        case ModifyType.Delete:
            console.log("Delete");
            break;
        default:
            throw new Error("Invalid ModifyType");
    }

    return {
        requestHeaders: details.requestHeaders
    };
}

chrome.webRequest.onBeforeSendHeaders.addListener(rewriteRequestHeader, {
    urls: ["<all_urls>"]
}, ["blocking", "requestHeaders"]);

/*
chrome.webRequest.onHeadersReceived.addListener(rewriteResponseHeader, {
    urls: target.split(";")
}, ["blocking", "responseHeaders"]);
*/

chrome.runtime.onInstalled.addListener((details: InstalledDetails) => {
    console.log("[modheaders - background] onInstalled()");
    console.log(`[modheaders - background] process.env.NODE_ENV = ${process.env.NODE_ENV}`);
    if (details.reason === "install" || process.env.NODE_ENV === "development") {
        chrome.runtime.openOptionsPage();
    }
});
