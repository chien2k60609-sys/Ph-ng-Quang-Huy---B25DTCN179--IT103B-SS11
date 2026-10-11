const findDeviceById = (devices, id) => {
  for (let i = 0; i < devices.length; i++) {
    if (devices[i].id === id) {
      return devices[i];
    }
  }
  return null;
};

const updateDevice = (devices, targetId, updatedData) => {
  const targetDevice = findDeviceById(devices, targetId);
  if (targetDevice === null) return false;

  if (updatedData.name !== undefined) {
    targetDevice.name = updatedData.name;
  }

  if (updatedData.isActive !== undefined) {
    targetDevice.isActive = updatedData.isActive;
  }

  if (updatedData.powerWatts !== undefined) {
    targetDevice.powerWatts = updatedData.powerWatts;
  }

  return true;
};

const smartHomeDevices = [
  { id: "D01", name: "Điều hòa phòng khách", isActive: true, powerWatts: 1200 },
  { id: "D02", name: "Đèn ngủ", isActive: true, powerWatts: 15 }
];

console.log("=== TRẠNG THÁI BAN ĐẦU ===");
console.table(smartHomeDevices);

updateDevice(smartHomeDevices, "D01", { isActive: false });
updateDevice(smartHomeDevices, "D02", { powerWatts: 0 });

console.log("\n=== TRẠNG THÁI SAU CẬP NHẬT ===");
console.table(smartHomeDevices);
