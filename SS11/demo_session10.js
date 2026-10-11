let devices = [
    { id: "DEV01", name: "Điều hòa", isActive: true, powerWatts: 1500 },
    { id: "DEV02", name: "Quạt", isActive: true, powerWatts: 60 },
    { id: "DEV03", name: "Đèn", isActive: true, powerWatts: 40 }
];

const findDeviceById = (deviceList, targetId) => {
    for (let i = 0; i < deviceList.length; i++) {
        if (deviceList[i].id === targetId) {
            return deviceList[i];
        }
    }
    return null;
};

const updateDeviceState = (deviceList, targetId, updateData) => {
    const targetDevice = findDeviceById(deviceList, targetId);
    if (!targetDevice) return false;

    if (updateData.isActive !== undefined) {
        targetDevice.isActive = updateData.isActive;
    }

    if (updateData.powerWatts !== undefined) {
        targetDevice.powerWatts = updateData.powerWatts;
    }

    return true;
};

const calculateActivePower = (deviceList) => {
    let totalPower = 0;
    for (let i = 0; i < deviceList.length; i++) {
        if (deviceList[i].isActive) {
            totalPower += deviceList[i].powerWatts;
        }
    }
    return totalPower;
};

console.log("=== DANH SÁCH BAN ĐẦU ===");
console.table(devices);
console.log("Tổng công suất tiêu thụ ban đầu:", calculateActivePower(devices) + "W");

console.log("\n=== THỰC HIỆN CẬP NHẬT TRẠNG THÁI ===");

updateDeviceState(devices, "DEV01", { isActive: false });
console.log("- Đã tắt thiết bị DEV01 (Điều hòa)");

updateDeviceState(devices, "DEV03", { powerWatts: 0 });
console.log("- Đã hạ công suất thiết bị DEV03 (Đèn) về 0W");

console.log("\n=== DANH SÁCH SAU KHI CẬP NHẬT ===");
console.table(devices);

const finalPower = calculateActivePower(devices);
console.log("Tổng công suất tiêu thụ sau cập nhật:", finalPower + "W");

if (finalPower === 60) {
    console.log("=> KIỂM TRA DỮ LIỆU: THÀNH CÔNG (Đúng 60W của DEV02)");
} else {
    console.log("=> KIỂM TRA DỮ LIỆU: THẤT BẠI");
}