export default class LiveController {
  constructor(config) {
    this.liveURL = config.url;
    this.offset = 0;
    this.show = null;
    this.maxOffset = config.maxOffset;
  }

  setOffset(seconds) {
    if (seconds > this.maxOffset) {
      this.offset = this.maxOffset;
    } else if (seconds < 0) {
      this.offset = 0;
    } else {
      this.offset = seconds;
    }

    return this.getURL();
  }

  setOffsetPercent(percent) {
    if (percent >= 0 && percent <= 1) {
      return this.setOffset(parseInt(this.maxOffset * (1 - percent), 10));
    }

    return null;
  }

  getMaxOffset() {
    return this.maxOffset;
  }

  getURL() {
    return `${this.liveURL}?offset=${this.offset}`;
  }

  back() {
    const now = new Date();
    const current = new Date(now.getTime() - this.offset * 1000);
    let then = new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate(),
      current.getHours(),
      0,
      0,
    );

    if (
      current.getTime() - then.getTime() < 4 * 1000 &&
      this.offset < this.maxOffset
    ) {
      then = new Date(then.getTime() - 1000 * 60 * 60);
    }

    const diff = (now.getTime() - then.getTime()) / 1000;
    let sec = Math.floor(diff);

    sec = sec > this.maxOffset ? this.maxOffset : sec;

    return sec;
  }

  forward() {
    const now = new Date();
    const future = new Date(
      now.getTime() - (this.offset * 1000 + 60 * 60 * 1000),
    );
    const nextHour = new Date(
      future.getFullYear(),
      future.getMonth(),
      future.getDate(),
      future.getHours(),
      0,
      0,
    );

    let diff = (now.getTime() - nextHour.getTime()) / 1000;
    diff = diff < 0 ? 0 : diff;
    return Math.floor(diff);
  }

  playLive() {
    this.setOffset(0);

    return this.getURL();
  }

  isLive() {
    return this.offset === 0;
  }

  getOffset() {
    return this.offset;
  }

  setShow(s) {
    this.show = s;
  }

  getShow() {
    return this.show;
  }
}
