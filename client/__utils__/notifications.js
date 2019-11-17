import uuid from 'uuid'

export class FakeNotification {
  constructor(id, type, msg) {
    this.id = id
    this.type = type
    this.msg = msg
  }
}

export const getFakeNotificaitonObject = (
  id = uuid.v4(),
  type = 'success',
  msg = `Msg for ${id}`,
) => {
  return new FakeNotification(id, type, msg)
}
