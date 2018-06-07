export class Device {
  constructor(name, udid, state, osVersion, os, ip, testCases = []) {
    this.name = name;
    this.udid = udid;
    this.state = state;
    this.osVersion = osVersion;
    this.os = os;
    this.ip = ip;
    this.testCases = testCases;
  }

  getName() {
    return this.name;
  }

  getIp() {
    return this.ip;
  }

  getUdid() {
    return this.udid;
  }

  getState() {
    return this.state;
  }

  getOsVersion() {
    return this.osVersion;
  }

  getOS() {
    return this.os;
  }

  getTestCases() {
    return this.testCases;
  }

  setTestCases(testCases) {
    this.testCases = testCases;
  }
}
