export const getProvinceList = async () => {
    try {
        const response = await fetch("https://provinces.open-api.vn/api/");
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log('error to get province list: ', error);
    }
}

export const getDistrictList = async (code) => {
    try {
        const response = await fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log('error to get district list: ', error);
    }
}

export const getWardList = async (code) => {
    try {
        const response = await fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log('error to get ward list: ', error);
    }
}

export const getProvinceName = async (code) => {
    try {
        const response = await fetch("https://provinces.open-api.vn/api/");
        const responseJSON = await response.json();
        const province = await responseJSON.find( (item)=> {
            return item["code"] === code;
        })
        return province["name"];
    } catch(error) {
        console.log('Failed to get province name: ', error)
    }
}

export const getDistrictName = async ({provinceCode, districtCode}) => {
    try {
        const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        const responseJSON = await response.json();
        const district = await responseJSON["districts"].find( (item)=> {
            return item["code"] === districtCode;
        });
        return district["name"];
    } catch (error) {
        console.log('Failed to get district name: ', error);
    }
}

export const getWardName = async ({districtCode, wardCode}) => {
    try {
        const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        const responseJSON = await response.json();
        const ward = await responseJSON["wards"].find( (item)=> {
            return item["code"] === wardCode;
        });
        return ward["name"];
    } catch (error) {
        console.log('Failed to get ward name: ', error);
    }
}

export const catchProvinceName = (name) => {
    if(!name) return "";
    if(name.search('Thành phố')!==-1) {
        return name.slice(10);
    }
    else if(name.search('Tỉnh')!==-1) {
        return name.slice(5)
    }
    return name;
}

export const catchDistrictName = (name) => {
    if(!name) return "";
    if(name.search('Quận')!==-1){
        return name.replace("Quận", "Q.");
    }
    else if(name.search('Huyện')!==-1){
        return name.replace("Huyện", "H.");
    }
    else if(name.search('Thành phố')!==-1){
        return name.replace('Thành phố', 'TP.');
    }
    else if(name.search('Thị xã')!==-1){
        return name.replace('Thị xã', 'TX.');
    }
    return name;
}

export const catchWardName = (name) => {
    if(!name) return "";
    if(name.search('Phường')!==-1){
        return name.replace("Phường", "P.");
    }
    return name;
}