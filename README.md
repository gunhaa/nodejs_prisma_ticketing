# 요구사항

```plaintext
영화 ‘위대한 쇼맨’을 보고 크게 감동을 받은 치즈볼 새는, 쿠키들과 함께 공연을 준비하기로 마음을 먹었다.
매일매일 고된 연습을 강행한 끝에, 공연의 내용은 전부 완성되었고 세계 각국의 전문가들 앞에서 쇼케이스를 펼치게 된다.
결과는 대성공! 치즈볼 새는 자신의 동전 주머니가 가득찰 생각을 하며 행복감에 젖었다.

 이윽고 치즈볼 새는 사람들에게 온라인으로 티켓을 팔기 시작했는데,
 예매 사이트를 이용하다보니 수수료를 떼이는 것이 불만인 치즈볼 새는 당신에게 예매 API 서버를 만들어달라고 의뢰를 했다.
 치즈볼 새의 돈주머니가 가득찰 수 있게 도와주도록 하자.

공연을 만들고 고객이 예매를 하기까지의 흐름은 다음과 같다.

1. 공연을 서버에 등록한다.
2. 예매 시작 시간이 되면 사람들은 빈 좌석 목록을 보고,
3. 원하는 자리를 ‘찜'한다. 다른 사람이 예매했거나 찜한 자리는 찜할 수 없다.
4. 찜한 자리에 대해서 정해진 시간 내에 결제정보를 마저 등록하여 예매를 완료한다.
```

## DB Schema

- 티켓을 결제까지 내린다 = 찜

- Member(회원)
  - id
  - email
  - Payment(1:N)
  - Ticket(1:N)
  - createdAt
- Event(공연)
  - id
  - maxSeat
  - ~~curSeat~~
  - createdAt 
- Seat(좌석)
  - id
  - seatNo
  - Ticket(1:1)
  - Event(1:N)
- Dibs(찜)
  - id
  - isDeleted
  - Member(1:N)
  - Seat(1:1)
  - createdAt
  - updatedAt
- Ticket(티켓)
  - id
  - Member(1:N)
  - Seat(1:1)
  - Payment(N:1)
  - cost
  - createdAt
  - updatedAt 
- Payment(결제)
  - id
  - isPayed
  - Ticket(1:N)
  - Member(1:N)
  - createdAt
  - updatedAt

## Router

- [POST] /event : 이벤트 등록
- [GET] /event/:eventId/seats : 남은 좌석 목록 조회
- [POST] /event/:eventId/seats/:seatNo/dibs : 찜하기(body에 member 정보, event, seatNo)
- [POST] /payment : 결제(요청 body에는 ticketIds만 넘기도록)

## 동시성 제어

## 테스트