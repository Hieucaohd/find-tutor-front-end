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