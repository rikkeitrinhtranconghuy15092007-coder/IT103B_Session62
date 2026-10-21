let choice;
let isValidCard = false;
let memberType = "";
let zone = "";
let borrowString = "";

do {
    let menu = "MODULE HẬU CẦN PHÒNG GYM\n1. Xác thực thẻ hội viên\n2. Mượn vật tư\n3. In phiếu bàn giao tủ đồ\n4. Đóng ca và thoát\nChọn (1-4):";
    choice = prompt(menu);

    switch (choice) {
        case "1":
            let cardInput = prompt("Nhập hạng thẻ (VIP hoặc STANDARD):");
            if (cardInput != null) {
                let type = cardInput.trim().toUpperCase();
                if (type == "VIP") {
                    isValidCard = true;
                    memberType = "VIP";
                    zone = "ZONE-A";
                    alert("Xác thực thành công thẻ VIP. Cấp tủ khu ZONE-A.");
                } else if (type == "STANDARD") {
                    isValidCard = true;
                    memberType = "STANDARD";
                    zone = "ZONE-B";
                    alert("Xác thực thành công thẻ STANDARD. Cấp tủ khu ZONE-B.");
                } else {
                    alert("Hạng thẻ không hợp lệ!");
                }
            }
            break;

        case "2":
            if (isValidCard == false) {
                alert("Vui lòng xác thực thẻ ở chức năng 1 trước!");
            } else {
                let supplies = prompt("Nhập chuỗi vật tư (VD: TOWEL:2|LOCK:1) hoặc để trống:");
                if (supplies != null && supplies.trim() != "") {
                    borrowString = supplies.trim().toUpperCase();
                    alert("Đã ghi nhận chuỗi vật tư: " + borrowString);
                } else {
                    borrowString = "";
                    alert("Không mượn thêm vật tư.");
                }
            }
            break;

        case "3":
            if (isValidCard == false) {
                alert("Chưa có thông tin hội viên!");
            } else {
                let towelQty = 0;
                let lockQty = 0;

                let tempStr = borrowString;
                if (tempStr != "") {
                    tempStr = tempStr + "|"; 
                }

                while (tempStr.indexOf("|") != -1) {
                    let pipeIndex = tempStr.indexOf("|");
                    let chunk = tempStr.slice(0, pipeIndex);
                    
                    let colonIndex = chunk.indexOf(":");
                    if (colonIndex != -1) {
                        let itemName = chunk.slice(0, colonIndex);
                        let itemQty = Number(chunk.slice(colonIndex + 1));

                        if (itemName == "TOWEL") {
                            towelQty = towelQty + itemQty;
                        } else if (itemName == "LOCK") {
                            lockQty = lockQty + itemQty;
                        }
                    }
                    
                    tempStr = tempStr.slice(pipeIndex + 1);
                }

                let totalFee = 0;
                let deposit = 0;
                let billDetails = "";

                if (memberType == "VIP") {
                    billDetails = billDetails + "Khăn tắm lớn (VIP)".padEnd(20, " ") + "Miễn phí\n";
                }

                if (towelQty > 0 || lockQty > 0) {
                    deposit = 50000;
                }

                let towelFee = towelQty * 20000;
                let lockFee = lockQty * 15000;
                totalFee = towelFee + lockFee;

                if (towelQty > 0) {
                    billDetails = billDetails + `Khăn mượn thêm (x${towelQty})`.padEnd(20, " ") + `${towelFee} VND\n`;
                }
                if (lockQty > 0) {
                    billDetails = billDetails + `Khóa phụ (x${lockQty})`.padEnd(20, " ") + `${lockFee} VND\n`;
                }

                console.log("-".repeat(40));
                console.log("       PHIẾU BÀN GIAO VẬT TƯ");
                console.log("-".repeat(40));
                console.log(`Hạng thẻ: ${memberType}`);
                console.log(`Khu vực tủ: ${zone}`);
                console.log("-".repeat(40));
                
                if (billDetails != "") {
                    console.log(billDetails);
                } else {
                    console.log("Không có vật tư phát sinh.");
                }

                console.log("-".repeat(40));
                console.log("Tiền đặt cọc:".padEnd(20, " ") + `${deposit} VND`);
                console.log("Phụ phí vật tư:".padEnd(20, " ") + `${totalFee} VND`);
                console.log("Tổng thanh toán:".padEnd(20, " ") + `${deposit + totalFee} VND`);
                console.log("-".repeat(40) + "\n");

                alert("Đã in phiếu bàn giao ra Console!");
                
                isValidCard = false;
                memberType = "";
                zone = "";
                borrowString = "";
            }
            break;

        case "4":
            alert("Đã đóng ca làm việc. Tạm biệt!");
            break;

        default:
            if (choice != null) {
                alert("Lựa chọn không hợp lệ!");
            }
            break;
    }
} while (choice != "4" && choice != null);