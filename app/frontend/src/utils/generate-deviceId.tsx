// The machine ID will be unique for the browser/machine combo.
export function getDeviceId() {
  let deviceId = localStorage.getItem('MachineId');
  if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem('MachineId', deviceId);
  }
  return deviceId;
}
