### abc.js setting

``` react
cd makingMelody
npm install --save abcjs
```

``` react
node --version
npm --version //설치 확인, 없으면 npm install
//있다면 npm init으로 package.json setting
```

package.json에 scripts에 start가 없어서 빌드 오류 발생. 오류 해결 위해 parcel 세팅. 출처 참고.

출처 : https://ko.parceljs.org/getting_started.html

``` react
npm install -g parcel-bundler
npm audit fix //보안취약점??
```

 이 후 package.json 파일 내용 수정 - scripts 내에 start, build 넣어주고 devDependencies, keywords 넣어줬음. 

``` react
{
  "name": "make-melody",
  "version": "1.0.0",
  "main": "index.js",
  "author": "",
  "license": "ISC",
  "description": "",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "parcel index.html --open",
    "build": "parcel build index.html"
  },
  "dependencies":{
    "abcjs": "^6.0.2"
  },
  "devDependencies": {
    "@babel/core": "7.2.0",
    "parcel": "^2.4.0",
    "parcel-bundler": "^1.6.1"
  },
  "keywords": [
      "javascript",
      "starter"
  ]
}
```

이 후 빌드 & 시작

``` react
npm run build
npm run start
```

index.js에서 css 파일 로드 <br/>
출처: https://paulrosen.github.io/abcjs/overview/getting-started.html#old-style-minimized-download

``` react
import "../node_modules/abcjs/abcjs-audio.css";
```
