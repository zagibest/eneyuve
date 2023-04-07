import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export function saveScreenshot(parentRef: any) {
  console.log(parentRef);
  html2canvas(parentRef.current).then(function (canvas: any) {
    canvas.toBlob(function (blob: any) {
      saveAs(blob, "generated_huvaari.png");
    });
  });
}
