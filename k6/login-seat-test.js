import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';


const BASE_URL = 'http://localhost:8147/api';
const SCHEDULE_ID = 1;

export const options = {
  scenarios: {
    ticketing_test: {
      executor: 'shared-iterations',
      vus: 300,
      iterations: 10000,
      maxDuration: '10m',
    },
  },
};

export default function () {

  const userNo = exec.scenario.iterationInTest + 1;
  const loginId = `user_${userNo}`;

  // 1. 로그인
  const loginPayload = JSON.stringify({
    loginId: loginId,
    password: '123',
  });

  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    loginPayload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(loginRes, {
    'login success': (r) => r.status === 200,
  });

  // 2. 토큰 추출
  const body = JSON.parse(loginRes.body);

  // 네 ApiResponse 구조에 맞게 수정
  // ex) body.data.token
  const token = body.data.accessToken;
// console.log("body", body);
//   console.log("token", token);
  // 3. Authorization 헤더
  const authHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };


  // // 4. 대기열 진입
  // const queueRes = http.get(
  //   `${BASE_URL}/queue/enter/${SCHEDULE_ID}`,
  //    authHeaders
  // );

  // check(queueRes, {
  //   'queue enter success': (r) => r.status === 200,
  // });



//   // 5. 좌석 조회
//   const seatListRes = http.get(
//     `${BASE_URL}/seats/${SCHEDULE_ID}`,
//     authHeaders
//   );

//   check(seatListRes, {
//     'seat list success': (r) => r.status === 200,
//   });

//   // 6. 좌석 선점
//   const seatId = 55;

//   const holdRes = http.post(
//     `${BASE_URL}/api/reservation/hold`,
//     JSON.stringify({
//       concertScheduleId: SCHEDULE_ID,
//       seatId: seatId,
//     }),
//     authHeaders
//   );

//   check(holdRes, {
//     'hold processed': (r) =>
//       r.status === 200 ||
//       r.status === 400 ||
//       r.status === 409,
//   });

  sleep(0.2);
}