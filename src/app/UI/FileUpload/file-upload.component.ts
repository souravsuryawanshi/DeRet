import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../Services/file-upload.service';
import * as tf from '@tensorflow/tfjs';
import * as $ from 'jquery';
import { image } from '@tensorflow/tfjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  // processFile(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   console.log(reader);
  // }

  reader: any;
  url: any;

  loading: boolean = false; // Flag variable
  file: File | undefined;
  model: any;
  fer_json: any;

  predicted = false;
  predictedClass: any;
  predictedClassMessage: any;
  severity: any;
  seekAdvice: any;
  consultation = 'Yes.';

  buttonDisable = true;

  // Inject service
  constructor(private fileUploadService: FileUploadService) {}

  async ngOnInit() {
    this.model = await tf.loadLayersModel('../../../assets/Model2/model.json');
    //model loaded
    console.log(this.model);
    this.fer_json = await $.getJSON(
      '../../../assets/Model/fer.json',
      function (json) {
        return json.responseJSON;
      }
    );
    console.log(this.fer_json);
  }

  // reader: any;
  // On file Select
  onChange(event: any) {
    this.predicted = false;
    this.buttonDisable = false;
    this.file = event.target.files[0];

    if (this.file) this.buttonDisable = false;

    this.reader = new FileReader();
    this.reader.readAsDataURL(event.target.files[0]);

    this.reader.onload = (_event: any) => {
      this.url = this.reader.result; //OR (response) => this.url = response.target?.result;
      console.log(this.url);
    };

    // this.reader = new FileReader();
    // this.reader.readAsDataURL(event.target.files[0]);
  }

  // OnClick of button Upload
  onUpload() {
    // latest update async await

    this.buttonDisable = true;
    this.predicted = false;
    this.loading = !this.loading;
    const img = new Image();
    img.src = this.url;
    let axis;

    setTimeout(() => {
      img.onload = async () => {
        const t = await tf.browser.fromPixels(img);
        console.log(t.shape);
        let res = await tf.expandDims(t, (axis = 0));

        //check
        let tensor = await tf.browser.fromPixels(img);

        const resized = await tf.image
          .resizeBilinear(tensor, [320, 320])
          .toFloat();

        const offset = await tf.scalar(255.0);

        // working for normal but might not working good for eye
        const normalized = await tf.scalar(1.0).sub(resized.div(offset)); // [ 0.0028980933129787445, 0.0005009372835047543, 0.9820129871368408, 0.005302976816892624, 0.009285111911594868 ]
        //not working for normal but working good for eye
        // const normalized = resized.div(offset); //[ 0.9991870522499084, 0.00011081025149906054, 0.00041361741023138165, 0.00005470188625622541, 0.0002339934289921075 ]

        const batched = await normalized.expandDims(0);
        var pred = await this.model.predict(batched).dataSync();
        console.log(pred);

        //class detection from here
        let count = 0;
        let max;
        for (let i = 0; i < 5; i++) {
          if (pred[i] > count) {
            count = pred[i];
            max = i;
          }
        }

        this.loading = !this.loading;
        this.predicted = true;
        switch (max) {
          case 0:
            console.log('class 1');
            this.predictedClass = 'Class 1';
            this.predictedClassMessage = 'No apparent Retinopathy is detected.';
            this.severity = 'None';
            this.consultation = 'No';

            break;
          case 1:
            console.log('class 2');
            this.predictedClass = 'Class 2';
            this.predictedClassMessage = '';
            this.severity = '';
            break;
          case 2:
            console.log('class 3');
            this.predictedClass = 'Class 3';
            this.predictedClassMessage = '';
            this.severity = '';
            break;
          case 3:
            console.log('class 4');
            this.predictedClass = 'Class 4';
            this.predictedClassMessage = '';
            this.severity = '';
            break;
          case 4:
            console.log('class 5');
            this.predictedClass = 'Class 5';
            this.predictedClassMessage = '';
            this.severity = '';
            break;
        }

        //class detection till here

        console.log('argmax');
        const idx = tf.argMax(pred);

        // var indices = findIndicesOfMax(pred, 1);
        // console.log(indices);
        // var probs = findTopValues(pred, 1);
        // var names = getClassNames(indices);
        console.log('argmax    ' + idx);

        //checkend

        // console.log(this.model);
        // console.log(this.model.predict(batched));
      };

      // console.log(this.reader);
      // console.log(this.file);
      // let res = tf.Tensor()
      // console.log(res);

      // const image = new Image();
      // image.src = this.reader;
      // image.onload = () => {
      //   const a = tf.FromPixels(image, 320);
      //   a.print();
      //   console.log(a.shape);
      // };
      // let res = tf.image.resizeBilinear(this.file, [320, 320]);
      // console.log('result' + res);
      // setTimeout(() => {
      //   console.log('class not existing');
      // }, 10000);
      // this.fileUploadService.upload(this.file).subscribe((event: any) => {
      //   if (typeof event === 'object') {
      //     // Short link via api response
      //     this.shortLink = event.link;

      //     this.loading = false; // Flag variable
      //   }
      // });
    }, 10000);
  }
}
