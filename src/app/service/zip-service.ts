import { Injectable } from "@angular/core";
declare var zip: any;


@Injectable()
export class ZipService {

    async  createZipWriter(): Promise<any> {
        return new Promise(resolve => zip.createWriter(new zip.BlobWriter("application/zip"), function (zipWriter) { resolve(zipWriter) }));
    }
    // TEMPORARY = "TEMPORARY";
    // requestFileSystem = window['webkitRequestFileSystem'] || window['mozRequestFileSystem'] || window['requestFileSystem'];
    async  downloadZip(files: { path: string, content: string }[]) {
        // create the blob object storing the data to compress
        // var blob = new Blob(["Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."], {
        //     type: "text/plain"
        // });
        // creates a zip storing the file "lorem.txt" with blob as data
        // the zip will be stored into a Blob object (zippedBlob)
        let zipWriter = await this.createZipWriter();
        for (let file of files)
            await this.addFile(zipWriter, file);
        this.downloadData(zipWriter);
    }
    async addFile(zipWriter, file: { path: string, content: string }) {
        return new Promise<any>(resolve => zipWriter.add(file.path, new zip.TextReader(file.content), () => resolve(true)));
    }
    closeFile(zipWriter) {
        return new Promise(resolve => zipWriter.close(bolb => resolve(bolb)));
    }
    downloadData(zipWriter) {
        zipWriter.close(function (blob) {
            var blobURL = URL.createObjectURL(blob)
            var clickEvent;
            let downloadButton = document.createElement("a");
            clickEvent = document.createEvent("MouseEvent");
            clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            downloadButton.href = blobURL;
            downloadButton.download = "demo.zip";
            downloadButton.dispatchEvent(clickEvent);
            // creationMethodInput.disabled = false;
            // fileList.innerHTML = "";
            event.preventDefault();
            return false;

            // zipWriter = null;
        });
    }


}