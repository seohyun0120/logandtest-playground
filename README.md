# 🧪 TEST PLAYGROUND

Express Server를 로깅하는 방법과 테스트 코드를 작성하는 방법에 대해 이것 저것 시도해보며 공부해나가는 과정을 기록한다.

## 🖋 Logging

used modules
- [winston](https://github.com/winstonjs/winston)
- [morgan](https://github.com/expressjs/morgan)

### Winston

#### 로그 생성하기

로그는 크게 두 가지 `console`, `file`용 로그로 나눌 수 있다. console은 실시간으로 로그를 볼 수 있을 때 유용하며, file은 기록할 때 사용된다.

```ts
// src/logger.ts
const logger = winston.createLogger({
    transports: [
    new winston.transports.Console({ level: 'silly' }),
    new winston.transports.File({
        level: 'debug',
        filename: 'debug.log',
        dirname: process.cwd() + '/log'
    })
  ]
})
```

위와 같이 `transports`에 `file`과 `console`을 정의해주자. 사용자 마음대로 커스텀을 할 수 있는데, 가장 많이 사용되는 것은 `level`이다. `level` 태그를 통해서, 어느 단계의 level까지 로그를 남길 것인지 정의할 수 있다. 위의 예제에서 Console은 `silly`를 포함한 `silly`보다 윗 단계들 전부, 즉 모든 로그를 기록하겠다는 뜻이다. File은 `debug`를 포함한 0부터 5레벨까지 기록하게된다.

winston에 정의된 level은 아래와 같다.

```js
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};
```

File은 `filename`과 `dirname`을 사용하여, 로그 파일의 이름과 경로를 지정해준다. 만약 해당 경로에 로그 파일이 없을 경우 알아서 해당 경로에 파일을 생성해준다.

#### HTTP Request 로그하기

HTTP request를 로깅할 수 있도록 도와주는 미들웨어, `morgan`을 사용해보자 로그 레벨은 `http`로 지정해두자

```ts
// src/logger.ts
const httpLogStream = {
    write: (message: string) => { logger.http(message); }
}
```

morgan이 사용할 `httpLogStream`을 위와 같이 정의하였고, morgan이 사전에 정의한 `dev` format에 따라 모든 로그를 기록할 수 있도록 한다.
```ts
// src/server.ts
app.use(morgan('dev', { stream: httpLogStream})));
```

format 역시 사용자가 정의할 수 있는데, 기본적으로 제공하는 `dev` format은 다음과 같다.

```
:method :url :status :response-time ms - :res[content-length]
```

![morgan dev format](./img/morgan%20log.png)

실제 보여지는 로그는 위와 같다. 앞부분 (GET 이전)은 `winston transport console format`에 의한 로그이며, 뒷부분 (GET부터)은 `morgan dev format`에 의한 로그이다.

## 🤖 Test Code

used modules
- [Mocha](https://github.com/mochajs/mocha)