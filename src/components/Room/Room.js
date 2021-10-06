export const getTypeTutorString = (typeTeacher) => {
    if(!typeTeacher) return ;
    if(typeTeacher === "Giao Vien, Sinh Vien") {
        return false;
    } else if (typeTeacher === "Giao Vien") {
        return "Giáo viên";
    } else if (typeTeacher === "Sinh Vien") {
        return "Sinh viên"
    }
}

export const getSexOfTeacher = (sex)=> {
    if(!sex) return "";
    if (sex === "NAM") {
        return "Gia sư nam";
    } else if (sex === "NU") {
        return"Gia sư nữ";
    }
    return false;
}

export const formatPriceString = (price) => {
    const priceString = price?.toString();
    let ans = "";
    const len = priceString?.length;
    let count = 0;
    for(let i = len - 1; i >= 0; i--) {
      count++;
      ans = priceString[i] + ans;
      if(count %3 ===0 && count !== len) {
        ans = "." + ans
      }
    }
    return ans;
}

export const getStringId = (id) => {
    const zeroObj = {
        0: "",
        1: "0",
        2: "00",
        3: "000",
        4: "0000",
        5: "00000",
    };
    return `${zeroObj[6 - String(id).length]}${id}`;
}