const validateDeviceData = (data) => {
  if (!data || typeof data !== "object") return false;
  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") return false;
  if (!data.room || typeof data.room !== "string" || data.room.trim() === "") return false;
  if (typeof data.powerWatts !== "number" || data.powerWatts <= 0) return false;
  return true;
};

const findDeviceById = (devices, id) => {
  for (let i = 0; i < devices.length; i++) {
    if (devices[i].id === id) {
      return devices[i];
    }
  }
  return null;
};

const createDevice = (devices, newDev) => {
  if (!validateDeviceData(newDev)) {
    console.log("[LỖI THÊM MỚI] Dữ liệu không hợp lệ! Bắt buộc có tên, phòng và powerWatts > 0.");
    return false;
  }

  const newId = "DEV_" + String(devices.length + 1).padStart(3, "0");
  const deviceToAdd = {
    id: newId,
    name: newDev.name.trim(),
    room: newDev.room.trim(),
    isActive: newDev.isActive !== undefined ? Boolean(newDev.isActive) : false,
    powerWatts: newDev.powerWatts
  };

  devices.push(deviceToAdd);
  console.log(`[THÊM THÀNH CÔNG] Đã tạo thiết bị ${newId}: "${deviceToAdd.name}"`);
  return true;
};

const readDevicesByRoom = (devices, roomName) => {
  const result = [];
  for (let i = 0; i < devices.length; i++) {
    if (devices[i].room.toLowerCase() === roomName.toLowerCase()) {
      result.push(devices[i]);
    }
  }
  return result;
};

const updateDevice = (devices, targetId, updateData) => {
  const targetDevice = findDeviceById(devices, targetId);
  if (targetDevice === null) {
    console.log(`[LỖI CẬP NHẬT] Không tìm thấy thiết bị mã ${targetId}!`);
    return false;
  }

  if (updateData.name !== undefined) {
    targetDevice.name = updateData.name;
  }
  if (updateData.room !== undefined) {
    targetDevice.room = updateData.room;
  }
  if (updateData.isActive !== undefined) {
    targetDevice.isActive = updateData.isActive;
  }
  if (updateData.powerWatts !== undefined) {
    targetDevice.powerWatts = updateData.powerWatts;
  }

  console.log(`[CẬP NHẬT THÀNH CÔNG] Đã cập nhật thiết bị ${targetId}`);
  return true;
};

const deleteDevice = (devices, targetId) => {
  for (let i = 0; i < devices.length; i++) {
    if (devices[i].id === targetId) {
      devices.splice(i, 1);
      console.log(`[XÓA THÀNH CÔNG] Đã gỡ bỏ thiết bị ${targetId} khỏi hệ thống.`);
      return true;
    }
  }
  console.log(`[LỖI XÓA] Không tìm thấy thiết bị mã ${targetId}!`);
  return false;
};

const deviceList = [
  { id: "DEV_001", name: "Điều hòa", room: "Phòng khách", isActive: true, powerWatts: 1200 },
  { id: "DEV_002", name: "Đèn ngủ", room: "Phòng ngủ", isActive: true, powerWatts: 15 },
  { id: "DEV_003", name: "Tivi", room: "Phòng khách", isActive: false, powerWatts: 150 }
];

console.log("=== KẾT QUẢ KIỂM THỬ MODULE CRUD SMART HOME ===");

console.log("\n1. DANH SÁCH BAN ĐẦU:");
console.table(deviceList);

console.log("\n2. KIỂM THỬ CREATE (Thêm mới):");
createDevice(deviceList, { name: "Quạt trần", room: "Phòng khách", isActive: true, powerWatts: 75 });
createDevice(deviceList, { name: "Đèn bàn", room: "Phòng ngủ", powerWatts: -10 });

console.log("\n3. KIỂM THỬ READ (Lọc theo phòng 'Phòng khách'):");
const livingRoomDevices = readDevicesByRoom(deviceList, "Phòng khách");
console.table(livingRoomDevices);

console.log("\n4. KIỂM THỬ UPDATE (Tránh lỗi Falsy với isActive: false & powerWatts: 0):");
updateDevice(deviceList, "DEV_001", { isActive: false });
updateDevice(deviceList, "DEV_002", { powerWatts: 0 });
updateDevice(deviceList, "DEV_999", { name: "Thiết bị không tồn tại" });

console.log("\n5. KIỂM THỬ DELETE (Xóa thiết bị DEV_003):");
deleteDevice(deviceList, "DEV_003");
deleteDevice(deviceList, "DEV_999");

console.log("\n6. DANH SÁCH CUỐI CÙNG SAU KHI XỬ LÝ:");
console.table(deviceList);
